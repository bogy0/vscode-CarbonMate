import * as vscode from 'vscode';
import { getCarbonColorTokens, CarbonColorToken } from '../utils/colors';

export class ColorTokensManager {
  private getColorTokenOptions(): vscode.QuickPickItem[] {
    const grouped = getCarbonColorTokens().reduce((acc, token) => {
      if (!acc[token.group]) acc[token.group] = [];
      acc[token.group].push(token);
      return acc;
    }, {} as Record<string, CarbonColorToken[]>);

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
          detail: `${token.hex} | ${token.rgb}`
        }))
      );
    }
    return items;
  }

  async showColorTokensPicker(): Promise<void> {
    const options = this.getColorTokenOptions();
    const selected = await vscode.window.showQuickPick(options, {
      placeHolder: 'Select a Carbon Color Token to copy to clipboard',
      matchOnDescription: true,
      matchOnDetail: true
    });

    if (selected && selected.kind !== vscode.QuickPickItemKind.Separator) {
      await vscode.env.clipboard.writeText(selected.label);
      vscode.window.showInformationMessage(`CarbonMate: Copied "${selected.label}" to clipboard`);
    }
  }

  registerCommands(context: vscode.ExtensionContext): void {
    const showColorTokensCommand = vscode.commands.registerCommand('carbonmate.showColorTokens', () => {
      this.showColorTokensPicker();
    });
    context.subscriptions.push(showColorTokensCommand);
  }
} 