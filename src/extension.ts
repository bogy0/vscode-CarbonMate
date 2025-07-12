import * as vscode from 'vscode'
import { spacing01, spacing02, spacing03, spacing04, spacing05, spacing06, spacing07, spacing08, spacing09, spacing10, spacing11, spacing12, spacing13 } from '@carbon/layout'

interface CarbonSpacingToken {
  name: string
  value: string
  rem: string
  px: string
  description: string
  pxValue: number
}

function getCarbonSpacingTokens(): CarbonSpacingToken[] {
  return [
    { name: 'layout.$spacing-01', value: spacing01, rem: '0.125rem', px: '2px', description: 'Smallest spacing increment', pxValue: 2 },
    { name: 'layout.$spacing-02', value: spacing02, rem: '0.25rem', px: '4px', description: 'Small spacing increment', pxValue: 4 },
    { name: 'layout.$spacing-03', value: spacing03, rem: '0.5rem', px: '8px', description: 'Extra small spacing', pxValue: 8 },
    { name: 'layout.$spacing-04', value: spacing04, rem: '0.75rem', px: '12px', description: 'Small spacing', pxValue: 12 },
    { name: 'layout.$spacing-05', value: spacing05, rem: '1rem', px: '16px', description: 'Medium spacing', pxValue: 16 },
    { name: 'layout.$spacing-06', value: spacing06, rem: '1.5rem', px: '24px', description: 'Large spacing', pxValue: 24 },
    { name: 'layout.$spacing-07', value: spacing07, rem: '2rem', px: '32px', description: 'Extra large spacing', pxValue: 32 },
    { name: 'layout.$spacing-08', value: spacing08, rem: '2.5rem', px: '40px', description: '2XL spacing', pxValue: 40 },
    { name: 'layout.$spacing-09', value: spacing09, rem: '3rem', px: '48px', description: '3XL spacing', pxValue: 48 },
    { name: 'layout.$spacing-10', value: spacing10, rem: '4rem', px: '64px', description: '4XL spacing', pxValue: 64 },
    { name: 'layout.$spacing-11', value: spacing11, rem: '5rem', px: '80px', description: '5XL spacing', pxValue: 80 },
    { name: 'layout.$spacing-12', value: spacing12, rem: '6rem', px: '96px', description: '6XL spacing', pxValue: 96 },
    { name: 'layout.$spacing-13', value: spacing13, rem: '10rem', px: '160px', description: '7XL spacing', pxValue: 160 }
  ]
}

