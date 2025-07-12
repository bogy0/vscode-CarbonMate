# Contributing to CarbonMate

Thank you for your interest in contributing to CarbonMate! This document provides guidelines and information for contributors.

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- VS Code
- Git

### Development Setup
1. Fork the repository
2. Clone your fork locally
3. Install dependencies: `npm install`
4. Compile the extension: `npm run compile`
5. Press `F5` to run the extension in a new VS Code window

## Development Guidelines

### Code Style
- Use TypeScript for all new code
- Follow the existing code style and formatting
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

### Testing
- Test your changes with various SCSS files
- Verify token suggestions work correctly
- Check hardcoded value detection
- Test quick fixes and "Fix All" command
- Ensure performance remains optimal

### Commit Messages
Use conventional commit format:
- `feat: add new feature`
- `fix: resolve bug`
- `docs: update documentation`
- `refactor: improve code structure`
- `test: add tests`

## Pull Request Process

1. Create a feature branch from `main`
2. Make your changes
3. Test thoroughly
4. Update documentation if needed
5. Submit a pull request with a clear description

### PR Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Tests pass
- [ ] No new warnings generated

## Issue Reporting

When reporting issues, please include:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, VS Code version, etc.)
- Sample SCSS code that reproduces the issue

## Feature Requests

When suggesting new features:
- Explain the problem you're solving
- Describe your proposed solution
- Provide example usage
- Consider implementation complexity

## Questions?

If you have questions about contributing, feel free to:
- Open an issue for discussion
- Ask in the GitHub discussions
- Contact the maintainers

Thank you for contributing to CarbonMate! 🎉 