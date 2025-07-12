---
sidebar_position: 1
title: Installation
description: Install Git-Smart globally via npm or use directly with npx for one-time usage
---

# Installation

Git-Smart can be installed globally via npm or used directly with npx for one-time usage.

## Requirements

- **Node.js 16.0.0 or higher**
- **Git repository** with staged changes
- **No external dependencies** - completely self-contained

## Global Installation (Recommended)

Install Git-Smart globally to use the `git-smart` command anywhere:

```bash
npm install -g @neabyte/git-smart
```

After installation, verify it's working:

```bash
git-smart --help
```

You should see the Git-Smart help menu with all available options.

## Direct Usage (No Installation)

Use Git-Smart directly without installing using npx:

```bash
npx @neabyte/git-smart
```

This is perfect for:
- **Trying Git-Smart** before installing
- **CI/CD environments** where you don't want global packages
- **One-time usage** in specific projects

## Platform Support

Git-Smart works on all major platforms:

- ✅ **macOS** (Intel and Apple Silicon)
- ✅ **Linux** (Ubuntu, CentOS, Alpine, etc.)
- ✅ **Windows** (Windows 10+, WSL)

## Verification

After installation, test Git-Smart in any git repository:

```bash
# Navigate to a git repository
cd your-project

# Stage some changes
git add .

# Run Git-Smart
git-smart --dry-run
```

If you see a suggested commit message, installation was successful!

## Updating

To update to the latest version:

```bash
# If installed globally
npm update -g @neabyte/git-smart

# Check current version
git-smart --help
```

## Uninstallation

To remove Git-Smart:

```bash
npm uninstall -g @neabyte/git-smart
```

## Next Steps

- [Basic Usage](basic-usage) - Learn the fundamental commands
- [Your First Commit](first-commit) - Generate your first smart commit message
- [CLI Reference](../user-guide/cli-reference) - Complete command reference