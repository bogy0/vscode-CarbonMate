import * as vscode from 'vscode'
import { hasCarbonLayoutImport, parseSpacingValue, findClosestCarbonToken } from '../utils/spacing'

export function createSpacingCodeActionProvider(): vscode.CodeActionProvider {
  return {
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
  }
} 