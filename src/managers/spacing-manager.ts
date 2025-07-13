import * as vscode from 'vscode';
import { hasCarbonLayoutImport, parseSpacingValue, findClosestCarbonToken } from '../utils/spacing';
import { createSpacingCompletionProvider } from '../providers/spacing-completion';
import { createSpacingDiagnosticProvider } from '../providers/spacing-diagnostics';
import { createSpacingCodeActionProvider } from '../providers/spacing-code-actions';

export class SpacingManager {
  private diagnosticCollection: vscode.DiagnosticCollection;
  private updateDiagnostics: (document: vscode.TextDocument) => void;

  constructor() {
    this.diagnosticCollection = vscode.languages.createDiagnosticCollection('carbonmate');
    this.updateDiagnostics = createSpacingDiagnosticProvider(this.diagnosticCollection);
  }

  registerProviders(context: vscode.ExtensionContext): void {
    // Register completion provider for spacing properties
    const spacingProvider = vscode.languages.registerCompletionItemProvider(
      { language: 'scss' },
      createSpacingCompletionProvider(),
      '$' // Trigger character
    );

    // Register code actions for hardcoded spacing values
    const codeActionProvider = vscode.languages.registerCodeActionsProvider(
      { language: 'scss' },
      createSpacingCodeActionProvider(),
      {
        providedCodeActionKinds: [vscode.CodeActionKind.Refactor, vscode.CodeActionKind.QuickFix]
      }
    );

    context.subscriptions.push(spacingProvider, codeActionProvider, this.diagnosticCollection);
  }

  registerCommands(context: vscode.ExtensionContext): void {
    // Register "Fix All" command
    const fixAllCommand = vscode.commands.registerCommand('carbonmate.fixAll', () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor || editor.document.languageId !== 'scss') {
        vscode.window.showWarningMessage('CarbonMate: Please open an SCSS file first.');
        return;
      }

      if (!hasCarbonLayoutImport(editor.document)) {
        vscode.window.showWarningMessage('CarbonMate: Please add @use \'@carbon/layout\'; to the top of your SCSS file first.');
        return;
      }

      const document = editor.document;
      const text = document.getText();
      const edit = new vscode.WorkspaceEdit();
      let hasChanges = false;

      // Find all hardcoded spacing values and replace them
      const spacingValueRegex = /(\d+(?:\.\d+)?(?:px|rem|em))/g;
      let match;
      const positions: { start: number; end: number; replacement: string }[] = [];

      while ((match = spacingValueRegex.exec(text)) !== null) {
        const value = match[1];
        const pxValue = parseSpacingValue(value);
        
        if (pxValue !== null) {
          const closestToken = findClosestCarbonToken(pxValue);
          const difference = Math.abs(pxValue - closestToken.pxValue);
          
          if (difference <= 8) {
            positions.push({
              start: match.index,
              end: match.index + value.length,
              replacement: closestToken.name
            });
          }
        }
      }

      // Apply replacements in reverse order to maintain positions
      for (let i = positions.length - 1; i >= 0; i--) {
        const pos = positions[i];
        const range = new vscode.Range(
          document.positionAt(pos.start),
          document.positionAt(pos.end)
        );
        edit.replace(document.uri, range, pos.replacement);
        hasChanges = true;
      }

      if (hasChanges) {
        vscode.workspace.applyEdit(edit);
        vscode.window.showInformationMessage(`CarbonMate: Replaced ${positions.length} hardcoded spacing values with Carbon tokens.`);
      } else {
        vscode.window.showInformationMessage('CarbonMate: No hardcoded spacing values found to replace.');
      }
    });

    // Register refresh code check command
    const refreshCommand = vscode.commands.registerCommand('carbonmate.refresh', () => {
      const editor = vscode.window.activeTextEditor;
      if (editor && editor.document.languageId === 'scss') {
        this.updateDiagnostics(editor.document);
        vscode.window.showInformationMessage('CarbonMate: Code Check refreshed.');
      }
    });

    context.subscriptions.push(fixAllCommand, refreshCommand);
  }

  registerEventListeners(context: vscode.ExtensionContext): void {
    // Only update diagnostics when the active editor changes to an SCSS file
    const changeActiveEditorListener = vscode.window.onDidChangeActiveTextEditor(editor => {
      if (editor && editor.document.languageId === 'scss') {
        this.updateDiagnostics(editor.document);
      } else {
        // Clear diagnostics when switching away from SCSS files
        this.diagnosticCollection.clear();
      }
    });

    // Update diagnostics when document changes (only for SCSS files)
    const changeDocumentListener = vscode.workspace.onDidChangeTextDocument(event => {
      if (event.document.languageId === 'scss') {
        // Force update diagnostics when document changes, especially for import changes
        setTimeout(() => {
          this.updateDiagnostics(event.document);
        }, 100); // Small delay to ensure the document is fully updated
      }
    });

    context.subscriptions.push(changeActiveEditorListener, changeDocumentListener);
  }

  initialize(context: vscode.ExtensionContext): void {
    this.registerProviders(context);
    this.registerCommands(context);
    this.registerEventListeners(context);

    // Update diagnostics for the currently active SCSS document only
    const activeEditor = vscode.window.activeTextEditor;
    if (activeEditor && activeEditor.document.languageId === 'scss') {
      this.updateDiagnostics(activeEditor.document);
    }
  }
} 