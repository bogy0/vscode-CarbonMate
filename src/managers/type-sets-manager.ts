import * as vscode from 'vscode';
import { getCarbonTypeSets, CarbonTypeSetToken } from '../utils/typography';

export class TypeSetsManager {
  private getTypeSetOptions(): vscode.QuickPickItem[] {
    const grouped = getCarbonTypeSets().reduce((acc, token) => {
      if (!acc[token.group]) acc[token.group] = [];
      acc[token.group].push(token);
      return acc;
    }, {} as Record<string, CarbonTypeSetToken[]>);

    const items: vscode.QuickPickItem[] = [];
    for (const group of Object.keys(grouped)) {
      items.push({
        label: group,
        kind: vscode.QuickPickItemKind.Separator
      });
      items.push(
        ...grouped[group].map(token => ({
          label: `$${token.name}`,
          description: token.description,
          detail: `${token.fontSize} | ${token.fontWeight} | ${token.lineHeight} | ${token.letterSpacing}`
        }))
      );
    }
    return items;
  }

  async showTypeSetsPicker(): Promise<void> {
    const options = this.getTypeSetOptions();
    const selected = await vscode.window.showQuickPick(options, {
      placeHolder: 'Select a Carbon Type Set to copy to clipboard',
      matchOnDescription: true,
      matchOnDetail: true
    });

    if (selected && selected.kind !== vscode.QuickPickItemKind.Separator) {
      await vscode.env.clipboard.writeText(selected.label);
      vscode.window.showInformationMessage(`CarbonMate: Copied "${selected.label}" to clipboard`);
    }
  }

  registerCommands(context: vscode.ExtensionContext): void {
    const showTypeSetsCommand = vscode.commands.registerCommand('carbonmate.showTypeSets', () => {
      this.showTypeSetsPicker();
    });
    context.subscriptions.push(showTypeSetsCommand);
  }
} 