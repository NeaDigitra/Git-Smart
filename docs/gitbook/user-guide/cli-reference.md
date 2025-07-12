# CLI Reference

Complete reference for all Git-Smart command-line options and usage patterns.

## Basic Syntax

```bash
git-smart [options]
npx @neabyte/git-smart [options]
```

## Core Options

### `-i, --interactive`
**Interactive mode with multiple suggestions**

```bash
git-smart --interactive
```

**Features:**
- Multiple commit message suggestions with confidence scores
- Choose from generated options or write custom message
- Detailed analysis display
- Best for exploring different message options

**Example Output:**
```
💡 Suggested commit messages:
  1. feat(auth): implement user authentication system 🎯 (85%)
  2. feat(auth): add user authentication system 👍 (75%)
  3. feat(auth): create user authentication system 👍 (65%)
  4. Edit custom message

Choose (1-4): 
```

### `-v, --verbose`
**Show detailed analysis information**

```bash
git-smart --verbose
```

**Provides:**
- File change analysis
- Code pattern detection
- Confidence score breakdown
- Style guide application details

### `-d, --dry-run`
**Show suggested message without committing**

```bash
git-smart --dry-run
```

**Use Cases:**
- Testing Git-Smart suggestions
- Reviewing message quality
- Learning from generated suggestions
- Debugging analysis issues

### `-h, --help`
**Show help message and usage examples**

```bash
git-smart --help
```

## Advanced Options (v1.1.0)

### `-e, --enhanced`
**Use enhanced pattern recognition**

```bash
git-smart --enhanced
```

**Benefits:**
- Advanced vocabulary analysis
- Improved scope suggestions
- Better style consistency
- Higher accuracy suggestions

**Recommended for:**
- Projects with established commit patterns
- Teams seeking consistency
- Users wanting maximum accuracy

### `-a, --analyze`
**Show detailed commit history analysis**

```bash
git-smart --analyze
```

**Analysis Includes:**
- Vocabulary pattern breakdown
- Commit type frequency
- Quality metrics and scores
- Consistency measurements

**Perfect for:**
- Understanding your commit patterns
- Identifying improvement areas
- Tracking progress over time
- Team pattern analysis

### `-p, --profile`
**Display your commit style profile**

```bash
git-smart --profile
```

**Profile Contains:**
- Personal style classification
- Preferred scopes and types
- Confidence score
- Personalized recommendations

**Use Cases:**
- Personal development insights
- Team style comparison
- Onboarding new team members
- Establishing team standards

## Option Combinations

### Enhanced Interactive Mode
```bash
git-smart --enhanced --interactive
```
Best of both worlds: enhanced accuracy with interactive selection.

### Analysis with Profiling
```bash
git-smart --analyze --profile
```
Complete insight into your commit patterns and personal style.

### Enhanced Dry Run
```bash
git-smart --enhanced --dry-run
```
See enhanced suggestions without committing.

### Verbose Interactive
```bash
git-smart --verbose --interactive
```
Detailed analysis with interactive message selection.

## Exit Codes

| Code | Meaning |
|------|---------|
| 0 | Success - commit message generated/committed |
| 1 | Error - invalid git repository, no staged changes, or other error |

## Environment Requirements

### Git Repository
```bash
# Must be in a git repository
git init  # If not already initialized
```

### Staged Changes
```bash
# Must have staged changes
git add .  # Stage files before running git-smart
```

### Node.js Version
- Requires Node.js 16.0.0 or higher
- Check version: `node --version`

## Common Usage Patterns

### Daily Development Workflow
```bash
# Make changes
vim src/auth.js

# Stage changes
git add src/auth.js

# Generate and commit
git-smart
```

### Code Review Preparation
```bash
# Stage changes
git add .

# Review suggested message
git-smart --dry-run

# Use interactive mode if needed
git-smart --interactive
```

### Team Standardization
```bash
# Analyze current patterns
git-smart --analyze

# Check personal style
git-smart --profile

# Use enhanced mode for consistency
git-smart --enhanced
```

### Learning and Improvement
```bash
# Understand your patterns
git-smart --analyze --profile

# See detailed suggestions
git-smart --enhanced --verbose --dry-run

# Practice with interactive mode
git-smart --enhanced --interactive
```

## Troubleshooting Commands

### Verify Installation
```bash
git-smart --help
```

### Test in Repository
```bash
git status  # Check repository status
git-smart --dry-run  # Test without committing
```

### Debug Analysis
```bash
git-smart --verbose --dry-run  # See detailed analysis
```

## Advanced Workflows

### CI/CD Integration
```bash
# In automated environments
npx @neabyte/git-smart --dry-run > suggested-message.txt
```

### Batch Analysis
```bash
# Save analysis reports
git-smart --analyze > analysis-$(date +%Y-%m-%d).txt
git-smart --profile > profile-$(date +%Y-%m-%d).txt
```

### Team Onboarding
```bash
# New team member workflow
git-smart --help           # Learn options
git-smart --analyze        # Understand project patterns
git-smart --profile        # Establish personal baseline
git-smart --enhanced       # Use for daily work
```

## Performance Notes

- **Analysis Speed** - Typically completes in <500ms
- **Memory Usage** - Minimal impact on system resources
- **Network** - 100% offline operation, no external calls
- **Storage** - No persistent data storage required

## Next Steps

- [Configuration Options](configuration.md) - Customize Git-Smart behavior
- [Best Practices](best-practices.md) - Optimize your workflow
- [Troubleshooting](troubleshooting.md) - Solve common issues