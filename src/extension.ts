import * as vscode from 'vscode';
import { SpacingManager } from './managers/spacing-manager';

export function activate(context: vscode.ExtensionContext) {
  console.log('CarbonMate extension is now active!');

  // Initialize spacing functionality
  const spacingManager = new SpacingManager();
  spacingManager.initialize(context);
}

export function deactivate() {} 