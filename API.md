# Git-Smart API Documentation

## Classes

### GitSmart

Main class for generating commit messages.

```javascript
const { GitSmart } = require('@neabyte/git-smart')

const gitSmart = new GitSmart({
  interactive: false,
  verbose: false,
  dryRun: false
})

await gitSmart.run()
```

#### Options

- `interactive` (boolean): Enable interactive mode with multiple suggestions
- `verbose` (boolean): Show detailed analysis information
- `dryRun` (boolean): Show suggestions without committing

### MessageGenerator

Generates commit messages based on analysis.

```javascript
const { MessageGenerator } = require('@neabyte/git-smart/src/generators/MessageGenerator')

const generator = new MessageGenerator()
const messages = generator.generateMessages(analysis, styleGuide, options)
```

#### Available Commit Types (18)

**Core**: feat, fix, refactor, docs, test, style, chore, perf
**Extended**: build, ci, security, deps, revert, hotfix, wip, merge, init, release

#### Available Actions/Scopes (70+)

Categories include: api, ui, auth, database, config, security, build, ci, deploy, payment, etc.

### DiffAnalyzer

Analyzes git diff and staged files.

```javascript
const { DiffAnalyzer } = require('@neabyte/git-smart/src/analyzers/DiffAnalyzer')

const analyzer = new DiffAnalyzer()
const analysis = analyzer.analyze(diff, stagedFiles)
```

### HistoryAnalyzer

Analyzes commit history for style patterns.

```javascript
const { HistoryAnalyzer } = require('@neabyte/git-smart/src/analyzers/HistoryAnalyzer')

const historyAnalyzer = new HistoryAnalyzer()
const styleGuide = historyAnalyzer.generateStyleGuide(commits)
```

## CLI Usage

```bash
# Basic usage
npx @neabyte/git-smart

# Interactive mode
npx @neabyte/git-smart --interactive

# Dry run
npx @neabyte/git-smart --dry-run

# Verbose output
npx @neabyte/git-smart --verbose

# Help
npx @neabyte/git-smart --help
```

Or if installed globally:
```bash
# Basic usage
git-smart

# Interactive mode
git-smart --interactive

# Dry run
git-smart --dry-run

# Verbose output
git-smart --verbose

# Help
git-smart --help
```

## Analysis Object Structure

```javascript
{
  changeType: 'feat',
  confidence: 85,
  fileChanges: {
    added: ['src/auth.js'],
    modified: [],
    deleted: [],
    renamed: [],
    categories: Set(['code']),
    fileTypes: Set(['JavaScript'])
  },
  codeChanges: {
    newFunctions: ['authenticate'],
    newClasses: [],
    imports: 1,
    exports: 1,
    apiCalls: 0,
    database: 0,
    tests: 0,
    keywords: ['auth']
  }
}
```

## Style Guide Object

```javascript
{
  useConventional: true,
  preferredPrefix: 'feat',
  targetLength: 50,
  includeScope: true,
  useCapitalization: false,
  usePeriod: false,
  tone: 'casual'
}
```