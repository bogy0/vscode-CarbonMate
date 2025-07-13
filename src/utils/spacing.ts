import * as vscode from 'vscode';
import { spacing01, spacing02, spacing03, spacing04, spacing05, spacing06, spacing07, spacing08, spacing09, spacing10, spacing11, spacing12, spacing13 } from '@carbon/layout';
import { CarbonSpacingToken } from '../types/spacing';
import { SPACING_PROPERTIES } from './constants';

export function getCarbonSpacingTokens(): CarbonSpacingToken[] {
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
  ];
}

export function isSpacingProperty(text: string): boolean {
  return SPACING_PROPERTIES.some(prop => text.includes(prop));
}

export function hasCarbonLayoutImport(document: vscode.TextDocument): boolean {
  const text = document.getText();
  // Check for different quote styles and variations
  const importPatterns = [
    "@use '@carbon/layout'",
    "@use '@carbon/layout';",
    '@use "@carbon/layout"',
    '@use "@carbon/layout";',
    "@use @carbon/layout",
    "@use @carbon/layout;"
  ];
  return importPatterns.some(pattern => text.includes(pattern));
}

export function findClosestCarbonToken(targetPx: number): CarbonSpacingToken {
  const tokens = getCarbonSpacingTokens();
  let closest = tokens[0];
  let minDifference = Math.abs(targetPx - closest.pxValue);
  
  for (const token of tokens) {
    const difference = Math.abs(targetPx - token.pxValue);
    if (difference < minDifference) {
      minDifference = difference;
      closest = token;
    }
  }
  
  return closest;
}

export function parseSpacingValue(value: string): number | null {
  // Remove whitespace and convert to lowercase
  const cleanValue = value.trim().toLowerCase();
  
  // Match px values (e.g., "16px", "24px")
  const pxMatch = cleanValue.match(/^(\d+(?:\.\d+)?)px$/);
  if (pxMatch) {
    return parseFloat(pxMatch[1]);
  }
  
  // Match rem values (e.g., "1rem", "1.5rem") - convert to px (assuming 16px base)
  const remMatch = cleanValue.match(/^(\d+(?:\.\d+)?)rem$/);
  if (remMatch) {
    return parseFloat(remMatch[1]) * 16;
  }
  
  // Match em values (e.g., "1em", "1.5em") - convert to px (assuming 16px base)
  const emMatch = cleanValue.match(/^(\d+(?:\.\d+)?)em$/);
  if (emMatch) {
    return parseFloat(emMatch[1]) * 16;
  }
  
  return null;
} 