function isSpacingProperty(text: string): boolean {
  const spacingProperties = ['margin', 'padding', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left']
  return spacingProperties.some(prop => text.includes(prop))
}

function hasCarbonLayoutImport(document: vscode.TextDocument): boolean {
  const text = document.getText()
  // Check for different quote styles and variations
  const importPatterns = [
    "@use '@carbon/layout'",
    "@use '@carbon/layout';",
    '@use "@carbon/layout"',
    '@use "@carbon/layout";',
    "@use @carbon/layout",
    "@use @carbon/layout;"
  ]
  return importPatterns.some(pattern => text.includes(pattern))
}

function findClosestCarbonToken(targetPx: number): CarbonSpacingToken {
  const tokens = getCarbonSpacingTokens()
  let closest = tokens[0]
  let minDifference = Math.abs(targetPx - closest.pxValue)
  
  for (const token of tokens) {
    const difference = Math.abs(targetPx - token.pxValue)
    if (difference < minDifference) {
      minDifference = difference
      closest = token
    }
  }
  
  return closest
}

function parseSpacingValue(value: string): number | null {
  // Remove whitespace and convert to lowercase
  const cleanValue = value.trim().toLowerCase()
  
  // Match px values (e.g., "16px", "24px")
  const pxMatch = cleanValue.match(/^(\d+(?:\.\d+)?)px$/)
  if (pxMatch) {
    return parseFloat(pxMatch[1])
  }
  
  // Match rem values (e.g., "1rem", "1.5rem") - convert to px (assuming 16px base)
  const remMatch = cleanValue.match(/^(\d+(?:\.\d+)?)rem$/)
  if (remMatch) {
    return parseFloat(remMatch[1]) * 16
  }
  
  // Match em values (e.g., "1em", "1.5em") - convert to px (assuming 16px base)
  const emMatch = cleanValue.match(/^(\d+(?:\.\d+)?)em$/)
  if (emMatch) {
    return parseFloat(emMatch[1]) * 16
  }
  
  return null
}

function createCompletionItem(token: CarbonSpacingToken): vscode.CompletionItem {
  const item = new vscode.CompletionItem(token.name, vscode.CompletionItemKind.Variable)
  
  // Add CarbonMate branding to the detail
  item.detail = `CarbonMate: ${token.rem} (${token.px})`
  
  // Create rich documentation with CarbonMate branding
  const documentation = new vscode.MarkdownString()
  documentation.appendMarkdown(`**🔵 CarbonMate - Carbon Design System**\n\n`)
  documentation.appendMarkdown(`**${token.name}**\n\n`)
  documentation.appendMarkdown(`${token.description}\n\n`)
  documentation.appendMarkdown(`**Values:**\n`)
  documentation.appendMarkdown(`- **rem**: ${token.rem}\n`)
  documentation.appendMarkdown(`- **px**: ${token.px}\n\n`)
  documentation.appendMarkdown(`*Requires: @use '@carbon/layout';*`)
  
  item.documentation = documentation
  item.insertText = token.name
  item.sortText = token.name
  
  return item
}

function createReplacementSuggestion(originalValue: string, closestToken: CarbonSpacingToken, targetPx: number): vscode.CompletionItem {
  const item = new vscode.CompletionItem(
    `Replace "${originalValue}" with ${closestToken.name}`,
    vscode.CompletionItemKind.Snippet
  )
  
  item.detail = `CarbonMate: ${closestToken.rem} (${closestToken.px}) - closest to ${targetPx}px`
  
  const documentation = new vscode.MarkdownString()
  documentation.appendMarkdown(`**🔵 CarbonMate - Carbon Token Replacement**\n\n`)
  documentation.appendMarkdown(`**Original**: \`${originalValue}\` (${targetPx}px)\n\n`)
  documentation.appendMarkdown(`**Suggested**: \`${closestToken.name}\` (${closestToken.px})\n\n`)
  documentation.appendMarkdown(`**Difference**: ${Math.abs(targetPx - closestToken.pxValue)}px\n\n`)
  documentation.appendMarkdown(`*Replace hardcoded value with Carbon Design System token*`)
  
  item.documentation = documentation
  item.insertText = closestToken.name
  item.sortText = '!' // Make it appear first
  
  return item
}

export function activate(context: vscode.ExtensionContext) {
  console.log('CarbonMate extension is now active!')

  // Register completion provider for spacing properties
  const spacingProvider = vscode.languages.registerCompletionItemProvider(
    { language: 'scss' },
    {
      provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
        const linePrefix = document.lineAt(position).text.substr(0, position.character)
        
        // Only provide suggestions for spacing-related properties
        if (!isSpacingProperty(linePrefix)) {
          return []
        }

        // Check if the file has the Carbon layout import
        if (!hasCarbonLayoutImport(document)) {
          // Detect user's quote style preference
          const text = document.getText()
          const hasDoubleQuotes = text.includes('"') && !text.includes("'")
          const hasSingleQuotes = text.includes("'") && !text.includes('"')
          
          let importText = "@use '@carbon/layout';"
          if (hasDoubleQuotes) {
            importText = '@use "@carbon/layout";'
          } else if (hasSingleQuotes) {
            importText = "@use '@carbon/layout';"
          }
          
          // Show a helpful message about needing the import
          const importItem = new vscode.CompletionItem('@use \'@carbon/layout\';', vscode.CompletionItemKind.Snippet)
          importItem.detail = 'CarbonMate: Add Carbon layout import'
          importItem.documentation = new vscode.MarkdownString('**🔵 CarbonMate**\n\nAdd the required Carbon layout import to use spacing tokens.\n\nPlace this at the top of your SCSS file.')
          importItem.insertText = importText
          importItem.sortText = '!'
          
          return [importItem]
        }

        const tokens = getCarbonSpacingTokens()
        return tokens.map(createCompletionItem)
      }
    },
    '$' // Trigger character
  )

  // Register diagnostic provider for hardcoded spacing values
  const diagnosticCollection = vscode.languages.createDiagnosticCollection('carbonmate')
  
  function updateDiagnostics(document: vscode.TextDocument): void {
    // Only process SCSS files
    if (document.languageId !== 'scss') {
      diagnosticCollection.set(document.uri, [])
      return
    }

    const diagnostics: vscode.Diagnostic[] = []
    
    // Only check files with Carbon layout import
    if (!hasCarbonLayoutImport(document)) {
      diagnosticCollection.set(document.uri, diagnostics)
      return
    }

    const text = document.getText()
    const lines = text.split('\n')
    
    for (let i = 0; i <lines.length; i++) {
      const line = lines[i]
      const spacingProperties = ['margin', 'padding', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left']
      
      // Check if line contains spacing properties
      const hasSpacingProperty = spacingProperties.some(prop => line.includes(prop))
      if (!hasSpacingProperty) continue
      
      // Find hardcoded spacing values
      const spacingValueRegex = /(\d+(?:\.\d+)?(?:px|rem|em))/g
      let match
      
      while ((match = spacingValueRegex.exec(line)) !== null) {
        const value = match[1]
        const pxValue = parseSpacingValue(value)
        
        if (pxValue !== null) {
          const closestToken = findClosestCarbonToken(pxValue)
          const difference = Math.abs(pxValue - closestToken.pxValue)
          
          // Only warn if the difference is reasonable (within 8px)
          if (difference <= 8) {
            const range = new vscode.Range(i, match.index, i, match.index + value.length)
            const diagnostic = new vscode.Diagnostic(
              range,
              `Consider using Carbon token: ${closestToken.name} (${closestToken.px}) instead of hardcoded value`,
              vscode.DiagnosticSeverity.Warning
            )
            
            diagnostic.source = 'CarbonMate'
            diagnostic.code = 'hardcoded-spacing'
            
            diagnostic.relatedInformation = [
              new vscode.DiagnosticRelatedInformation(
                new vscode.Location(document.uri, range),
                `Original: ${value} (${pxValue}px), Suggested: ${closestToken.name} (${closestToken.px})`
              )
            ]
            
            diagnostics.push(diagnostic)
          }
        }
      }
    }
    
    diagnosticCollection.set(document.uri, diagnostics)
  }

  // Register code actions for hardcoded spacing values
  const codeActionProvider = vscode.languages.registerCodeActionsProvider(
    { language: 'scss' },
    {
      provideCodeActions(document: vscode.TextDocument, range: vscode.Range, context: vscode.CodeActionContext) {
        const actions: vscode.CodeAction[] = []
        
        // Check if the file has Carbon layout import
        if (!hasCarbonLayoutImport(document)) {
          return actions
        }

        // Process diagnostics from our collection
        for (const diagnostic of context.diagnostics) {
          if (diagnostic.source === 'CarbonMate' && diagnostic.code === 'hardcoded-spacing') {
            const text = document.getText(diagnostic.range)
            const spacingValue = parseSpacingValue(text)
            
            if (spacingValue !== null) {
              const closestToken = findClosestCarbonToken(spacingValue)
              const difference = Math.abs(spacingValue - closestToken.pxValue)
              
              // Only suggest if the difference is reasonable (within 8px)
              if (difference <= 8) {
                // Create quick fix action
                const quickFix = new vscode.CodeAction(
                  `Replace with ${closestToken.name}`,
                  vscode.CodeActionKind.QuickFix
                )
                quickFix.edit = new vscode.WorkspaceEdit()
                quickFix.edit.replace(document.uri, diagnostic.range, closestToken.name)
                quickFix.diagnostics = [diagnostic]
                quickFix.isPreferred = true
                
                actions.push(quickFix)
              }
            }
          }
        }

        // Also check if the current range contains a hardcoded value
        const text = document.getText(range)
        const spacingValue = parseSpacingValue(text)
        
        if (spacingValue !== null) {
          const closestToken = findClosestCarbonToken(spacingValue)
          const difference = Math.abs(spacingValue - closestToken.pxValue)
          
          // Only suggest if the difference is reasonable (within 8px)
          if (difference <= 8) {
            const action = new vscode.CodeAction(
              `Replace with ${closestToken.name}`,
              vscode.CodeActionKind.Refactor
            )
            
            action.edit = new vscode.WorkspaceEdit()
            action.edit.replace(document.uri, range, closestToken.name)
            
            actions.push(action)
          }
        }
        
        return actions
      }
    },
    {
      providedCodeActionKinds: [vscode.CodeActionKind.Refactor, vscode.CodeActionKind.QuickFix]
    }
  )

  // Register "Fix All" command
  const fixAllCommand = vscode.commands.registerCommand('carbonmate.fixAll', () => {
    const editor = vscode.window.activeTextEditor
    if (!editor || editor.document.languageId !== 'scss') {
      vscode.window.showWarningMessage('CarbonMate: Please open an SCSS file first.')
      return
    }

    if (!hasCarbonLayoutImport(editor.document)) {
      vscode.window.showWarningMessage('CarbonMate: Please add @use \'@carbon/layout\'; to the top of your SCSS file first.')
      return
    }

    const document = editor.document
    const text = document.getText()
    const edit = new vscode.WorkspaceEdit()
    let hasChanges = false

    // Find all hardcoded spacing values and replace them
    const spacingValueRegex = /(\d+(?:\.\d+)?(?:px|rem|em))/g
    let match
    const positions: { start: number; end: number; replacement: string }[] = []

    while ((match = spacingValueRegex.exec(text)) !== null) {
      const value = match[1]
      const pxValue = parseSpacingValue(value)
      
      if (pxValue !== null) {
        const closestToken = findClosestCarbonToken(pxValue)
        const difference = Math.abs(pxValue - closestToken.pxValue)
        
        if (difference <= 8) {
          positions.push({
            start: match.index,
            end: match.index + value.length,
            replacement: closestToken.name
          })
        }
      }
    }

    // Apply replacements in reverse order to maintain positions
    for (let i = positions.length - 1; i >= 0; i--) {
      const pos = positions[i]
      const range = new vscode.Range(
        document.positionAt(pos.start),
        document.positionAt(pos.end)
      )
      edit.replace(document.uri, range, pos.replacement)
      hasChanges = true
    }

    if (hasChanges) {
      vscode.workspace.applyEdit(edit)
      vscode.window.showInformationMessage(`CarbonMate: Replaced ${positions.length} hardcoded spacing values with Carbon tokens.`)
    } else {
      vscode.window.showInformationMessage('CarbonMate: No hardcoded spacing values found to replace.')
    }
  })

  // Register refresh code check command
  const refreshCommand = vscode.commands.registerCommand('carbonmate.refresh', () => {
    const editor = vscode.window.activeTextEditor
    if (editor && editor.document.languageId === 'scss') {
      updateDiagnostics(editor.document)
      vscode.window.showInformationMessage('CarbonMate: Code Check refreshed.')
    }
  })

  // Only update diagnostics when the active editor changes to an SCSS file
  const changeActiveEditorListener = vscode.window.onDidChangeActiveTextEditor(editor => {
    if (editor && editor.document.languageId === 'scss') {
      updateDiagnostics(editor.document)
    } else {
      // Clear diagnostics when switching away from SCSS files
      diagnosticCollection.clear()
    }
  })

  // Update diagnostics when document changes (only for SCSS files)
  const changeDocumentListener = vscode.workspace.onDidChangeTextDocument(event => {
    if (event.document.languageId === 'scss') {
      // Force update diagnostics when document changes, especially for import changes
      setTimeout(() => {
        updateDiagnostics(event.document)
      }, 100) // Small delay to ensure the document is fully updated
    }
  })

  // Update diagnostics for the currently active SCSS document only
  const activeEditor = vscode.window.activeTextEditor
  if (activeEditor && activeEditor.document.languageId === 'scss') {
    updateDiagnostics(activeEditor.document)
  }

  context.subscriptions.push(
    spacingProvider, 
    codeActionProvider, 
    fixAllCommand, 
    refreshCommand,
    changeActiveEditorListener,
    changeDocumentListener,
    diagnosticCollection
  )
}

export function deactivate() {} 