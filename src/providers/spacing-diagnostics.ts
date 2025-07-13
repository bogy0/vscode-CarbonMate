import * as vscode from 'vscode';
import { hasCarbonLayoutImport, parseSpacingValue, findClosestCarbonToken } from '../utils/spacing';
import { SPACING_PROPERTIES } from '../utils/constants';

export function createSpacingDiagnosticProvider(diagnosticCollection: vscode.DiagnosticCollection) {
  return function updateDiagnostics(document: vscode.TextDocument): void {
    // Only process SCSS files
    if (document.languageId !== 'scss') {
      diagnosticCollection.set(document.uri, []);
      return;
    }

    const diagnostics: vscode.Diagnostic[] = [];
    
    // Only check files with Carbon layout import
    if (!hasCarbonLayoutImport(document)) {
      diagnosticCollection.set(document.uri, diagnostics);
      return;
    }

    const text = document.getText();
    const lines = text.split('\n');
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Check if line contains spacing properties
      const hasSpacingProperty = SPACING_PROPERTIES.some(prop => line.includes(prop));
      if (!hasSpacingProperty) continue;
      
      // Find hardcoded spacing values
      const spacingValueRegex = /(\d+(?:\.\d+)?(?:px|rem|em))/g;
      let match;
      
      while ((match = spacingValueRegex.exec(line)) !== null) {
        const value = match[1];
        const pxValue = parseSpacingValue(value);
        
        if (pxValue !== null) {
          const closestToken = findClosestCarbonToken(pxValue);
          const difference = Math.abs(pxValue - closestToken.pxValue);
          
          // Only warn if the difference is reasonable (within 8px)
          if (difference <= 8) {
            const range = new vscode.Range(i, match.index, i, match.index + value.length);
            const diagnostic = new vscode.Diagnostic(
              range,
              `Consider using Carbon token: ${closestToken.name} (${closestToken.px}) instead of hardcoded value`,
              vscode.DiagnosticSeverity.Warning
            );
            
            diagnostic.source = 'CarbonMate';
            diagnostic.code = 'hardcoded-spacing';
            
            diagnostic.relatedInformation = [
              new vscode.DiagnosticRelatedInformation(
                new vscode.Location(document.uri, range),
                `Original: ${value} (${pxValue}px), Suggested: ${closestToken.name} (${closestToken.px})`
              )
            ];
            
            diagnostics.push(diagnostic);
          }
        }
      }
    }
    
    diagnosticCollection.set(document.uri, diagnostics);
  };
} 