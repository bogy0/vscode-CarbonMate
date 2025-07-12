# Change Log

All notable changes to the "CarbonMate" extension will be documented in this file.

## [1.0.0] - 2025-01-12

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