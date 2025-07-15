# Change Log

All notable changes to the "CarbonMate" extension will be documented in this file.

## [1.2.0] - 2025-01-27

### Added
- **Carbon Typography Tokens**: New command palette action to browse and copy Carbon type sets
  - Access to all Carbon typography tokens with detailed specifications
  - Grouped display by category (Small Style, Body, Fixed Headings, Fluid Headings, etc.)
  - Detailed typography information including font size, weight, line height, and letter spacing
  - One-click clipboard copying of typography tokens
  - Command: `CarbonMate: Show Type Sets`

- **Carbon Color Tokens**: New command palette action to browse and copy Carbon color tokens
  - Access to all Carbon color tokens with detailed color specifications
  - Grouped display by category (Interactive, UI, Text, Icon, Field, Inverse, Support, Overlay)
  - Detailed color information including hex values and RGB values with rgba() formatting
  - One-click clipboard copying of color tokens
  - Command: `CarbonMate: Show Color Tokens`

### New Features
- **Type Sets Manager**: Dedicated manager for typography token functionality
  - `src/managers/type-sets-manager.ts` - Core typography management logic
  - `src/utils/typography.ts` - Typography token definitions and utilities
  - Grouped QuickPick interface with separators for better organization

- **Color Tokens Manager**: Dedicated manager for color token functionality
  - `src/managers/color-tokens-manager.ts` - Core color management logic
  - `src/utils/colors.ts` - Color token definitions and utilities
  - Enhanced color value formatting with rgba() support

### Technical Improvements
- Added `@carbon/type` dependency for typography token support
- Enhanced extension architecture with modular managers
- Improved command palette integration with grouped token displays
- Better separation of concerns with dedicated utility files

### Documentation
- Updated README with comprehensive documentation for new features
- Added typography and color token usage examples
- Enhanced feature descriptions and command documentation
- Added detailed token specifications and usage guidelines

## [1.1.0] - 2025-07-13

### Changed
- Refactored code structure for better maintainability
- Moved spacing-related functionality into separate modules:
  - `managers/spacing-manager.ts` - Core spacing management logic
  - `providers/spacing-code-actions.ts` - Code action providers for spacing fixes
  - `providers/spacing-completion.ts` - Completion providers for spacing tokens
  - `providers/spacing-diagnostics.ts` - Diagnostic providers for hardcoded values
  - `utils/spacing.ts` - Utility functions for spacing operations
  - `utils/constants.ts` - Shared constants and configurations
- Improved code organization and separation of concerns
- Enhanced maintainability and testability of the extension

## [1.0.0] - 2025-07-12

### Added
- Initial release of CarbonMate VS Code extension
- Carbon Design System spacing token suggestions for SCSS files
- Automatic detection of SCSS files and spacing properties
- Smart import detection for `@use '@carbon/layout'` with multiple quote styles
- Hardcoded spacing value detection and replacement suggestions
- Linter warnings for hardcoded spacing values with quick-fix options
- "Fix All" command to replace all hardcoded spacing values at once
- Performance optimizations for SCSS-only processing
- Support for px, rem, and em value detection and conversion
- Rich documentation and branding for all suggestions

### Features
- **Token Suggestions**: Provides all 13 Carbon spacing tokens when typing `$` after spacing properties
- **Import Awareness**: Ensures proper Carbon layout import is present
- **Hardcoded Value Detection**: Underlines hardcoded spacing values with replacement suggestions
- **Quick Fixes**: One-click replacement of hardcoded values with Carbon tokens
- **Fix All Command**: Bulk replacement of all hardcoded spacing values
- **Performance Optimized**: Only processes active SCSS files for better performance

### Technical Details
- Built with TypeScript and VS Code Extension API
- Uses `@carbon/layout` package for accurate token values
- Supports multiple quote styles for import statements
- Real-time diagnostics and code action updates 