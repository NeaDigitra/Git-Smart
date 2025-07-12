---
sidebar_position: 2
title: Basic Usage
description: Master the fundamental Git-Smart workflow and understand the core concepts
---

# Basic Usage

Master the fundamental Git-Smart workflow and understand the core concepts.

## The Basic Workflow

Git-Smart follows a simple, three-step process:

```bash
# 1. Make your code changes
vim src/auth.js

# 2. Stage your changes
git add src/auth.js

# 3. Generate and commit with Git-Smart
git-smart
```

That's it! Git-Smart analyzes your changes and creates a professional commit message.

## Understanding Git-Smart Output

When you run `git-smart`, you'll see output like this:

```bash
$ git-smart

🔍 Analyzing changes...
   • Files: 1 modified (src/auth.js)
   • Type: Authentication enhancement detected
   • Scope: auth (detected from file path and content)
   • Confidence: 89%

💡 Suggested commit message:
   feat(auth): implement JWT token validation

✅ Commit created: feat(auth): implement JWT token validation
```

### What Git-Smart Analyzes

1. **File Changes** - What files were modified, added, or deleted
2. **Code Content** - The actual changes in your code
3. **Project Structure** - How files relate to your project architecture
4. **Historical Patterns** - Your previous commit message style

## Core Commands

### Default Mode
```bash
git-smart
```
Analyzes changes and creates a commit with the best suggestion.

### Dry Run Mode
```bash
git-smart --dry-run
git-smart -d
```
Shows the suggested message without creating a commit.

```bash
$ git-smart --dry-run

🔍 Analysis complete
💡 Suggested: feat(auth): implement JWT token validation

Note: This is a dry run. No commit was created.
```

### Interactive Mode
```bash
git-smart --interactive
git-smart -i
```
Shows multiple suggestions and lets you choose:

```bash
$ git-smart --interactive

💡 Suggested commit messages:
  1. feat(auth): implement JWT token validation 🎯 (89%)
  2. feat(auth): add authentication middleware 👍 (82%)
  3. feat(security): enhance login security 👍 (75%)
  4. ✏️  Write custom message

Choose option (1-4): 1
```

### Verbose Mode
```bash
git-smart --verbose
git-smart -v
```
Shows detailed analysis information:

```bash
$ git-smart --verbose

🔍 Detailed Analysis:
├── Files: src/auth.js (modified)
├── Keywords: jwt, token, validation, middleware
├── Patterns: function definitions, security enhancement
├── Historical match: 94% similar to previous auth commits
└── Confidence factors: file path (95%), content (87%), history (91%)

💡 Suggested: feat(auth): implement JWT token validation
```

## File Staging Best Practices

### Stage Related Changes Together
```bash
# Good: Related changes in one commit
git add src/auth.js tests/auth.test.js
git-smart
# Result: feat(auth): implement JWT validation with tests

# Less ideal: Unrelated changes
git add src/auth.js src/ui/button.css
git-smart
# Result: Mixed suggestions, lower confidence
```

### Make Focused Commits
```bash
# Good: Single feature focus
git add src/user-service.js
git-smart
# Result: feat(user): add user profile service

# Then separately:
git add src/api/auth.js
git-smart
# Result: feat(api): implement authentication endpoints
```

## Understanding Confidence Scores

Git-Smart provides confidence scores to help you understand how certain it is about its suggestions:

| Score | Meaning | What to do |
|-------|---------|------------|
| 85%+ | High confidence | Accept suggestion |
| 70-84% | Good confidence | Review and likely accept |
| 50-69% | Moderate confidence | Consider using interactive mode |
| <50% | Low confidence | Use interactive mode or write custom |

## Common Scenarios

### New Feature Development
```bash
# Adding a new component
git add src/components/UserProfile.jsx
git-smart
# Result: feat(component): add user profile component

# Adding API endpoints
git add src/api/users.js
git-smart
# Result: feat(api): implement user management endpoints
```

### Bug Fixes
```bash
# Fixing a validation issue
git add src/validation/email.js
git-smart
# Result: fix(validation): resolve email format validation

# Fixing UI problems
git add src/components/Button.jsx
git-smart
# Result: fix(ui): resolve button hover state issue
```

### Documentation Updates
```bash
# Updating README
git add README.md
git-smart
# Result: docs: update installation instructions

# Adding code comments
git add src/utils/helpers.js
git-smart
# Result: docs(code): add helper function documentation
```

### Configuration Changes
```bash
# Package updates
git add package.json
git-smart
# Result: deps: update React to latest version

# Build configuration
git add webpack.config.js
git-smart
# Result: build: optimize production build settings
```

## Customizing Behavior

### Environment Variables
```bash
# Disable interactive prompts in CI
export GIT_SMART_CI=true
git-smart

# Set default confidence threshold
export GIT_SMART_MIN_CONFIDENCE=80
git-smart
```

### Git Configuration
```bash
# Set as default commit command
git config --global alias.commit '!git-smart'

# Now you can use:
git commit  # This will run git-smart instead
```

## Troubleshooting Common Issues

### "No staged changes" Error
```bash
$ git-smart
❌ Error: No staged changes found

# Solution: Stage your changes first
git add .
git-smart
```

### "Not a git repository" Error
```bash
$ git-smart
❌ Error: Not a git repository

# Solution: Initialize git or navigate to a git repository
git init
# or
cd /path/to/your/git/repo
```

### Low Confidence Suggestions
```bash
$ git-smart
💡 Suggested: chore: update files 🤔 (45%)

# Solution: Use interactive mode for better options
git-smart --interactive
```

### Mixed or Complex Changes
```bash
# Problem: Too many unrelated changes
git add .  # Added 20 files with different purposes

# Solution: Stage related changes separately
git reset
git add src/auth.js tests/auth.test.js
git-smart  # Clear auth-focused commit

git add src/ui/button.css src/ui/button.jsx
git-smart  # Clear UI-focused commit
```

## Integration with Your Workflow

### Pre-commit Hooks
```bash
# Add Git-Smart to pre-commit hooks
echo '#!/bin/bash\ngit-smart --validate' > .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

### IDE Integration
Many IDEs support custom git commands. You can configure Git-Smart as your default commit command.

### Team Usage
```bash
# Share team configuration
echo '{"style": "technical", "scopes": ["auth", "ui", "api"]}' > .git-smart.json
git add .git-smart.json
git commit -m "chore: add Git-Smart team configuration"
```

## Next Steps

- [Your First Commit](first-commit) - Hands-on tutorial with examples
- [Core Features](../core-features/intelligent-analysis) - Deep dive into Git-Smart's analysis
- [Interactive Mode](../core-features/interactive-mode) - Master the interactive workflow
- [CLI Reference](../user-guide/cli-reference) - Complete command documentation