# CarbonMate - VS Code Extension

A VS Code extension that provides Carbon Design System token suggestions for SCSS files. Automatically detects SCSS files and suggests Carbon spacing tokens when writing CSS properties like margin and padding.

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://marketplace.visualstudio.com/items?itemName=your-username.carbonmate)
[![License](https://img.shields.io/badge/license-ISC-green.svg)](LICENSE)

## Features

- **SCSS File Detection**: Automatically activates when editing SCSS files
- **Carbon Spacing Tokens**: Provides suggestions for all Carbon Design System spacing tokens
- **Carbon Typography Tokens**: Access all Carbon type sets with detailed typography specifications
- **Carbon Color Tokens**: Browse and copy Carbon color tokens with detailed specifications
- **Smart Suggestions**: Only shows spacing token suggestions when writing margin or padding properties
- **Rich Documentation**: Each token includes rem and px values with descriptions
- **Hardcoded Value Detection**: Detects hardcoded spacing values and suggests Carbon token replacements
- **Import Awareness**: Ensures proper `@use '@carbon/layout';` import is present
- **Performance Optimized**: Only processes active SCSS files for better performance

## Carbon Spacing Tokens

The extension provides suggestions for all 13 Carbon spacing tokens:

| Token | rem | px | Description |
|-------|-----|----|-------------|
| `layout.$spacing-01` | 0.125rem | 2px | Smallest spacing increment |
| `layout.$spacing-02` | 0.25rem | 4px | Small spacing increment |
| `layout.$spacing-03` | 0.5rem | 8px | Extra small spacing |
| `layout.$spacing-04` | 0.75rem | 12px | Small spacing |
| `layout.$spacing-05` | 1rem | 16px | Medium spacing |
| `layout.$spacing-06` | 1.5rem | 24px | Large spacing |
| `layout.$spacing-07` | 2rem | 32px | Extra large spacing |
| `layout.$spacing-08` | 2.5rem | 40px | 2XL spacing |
| `layout.$spacing-09` | 3rem | 48px | 3XL spacing |
| `layout.$spacing-10` | 4rem | 64px | 4XL spacing |
| `layout.$spacing-11` | 5rem | 80px | 5XL spacing |
| `layout.$spacing-12` | 6rem | 96px | 6XL spacing |
| `layout.$spacing-13` | 10rem | 160px | 7XL spacing |

## Carbon Typography Tokens

The extension provides access to all Carbon type sets with detailed typography specifications. Use the Command Palette to browse and copy typography tokens to your clipboard.

### Available Type Set Groups

- **Small Style**: Code snippets, labels, helper text, and legal copy
- **Body**: Body text for short and long paragraphs
- **Fixed Headings**: Component and layout headings with fixed sizes
- **Fluid Headings**: Responsive headings that scale with viewport
- **Fluid Callouts**: Quotations and larger paragraphs
- **Fluid Display**: Large display text for hero sections

### Typography Token Details

Each typography token includes:
- **Font Size**: Both pixel and rem values
- **Font Weight**: Numeric weight (300, 400, 600)
- **Line Height**: Both pixel and rem values
- **Letter Spacing**: Spacing between characters
- **Description**: Usage guidelines and context

### Example Typography Tokens

| Token | Font Size | Weight | Line Height | Letter Spacing | Use Case |
|-------|-----------|--------|-------------|----------------|----------|
| `$heading-07` | 54px / 3.375rem | 300 | 64px / 4rem | 0px | Large layout headings |
| `$body-01` | 14px / .875rem | 400 | 20px / 1.25rem | .16px | Long body paragraphs |
| `$code-01` | 12px / .75rem | 400 | 16px / 1rem | .32px | Inline code snippets |
| `$label-01` | 12px / .75rem | 400 | 16px / 1rem | .32px | Field labels and captions |

## Carbon Color Tokens

The extension provides access to all Carbon color tokens with detailed color specifications. Use the Command Palette to browse and copy color tokens to your clipboard.

### Available Color Token Groups

- **Interactive**: Primary, secondary, tertiary, and quaternary interactive colors
- **UI**: Background colors for different UI surfaces and levels
- **Text**: Text colors for various content types and contexts
- **Icon**: Icon colors for different visual hierarchies
- **Field**: Input field background colors
- **Inverse**: Colors for dark/light theme inversions
- **Support**: Semantic colors for error, success, warning, and info states
- **Overlay**: Overlay colors for modals and backdrop elements

### Color Token Details

Each color token includes:
- **Hex Value**: Standard hexadecimal color code
- **RGB Value**: RGB color values with alpha channel
- **Usage Description**: Guidelines for when and how to use the color
- **Group Classification**: Category and purpose of the color

### Example Color Tokens

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `$interactive-01` | #0f62fe | rgba(15, 98, 254, 1) | Primary buttons, links, and interactive elements |
| `$text-01` | #161616 | rgba(22, 22, 22, 1) | Primary text and headings |
| `$support-01` | #da1e28 | rgba(218, 30, 40, 1) | Error states and destructive actions |
| `$ui-01` | #ffffff | rgba(255, 255, 255, 1) | Main page backgrounds and card surfaces |
| `$overlay-01` | rgba(22, 22, 22, 0.5) | rgba(22, 22, 22, 0.5) | Modal overlays and backdrop elements |

## Installation

### From VSIX (Local Installation)
1. Download the latest `.vsix` file from the [Releases](https://github.com/your-username/vscode-CarbonMate/releases) page
2. In VS Code, go to Extensions (`Ctrl+Shift+X`)
3. Click the "..." menu and select "Install from VSIX..."
4. Choose the downloaded `.vsix` file

### From Source
1. Clone this repository
2. Run `npm install`
3. Run `npm run compile`
4. Press `F5` to run the extension in a new VS Code window

## Usage

### 1. Token Suggestions

1. Open a SCSS file in VS Code
2. Add `@use '@carbon/layout';` at the top of the file
3. Start typing a spacing property (margin, padding, etc.)
4. Type `$` to trigger the suggestions
5. Select a Carbon spacing token from the dropdown

### 2. Magic Number Replacement

1. Open a SCSS file with `@use '@carbon/layout';` import
2. Notice CarbonMate underlines hardcoded spacing values (e.g., `16px`, `1rem`, `2em`)
3. Use `Ctrl+.` (Windows/Linux) or `Cmd+.` (Mac) to quick fix one of the selected value - the extension will suggest the closest Carbon token
4. Alternatively:
   - Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
   - Type `CarbonMate`
   - Select `Fix all hardcoded spacing values`
5. The extension will automatically replace all hardcoded values with their closest matching Carbon tokens in the file

### 3. Typography Token Access

1. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac) to open Command Palette
2. Type `CarbonMate: Show Type Sets`
3. Browse through grouped typography tokens with detailed specifications
4. Select a token to copy it to your clipboard (e.g., `$heading-07`)
5. Paste the token into your SCSS file where needed

### 4. Color Token Access

1. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac) to open Command Palette
2. Type `CarbonMate: Show Color Tokens`
3. Browse through grouped color tokens with hex and RGB values
4. Select a token to copy it to your clipboard (e.g., `$interactive-01`)
5. Paste the token into your SCSS file where needed

### Example

```scss
@use '@carbon/layout';

.my-component {
  // Manual token usage
  margin: layout.$spacing-05;    // ✅ Correct Carbon syntax
  padding: layout.$spacing-03;   // ✅ Correct Carbon syntax
  
  // Hardcoded values that can be replaced
  margin: 16px;                 // 🔄 Can be replaced with layout.$spacing-05
  padding: 24px;                // 🔄 Can be replaced with layout.$spacing-06
  
  // Color token usage
  background-color: $ui-01;     // ✅ Carbon color token
  color: $text-01;              // ✅ Carbon color token
  border-color: $interactive-01; // ✅ Carbon color token
}
```

## Hardcoded Value Detection

The extension can detect and suggest replacements for:

- **Pixel values**: `16px`, `24px`, `32px`, etc.
- **Rem values**: `1rem`, `1.5rem`, `2rem`, etc.
- **Em values**: `1em`, `1.5em`, `2em`, etc.

### Replacement Logic

- **Exact matches**: Direct replacement with corresponding Carbon token
- **Close matches**: Suggests the closest Carbon token (within 8px difference)
- **Far matches**: No suggestion (values too far from Carbon tokens)

### Examples

| Original Value | Suggested Carbon Token | Difference |
|----------------|----------------------|------------|
| `16px` | `layout.$spacing-05` | 0px (exact) |
| `18px` | `layout.$spacing-05` | 2px |
| `24px` | `layout.$spacing-06` | 0px (exact) |
| `1rem` | `layout.$spacing-05` | 0px (exact) |
| `2em` | `layout.$spacing-07` | 0px (exact) |

## Commands

- `CarbonMate: Fix All Hardcoded Spacing Values` - Replace all hardcoded spacing values in the current file
- `CarbonMate: Refresh Code Check` - Manually refresh the code analysis
- `CarbonMate: Show Type Sets` - Browse and copy Carbon typography tokens to clipboard
- `CarbonMate: Show Color Tokens` - Browse and copy Carbon color tokens to clipboard

## Development

### Prerequisites

- Node.js (v16 or higher)
- VS Code

### Setup

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/vscode-CarbonMate.git
   cd vscode-CarbonMate
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Compile the extension
   ```bash
   npm run compile
   ```

4. Press `F5` to run the extension in a new VS Code window

### Build Commands

```bash
npm run compile    # Compile TypeScript
npm run watch      # Watch for changes and recompile
npm run lint       # Run ESLint
```

### Creating a VSIX Package

```bash
npm install -g vsce
vsce package
```

This will create a `.vsix` file that can be installed in VS Code.

## Configuration

The extension can be configured through VS Code settings:

- `carbonmate.enable`: Enable/disable the extension (default: true)

## Dependencies

- `@carbon/layout`: Carbon Design System layout tokens
- `@carbon/type`: Carbon Design System typography tokens
- `@types/vscode`: VS Code extension API types
- `typescript`: TypeScript compiler

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Issues

If you find any issues or have suggestions, please [open an issue](https://github.com/your-username/vscode-CarbonMate/issues) on GitHub.

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Carbon Design System](https://carbondesignsystem.com/) for the spacing tokens
- [VS Code Extension API](https://code.visualstudio.com/api) for the development framework 