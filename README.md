# Git-Smart

AI-powered git commit message generator that works completely offline. Analyzes your staged changes and generates meaningful commit messages following the format: `type(action): description`.

📚 **[Complete Documentation →](https://neadigitra.github.io/Git-Smart/)**

## Features

- 🤖 **Intelligent Analysis**: Analyzes code changes, file types, and patterns
- 📚 **Learning from History**: Adapts to your existing commit style
- 🎯 **Conventional Commits**: Generates messages in `type(action): description` format
- 💬 **Interactive Mode**: Choose from multiple suggestions or write custom
- 🔒 **Completely Offline**: No API keys or external services required
- ⚡ **Zero Configuration**: Works out of the box

## Installation

```bash
npm install -g @neabyte/git-smart
```

Or use directly:
```bash
npx @neabyte/git-smart
```

## Usage

### Basic Usage
```bash
git add .
npx @neabyte/git-smart
```

Example output:
```
🔍 Analyzing changes...
💡 Suggested commit: "feat(auth): implement user authentication system"
Use this message? (Y/n): y
✅ Committed successfully!
```

### Interactive Mode
```bash
npx @neabyte/git-smart --interactive
```

Example output:
```
🔍 Analyzing changes...
   • Files: 2 added, 1 modified
   • Types: JavaScript, TypeScript
   • Functions: authenticateUser, validateToken
   • Type: feat (85% confidence)

💡 Suggested commit messages:
   1. feat(auth): implement user authentication system 🎯 (85%)
   2. feat(auth): add user authentication system 👍 (75%)
   3. feat(auth): create user authentication system 👍 (65%)
   4. Edit custom message

Choose (1-4): 1
✅ Committed successfully!
```

### Options

```bash
npx @neabyte/git-smart [options]

Options:
  -i, --interactive    Interactive mode with multiple suggestions
  -v, --verbose        Show detailed analysis information
  -d, --dry-run        Show suggested message without committing
  -h, --help           Show help message
```

Or if installed globally:
```bash
git-smart [options]
```

## Commit Format

Git-Smart generates commits in the format: **`type(action): description`**

### Types
**Core Types:**
- `feat`: New features and functionality
- `fix`: Bug fixes and patches
- `refactor`: Code refactoring without changing functionality
- `docs`: Documentation changes
- `test`: Test additions/changes
- `style`: Code style changes (formatting, etc.)
- `chore`: Maintenance tasks
- `perf`: Performance improvements

**Extended Types:**
- `build`: Build system changes (webpack, babel, etc.)
- `ci`: CI/CD pipeline changes (GitHub Actions, etc.)
- `security`: Security fixes and improvements
- `deps`: Dependency updates
- `revert`: Revert previous changes
- `hotfix`: Critical/urgent fixes
- `wip`: Work in progress
- `merge`: Merge branches/pull requests
- `init`: Initial commit or project setup
- `release`: Version releases and publishing

### Actions (Scopes)
**Core Actions:**
- `create`: New files/components
- `update`: Modify existing code
- `remove`: Delete files/code
- `implement`: Add new functionality
- `core`: Core functionality changes

**Architecture:**
- `api`: API endpoints and routes
- `service`: Service layer changes
- `controller`: Controller logic
- `model`: Data models and entities
- `data`: Data layer and repositories
- `middleware`: Middleware components

**Frontend:**
- `ui`: User interface components
- `component`: React/Vue/Angular components
- `view`: Templates and views
- `layout`: Page layouts
- `style`: CSS/SCSS styling

**Backend:**
- `database`: Database operations
- `migration`: Database migrations
- `schema`: Database schema changes
- `query`: Database queries

**User Management:**
- `auth`: Authentication systems
- `user`: User management
- `admin`: Admin functionality
- `security`: Security measures
- `permission`: Permissions and roles

**DevOps:**
- `build`: Build configuration
- `ci`: Continuous integration
- `deploy`: Deployment scripts
- `config`: Configuration files
- `docker`: Containerization

**Business Features:**
- `payment`: Payment systems
- `order`: Order management
- `cart`: Shopping cart
- `product`: Product catalog
- `notification`: Alerts and emails

**Monitoring:**
- `logging`: Logging systems
- `monitoring`: System monitoring
- `analytics`: Analytics tracking
- `performance`: Performance optimization

**Utilities:**
- `utils`: Utility functions
- `test`: Testing frameworks
- `docs`: Documentation
- `i18n`: Internationalization

### Examples
```
feat(auth): implement JWT token validation
fix(api): resolve null pointer exception in user service
refactor(ui): restructure component hierarchy
docs(readme): update installation instructions
test(auth): add unit tests for login functionality
security(auth): patch authentication vulnerability
build(webpack): update build configuration
ci(github): add automated testing workflow
perf(database): optimize user query performance
deps(package): upgrade React to v18
hotfix(payment): fix critical billing calculation error
init(project): setup initial project structure
```

## How It Works

1. **Analyzes Staged Changes**: Examines git diff, file types, and patterns
2. **Learns from History**: Studies your existing commit messages for style preferences
3. **Generates Smart Messages**: Creates contextually appropriate commit messages
4. **Provides Options**: Offers multiple suggestions or custom message input

## Requirements

- Node.js 14.0.0 or higher
- Git repository with staged changes
- No external dependencies or API keys needed

## Examples

### Adding Authentication
```bash
$ git add src/auth.js src/login.js
$ npx @neabyte/git-smart

🔍 Analyzing changes...
💡 Suggested commit: "feat(auth): implement user authentication system"
```

### Bug Fix
```bash
$ git add src/api/users.js
$ npx @neabyte/git-smart

🔍 Analyzing changes...
💡 Suggested commit: "fix(api): resolve null response handling"
```

### Documentation Update
```bash
$ git add README.md docs/
$ npx @neabyte/git-smart

🔍 Analyzing changes...
💡 Suggested commit: "docs(readme): update API documentation"
```

### Test Addition
```bash
$ git add tests/auth.test.js
$ npx @neabyte/git-smart

🔍 Analyzing changes...
💡 Suggested commit: "test(auth): add authentication test coverage"
```

## Contributing

1. Fork the repository at [https://github.com/NeaDigitra/Git-Smart](https://github.com/NeaDigitra/Git-Smart)
2. Create your feature branch: `git checkout -b feat/new-feature`
3. Commit your changes: `npx @neabyte/git-smart`
4. Push to the branch: `git push origin feat/new-feature`
5. Submit a pull request

## Advanced Features

### Comprehensive Type Detection
Git-Smart intelligently detects the most appropriate commit type based on:
- **File paths**: Recognizes patterns like `auth/`, `test/`, `.github/workflows/`
- **File extensions**: Understands `.css`, `.sql`, `.yml`, `.md`, etc.
- **Code changes**: Analyzes new functions, classes, imports, and patterns
- **Keywords**: Detects security, performance, build-related terms

### Smart Action Recognition
Over 70+ actions/scopes are automatically detected:
- **Security**: `auth`, `security`, `permission`, `oauth`, `jwt`
- **DevOps**: `build`, `ci`, `deploy`, `docker`, `k8s`
- **Business**: `payment`, `order`, `cart`, `product`, `notification`
- **Architecture**: `api`, `service`, `controller`, `model`, `middleware`
- **And many more...**

### Package Statistics
- 📦 **18 commit types** (8 core + 10 extended)
- 🎯 **70+ actions/scopes** for precise categorization
- 🚀 **15.9 kB** compressed package size
- 🔒 **Zero dependencies** - completely self-contained
- ⚡ **Offline operation** - no internet required

## Why Git-Smart?

- **Saves Time**: No more thinking about commit message format
- **Consistent Style**: Maintains uniform commit history
- **Better Documentation**: Clear, descriptive commit messages
- **Team Friendly**: Easy for teams to adopt consistent practices
- **Zero Overhead**: No setup, configuration, or API costs
- **Industry Standard**: Follows conventional commits specification
- **Intelligent**: Learns from your project's commit history

Start using Git-Smart today and never write another boring commit message!

## License

MIT License - see LICENSE file for details.