# Contributing to Git-Smart

Thank you for your interest in contributing to Git-Smart! This guide will help you get started.

## Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/NeaDigitra/Git-Smart.git
   cd Git-Smart
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run Tests**
   ```bash
   npm test
   ```

## Development Workflow

1. **Create a Branch**
   ```bash
   git checkout -b feat/your-feature-name
   ```

2. **Make Changes**
   - Follow the existing code style
   - Add tests for new functionality
   - Update documentation as needed

3. **Test Your Changes**
   ```bash
   npm test
   npm run test:unit
   npm run test:integration
   ```

4. **Commit Changes**
   ```bash
   git add .
   npm start  # Use git-smart itself!
   ```

5. **Push and Create PR**
   ```bash
   git push origin feat/your-feature-name
   ```
   Then create a pull request on GitHub.

## Code Style

- Use meaningful variable and function names
- Follow existing patterns in the codebase
- Add JSDoc comments for public APIs
- Keep functions small and focused

## Testing

- Write unit tests for new functions
- Add integration tests for major features
- Ensure all tests pass before submitting

## Commit Messages

Use Git-Smart itself to generate commit messages! The tool follows conventional commits:

- `feat(scope): description` - New features
- `fix(scope): description` - Bug fixes
- `docs(scope): description` - Documentation changes
- `test(scope): description` - Test additions/changes
- `refactor(scope): description` - Code refactoring

## Project Structure

```
src/
├── GitSmart.js           # Main class
├── analyzers/            # Code analysis modules
├── generators/           # Message generation
└── utils/               # Utility functions

tests/
├── unit/                # Unit tests
├── integration/         # Integration tests
└── fixtures/            # Test data
```

## Areas for Contribution

- **New Language Support**: Add analysis for more programming languages
- **Commit Patterns**: Improve pattern recognition
- **Performance**: Optimize analysis algorithms
- **Documentation**: Improve examples and guides
- **Bug Fixes**: Fix reported issues

## Questions?

- Open an issue for discussion
- Check existing issues and PRs
- Follow the project's code of conduct

Thank you for contributing to Git-Smart!