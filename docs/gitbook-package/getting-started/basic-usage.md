# Basic Usage

Get started with Git-Smart in minutes. This guide covers the fundamental usage patterns that will transform your commit workflow.

## Prerequisites

Before using Git-Smart, ensure you have:
- ✅ Git-Smart installed ([Installation Guide](installation.md))
- ✅ A git repository initialized (`git init`)
- ✅ Some staged changes (`git add .`)

## Your First Git-Smart Commit

### 1. Stage Your Changes

```bash
# Make some changes to your files
echo "console.log('Hello World')" > src/app.js

# Stage the changes
git add .
```

### 2. Generate Commit Message

```bash
# Run Git-Smart
git-smart
```

**Example Output:**
```
🔍 Analyzing changes...
💡 Suggested commit: "feat(core): add hello world functionality"
Use this message? (Y/n): y
✅ Committed successfully!
```

That's it! Git-Smart analyzed your changes and created a professional commit message following conventional commit standards.

## Basic Workflow Patterns

### Quick Commit (Default Mode)
```bash
git add .
git-smart
```
- Analyzes changes automatically
- Generates single best suggestion
- Commits immediately if you accept

### Preview Mode (Dry Run)
```bash
git add .
git-smart --dry-run
```
- See suggested message without committing
- Perfect for learning and testing
- No changes to your git history

### Interactive Mode
```bash
git add .
git-smart --interactive
```
- Multiple suggestions with confidence scores
- Choose best option or write custom message
- Detailed analysis information

## Understanding Git-Smart Output

### Analysis Phase
```
🔍 Analyzing changes...
```
Git-Smart examines:
- Files changed (added, modified, deleted)
- Code patterns (functions, classes, imports)
- File types and categories
- Your commit history for style preferences

### Suggestion Generation
```
💡 Suggested commit: "feat(auth): implement user authentication"
```
The suggestion includes:
- **Type** (`feat`) - What kind of change this is
- **Scope** (`auth`) - What area of code is affected
- **Description** - Clear explanation of the change

### Confirmation
```
Use this message? (Y/n): 
```
Options:
- **Y/Enter** - Accept and commit with suggested message
- **n** - Decline and exit (no commit made)
- **e** - Edit the message before committing

## Common Usage Examples

### Adding New Features
```bash
# Add new functionality
git add src/payment.js
git-smart

# Output: "feat(payment): implement payment processing"
```

### Bug Fixes
```bash
# Fix a bug
git add src/validation.js
git-smart

# Output: "fix(validation): resolve email validation issue"
```

### Documentation Updates
```bash
# Update documentation
git add README.md docs/
git-smart

# Output: "docs(readme): update installation instructions"
```

### Configuration Changes
```bash
# Update configuration
git add package.json webpack.config.js
git-smart

# Output: "build(config): update webpack and dependencies"
```

## What Git-Smart Analyzes

### File Changes
- **New files** - Detected as features or additions
- **Modified files** - Analyzed for change type
- **Deleted files** - Identified as removal or cleanup
- **Renamed files** - Recognized as refactoring

### Code Patterns
- **New functions/classes** - Suggests `feat` type
- **Bug fix keywords** - Suggests `fix` type
- **Import changes** - Indicates dependencies or structure changes
- **Test files** - Automatically uses `test` type

### Project Context
- **File extensions** - JavaScript, Python, CSS, etc.
- **Directory structure** - Frontend, backend, config, etc.
- **Naming conventions** - API, UI, database patterns
- **Existing commit history** - Learns your preferred style

## Handling Different Scenarios

### Mixed Changes
If you have both new features and bug fixes:
```bash
# Git-Smart will prioritize the most significant change
git add src/feature.js src/bugfix.js
git-smart

# Might suggest: "feat(core): add new feature and fix validation"
```

**💡 Tip:** For clarity, consider separate commits:
```bash
git add src/bugfix.js
git-smart  # "fix(validation): resolve email issue"

git add src/feature.js  
git-smart  # "feat(core): add new feature"
```

### Large Changes
For commits with many files:
```bash
git add .
git-smart

# Git-Smart will identify the primary change pattern
# Example: "refactor(core): restructure application architecture"
```

### No Clear Pattern
If Git-Smart can't determine a clear pattern:
```bash
git-smart --interactive
```
Use interactive mode to see multiple options and choose the best fit.

## Best Practices

### 1. Stage Related Changes Together
```bash
# Good: Related authentication changes
git add src/auth.js src/login.js tests/auth.test.js
git-smart

# Better: Separate concerns
git add src/auth.js src/login.js
git-smart  # "feat(auth): implement authentication system"

git add tests/auth.test.js
git-smart  # "test(auth): add authentication test coverage"
```

### 2. Use Descriptive File Names
Git-Smart learns from file names and paths:
```bash
# Clear file organization helps Git-Smart understand context
src/
  components/
    user/
      UserProfile.js  # Git-Smart understands this is UI/user related
  services/
    api/
      userService.js  # Git-Smart understands this is API/service related
```

### 3. Review Suggestions
```bash
# Always review the suggestion
git-smart --dry-run  # Preview first
git-smart             # Commit if you like it
```

### 4. Learn from Interactive Mode
```bash
# Use interactive mode to learn patterns
git-smart --interactive

# See how Git-Smart thinks about your changes
# Choose alternatives to understand different perspectives
```

## Troubleshooting Common Issues

### "No staged changes found"
```bash
# Solution: Stage your changes first
git add .
git-smart
```

### "Not a git repository"
```bash
# Solution: Initialize git repository
git init
git add .
git-smart
```

### Unexpected suggestions
```bash
# Solution: Use interactive mode to see alternatives
git-smart --interactive

# Or get more details about the analysis
git-smart --verbose --dry-run
```

## Next Steps

Now that you understand basic usage:

- [Interactive Mode](../core-features/interactive-mode.md) - Explore multiple suggestions
- [Enhanced Features](../advanced-features/pattern-recognition.md) - Unlock v1.1.0 capabilities
- [CLI Reference](../user-guide/cli-reference.md) - Complete command documentation
- [Best Practices](../user-guide/best-practices.md) - Optimize your workflow