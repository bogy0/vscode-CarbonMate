import * as vscode from 'vscode';
import { SpacingManager } from './managers/spacing-manager';
import { TypeSetsManager } from './managers/type-sets-manager';

export function activate(context: vscode.ExtensionContext) {
  console.log('CarbonMate extension is now active!');

  // Initialize spacing functionality
  const spacingManager = new SpacingManager();
  spacingManager.initialize(context);

  // Initialize type sets functionality
  const typeSetsManager = new TypeSetsManager();
  typeSetsManager.registerCommands(context);
}

export function deactivate() {} 