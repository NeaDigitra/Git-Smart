# Changelog

All notable changes to Git-Smart will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-07-12

### Added
- **Enhanced Pattern Recognition**: Advanced vocabulary and scope analysis with 4 distinct vocabulary categories (formal, casual, technical, business)
- **Deep Commit Analysis**: New `--analyze` option provides detailed breakdown of commit history patterns and quality metrics
- **Style Profiling**: New `--profile` option displays personalized commit style analysis with recommendations
- **Advanced Confidence Scoring**: Multi-factor confidence calculation including consistency, conventional adherence, scope usage, and message quality
- **Type Frequency Analysis**: Tracks and analyzes most commonly used commit types with usage statistics
- **Scope Preference Detection**: Identifies preferred scopes and categorizes them by domain (frontend, backend, devops, testing)
- **Team Recommendations**: Intelligent suggestions for improving commit message consistency and quality
- **Enhanced CLI Options**: New flags `-e/--enhanced`, `-a/--analyze`, `-p/--profile` for advanced features

### Enhanced
- **HistoryAnalyzer**: Completely upgraded with new methods for vocabulary analysis, scope preferences, and confidence calculation
- **Style Guide Generation**: Enhanced with vocabulary style detection and team preference analysis
- **CLI Interface**: Updated help system showcasing v1.1.0 features with comprehensive examples
- **Analysis Depth**: Now analyzes up to 100 commits for better pattern recognition (increased from 50)

### Technical Improvements
- **New Analysis Methods**: `analyzeVocabulary()`, `analyzeScopePreferences()`, `analyzeTypeFrequency()`, `calculateConfidenceFactors()`
- **Enhanced Style Guides**: `generateEnhancedStyleGuide()` with vocabulary style and confidence scoring
- **Backwards Compatibility**: All existing functionality preserved, new features opt-in
- **Pattern Libraries**: Comprehensive vocabulary and scope pattern libraries for intelligent categorization

## [1.0.1] - 2025-07-12

### Fixed
- **CI/CD Pipeline**: Resolved workflow failures by removing Node.js 14.x support (not available on macOS ARM64)
- **Dependencies**: Added package-lock.json for consistent dependency management and CI caching
- **Code Quality**: Fixed 50 linting issues including debug console.log statements and trailing whitespace
- **Documentation**: Updated all CLI command references to use correct scoped package name `@neabyte/git-smart`

### Changed
- **Node.js Requirement**: Minimum version updated from 14.0.0 to 16.0.0 for better compatibility
- **CI Workflow**: Removed complex test suite matrix that required mocked git environment
- **Package Name**: Published as scoped package `@neabyte/git-smart` due to npm naming conflicts

### Added
- **Manual Workflow Trigger**: Added `workflow_dispatch` for manual CI runs
- **Enhanced Documentation**: Added both npx and global installation command examples

### Removed
- **Debug Logging**: Removed console.log statements from source files for cleaner production code
- **Test Suite CI**: Simplified CI pipeline by removing test matrix that conflicts with CI environment

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