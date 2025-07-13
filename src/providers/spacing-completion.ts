import * as vscode from 'vscode'
import { getCarbonSpacingTokens, isSpacingProperty, hasCarbonLayoutImport } from '../utils/spacing'
import { CarbonSpacingToken } from '../types/spacing'

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

export function createSpacingCompletionProvider(): vscode.CompletionItemProvider {
  return {
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
  }
} 