# Changelog

All notable changes to Git-Smart will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-07-12

### Added
- 🎉 Initial release of Git-Smart
- AI-powered commit message generation that works completely offline
- Intelligent analysis of staged changes and code patterns
- Learning from existing commit history for personalized style
- Interactive mode with multiple commit message suggestions
- Support for conventional commit format with type(action): description
- **18 commit types** including extended types (build, ci, security, deps, etc.)
- **70+ actions/scopes** for precise categorization
- Automatic detection of change types with high accuracy
- Smart action detection based on file paths, extensions, and content
- Zero configuration setup - works out of the box
- Support for multiple programming languages and file types
- Dry-run mode for testing suggestions without committing
- Verbose mode for detailed analysis information
- Command-line interface with intuitive options
- Comprehensive test suite with unit and integration tests
- Complete documentation and examples

### Commit Types (18 total)
**Core Types**: feat, fix, refactor, docs, test, style, chore, perf
**Extended Types**: build, ci, security, deps, revert, hotfix, wip, merge, init, release

### Actions/Scopes (70+ total)
- **Architecture**: api, service, controller, model, data, middleware
- **Security**: auth, security, permission, oauth, jwt, session
- **DevOps**: build, ci, deploy, docker, k8s, monitoring
- **Business**: payment, order, cart, product, notification, analytics
- **Frontend**: ui, component, view, layout, style
- **Backend**: database, migration, schema, query
- **And many more...**

### Features
- **Offline Operation**: No API keys or external services required
- **Smart Analysis**: Understands code structure, functions, classes, and patterns
- **Style Learning**: Adapts to your project's existing commit message style
- **Conventional Commits**: Generates properly formatted conventional commit messages
- **Multi-language Support**: Works with JavaScript, TypeScript, Python, Java, and more
- **Interactive Prompts**: Choose from multiple suggestions or write custom messages
- **Cross-platform**: Works on macOS, Linux, and Windows
- **Comprehensive Detection**: File paths, extensions, keywords, and code analysis
- **Zero Dependencies**: Completely self-contained package

### Technical Details
- Built with Node.js (requires 14.0.0+)
- Pure JavaScript implementation with no external dependencies
- Modular architecture with separate analyzers and generators
- Comprehensive error handling and user feedback
- Extensive test coverage for reliability

---

## Future Releases

See [GitHub Issues](https://github.com/NeaDigitra/Git-Smart/issues) for planned features and improvements.