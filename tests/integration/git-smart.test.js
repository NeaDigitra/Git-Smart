require('../test-framework')
const { GitSmart } = require('../../src/GitSmart')

describe('GitSmart Integration Tests', () => {
  let gitSmart
  let execSyncMock

  beforeEach(() => {
    // Reset any existing mocks
    if (execSyncMock) {
      execSyncMock.restore()
    }
  })

  afterEach(() => {
    if (execSyncMock) {
      execSyncMock.restore()
    }
  })

  describe('constructor', () => {
    test('should initialize with default options', () => {
      gitSmart = new GitSmart()
      
      expect(gitSmart.options.interactive).toBe(false)
      expect(gitSmart.options.verbose).toBe(false)
      expect(gitSmart.options.dryRun).toBe(false)
    })

    test('should initialize with custom options', () => {
      gitSmart = new GitSmart({
        interactive: true,
        verbose: true,
        dryRun: true
      })
      
      expect(gitSmart.options.interactive).toBe(true)
      expect(gitSmart.options.verbose).toBe(true)
      expect(gitSmart.options.dryRun).toBe(true)
      expect(gitSmart.interactive).toBeTruthy()
    })

    test('should initialize all analyzers and generators', () => {
      gitSmart = new GitSmart()
      
      expect(gitSmart.diffAnalyzer).toBeTruthy()
      expect(gitSmart.historyAnalyzer).toBeTruthy()
      expect(gitSmart.messageGenerator).toBeTruthy()
    })
  })

  describe('validateEnvironment', () => {
    test('should pass validation in git repository with staged changes', async () => {
      gitSmart = new GitSmart()
      
      // Mock git repository check
      let callCount = 0
      execSyncMock = MockHelper.mockExecSync('')
      execSyncMock.restore()
      
      execSyncMock = (cmd) => {
        if (cmd.includes('rev-parse')) return '' // git repo check
        if (cmd.includes('diff --cached --name-only')) return 'src/file.js' // staged changes
        return ''
      }
      require('child_process').execSync = execSyncMock
      
      await expect(gitSmart.validateEnvironment()).resolves.not.toThrow()
    })

    test('should throw error when not in git repository', async () => {
      gitSmart = new GitSmart()
      
      execSyncMock = (cmd) => {
        if (cmd.includes('rev-parse')) throw new Error('Not a git repository')
        return ''
      }
      require('child_process').execSync = execSyncMock
      
      await expect(gitSmart.validateEnvironment()).rejects.toThrow('Not a git repository')
    })

    test('should throw error when no staged changes', async () => {
      gitSmart = new GitSmart()
      
      execSyncMock = (cmd) => {
        if (cmd.includes('rev-parse')) return '' // git repo check passes
        if (cmd.includes('diff --cached --name-only')) return '' // no staged changes
        return ''
      }
      require('child_process').execSync = execSyncMock
      
      await expect(gitSmart.validateEnvironment()).rejects.toThrow('No staged changes found')
    })
  })

  describe('analyzeChanges', () => {
    test('should analyze staged changes and return analysis', async () => {
      gitSmart = new GitSmart()
      
      execSyncMock = (cmd) => {
        if (cmd.includes('diff --cached --name-status')) {
          return 'A\tsrc/auth.js\nM\tsrc/utils.js'
        }
        if (cmd.includes('diff --cached --stat')) {
          return '2 files changed, 10 insertions(+), 2 deletions(-)'
        }
        if (cmd.includes('diff --cached')) {
          return MockHelper.createMockDiff('feat')
        }
        return ''
      }
      require('child_process').execSync = execSyncMock
      
      const result = await gitSmart.analyzeChanges()
      
      expect(result.changeType).toBeTruthy()
      expect(result.confidence).toBeGreaterThan(0)
      expect(result.fileChanges).toBeTruthy()
      expect(result.codeChanges).toBeTruthy()
      expect(result.stats).toBeTruthy()
      expect(result.stats.files).toBe(2)
      expect(result.stats.insertions).toBe(10)
      expect(result.stats.deletions).toBe(2)
    })

    test('should handle verbose mode', async () => {
      gitSmart = new GitSmart({ verbose: true })
      
      execSyncMock = (cmd) => {
        if (cmd.includes('diff --cached --name-status')) return 'A\tsrc/test.js'
        if (cmd.includes('diff --cached --stat')) return '1 file changed, 5 insertions(+)'
        if (cmd.includes('diff --cached')) return MockHelper.createMockDiff('feat')
        return ''
      }
      require('child_process').execSync = execSyncMock
      
      // Capture console output
      const consoleLogs = []
      const originalLog = console.log
      console.log = (...args) => consoleLogs.push(args.join(' '))
      
      const result = await gitSmart.analyzeChanges()
      
      console.log = originalLog
      
      expect(consoleLogs.some(log => log.includes('Analyzing staged changes'))).toBe(true)
      expect(consoleLogs.some(log => log.includes('files changed'))).toBe(true)
    })
  })

  describe('getStyleGuide', () => {
    test('should analyze commit history and generate style guide', async () => {
      gitSmart = new GitSmart()
      
      execSyncMock = (cmd) => {
        if (cmd.includes('git log --oneline')) {
          return 'abc123 feat: add authentication\ndef456 fix: resolve bug\nghi789 docs: update readme'
        }
        return ''
      }
      require('child_process').execSync = execSyncMock
      
      const result = await gitSmart.getStyleGuide()
      
      expect(result.useConventional).toBeTruthy()
      expect(result.preferredPrefix).toBeTruthy()
      expect(result.targetLength).toBeGreaterThan(0)
      expect(typeof result.adaptMessageToStyle).toBe('function')
    })

    test('should handle empty commit history', async () => {
      gitSmart = new GitSmart()
      
      execSyncMock = () => ''
      require('child_process').execSync = execSyncMock
      
      const result = await gitSmart.getStyleGuide()
      
      expect(result.useConventional).toBeTruthy()
      expect(result.preferredPrefix).toBe('add')
      expect(result.targetLength).toBe(50)
    })
  })

  describe('generateCommitMessages', () => {
    test('should generate primary message for non-interactive mode', () => {
      gitSmart = new GitSmart({ interactive: false })
      
      const analysis = createMockAnalysis()
      const styleGuide = createMockStyleGuide()
      
      const result = gitSmart.generateCommitMessages(analysis, styleGuide)
      
      expect(result).toHaveLength(1)
      expect(result[0].type).toBe('primary')
    })

    test('should generate alternatives for interactive mode', () => {
      gitSmart = new GitSmart({ interactive: true })
      
      const analysis = createMockAnalysis()
      const styleGuide = createMockStyleGuide()
      
      const result = gitSmart.generateCommitMessages(analysis, styleGuide)
      
      expect(result.length).toBeGreaterThan(1)
      expect(result[0].type).toBe('primary')
    })
  })

  describe('executeCommit', () => {
    test('should commit with provided message', async () => {
      gitSmart = new GitSmart()
      
      let commitMessage = ''
      execSyncMock = (cmd) => {
        if (cmd.includes('git commit')) {
          commitMessage = cmd
          return ''
        }
        return ''
      }
      require('child_process').execSync = execSyncMock
      
      await gitSmart.executeCommit('feat(auth): add user authentication')
      
      expect(commitMessage).toContain('feat(auth): add user authentication')
    })

    test('should handle dry run mode', async () => {
      gitSmart = new GitSmart({ dryRun: true })
      
      let commitCalled = false
      execSyncMock = (cmd) => {
        if (cmd.includes('git commit')) {
          commitCalled = true
        }
        return ''
      }
      require('child_process').execSync = execSyncMock
      
      const consoleLogs = []
      const originalLog = console.log
      console.log = (...args) => consoleLogs.push(args.join(' '))
      
      await gitSmart.executeCommit('test message')
      
      console.log = originalLog
      
      expect(commitCalled).toBe(false)
      expect(consoleLogs.some(log => log.includes('Dry run'))).toBe(true)
    })

    test('should handle null message', async () => {
      gitSmart = new GitSmart()
      
      const consoleLogs = []
      const originalLog = console.log
      console.log = (...args) => consoleLogs.push(args.join(' '))
      
      await gitSmart.executeCommit(null)
      
      console.log = originalLog
      
      expect(consoleLogs.some(log => log.includes('No commit made'))).toBe(true)
    })

    test('should throw error on commit failure', async () => {
      gitSmart = new GitSmart()
      
      execSyncMock = (cmd) => {
        if (cmd.includes('git commit')) {
          throw new Error('Commit failed')
        }
        return ''
      }
      require('child_process').execSync = execSyncMock
      
      await expect(gitSmart.executeCommit('test message')).rejects.toThrow('Failed to commit')
    })
  })

  describe('end-to-end workflow', () => {
    test('should complete full workflow for feature addition', async () => {
      gitSmart = new GitSmart({ dryRun: true })
      
      // Mock all git commands
      execSyncMock = (cmd, options) => {
        if (cmd.includes('rev-parse')) return '' // git repo check
        if (cmd.includes('diff --cached --name-only')) return 'src/auth.js' // staged changes
        if (cmd.includes('diff --cached --name-status')) return 'A\tsrc/auth.js'
        if (cmd.includes('diff --cached --stat')) return '1 file changed, 20 insertions(+)'
        if (cmd.includes('diff --cached')) return MockHelper.createMockDiff('feat')
        if (cmd.includes('git log --oneline')) return 'abc123 feat: previous feature'
        return ''
      }
      require('child_process').execSync = execSyncMock
      
      // Mock user input for simple mode
      const originalCreateInterface = require('readline').createInterface
      require('readline').createInterface = () => ({
        question: (prompt, callback) => {
          if (prompt.includes('Use this message')) {
            callback('y')
          } else {
            callback('')
          }
        },
        close: () => {}
      })
      
      const consoleLogs = []
      const originalLog = console.log
      console.log = (...args) => consoleLogs.push(args.join(' '))
      
      await gitSmart.run()
      
      console.log = originalLog
      require('readline').createInterface = originalCreateInterface
      
      expect(consoleLogs.some(log => log.includes('Analyzing changes'))).toBe(true)
      expect(consoleLogs.some(log => log.includes('Suggested commit'))).toBe(true)
      expect(consoleLogs.some(log => log.includes('Dry run'))).toBe(true)
    })

    test('should handle validation errors gracefully', async () => {
      gitSmart = new GitSmart()
      
      execSyncMock = (cmd) => {
        if (cmd.includes('rev-parse')) throw new Error('Not a git repository')
        return ''
      }
      require('child_process').execSync = execSyncMock
      
      const consoleErrors = []
      const originalError = console.error
      console.error = (...args) => consoleErrors.push(args.join(' '))
      
      await expect(gitSmart.run()).rejects.toThrow()
      
      console.error = originalError
      
      expect(consoleErrors.some(error => error.includes('Not a git repository'))).toBe(true)
    })

    test('should analyze test file changes correctly', async () => {
      gitSmart = new GitSmart({ dryRun: true })
      
      execSyncMock = (cmd) => {
        if (cmd.includes('rev-parse')) return ''
        if (cmd.includes('diff --cached --name-only')) return 'tests/auth.test.js'
        if (cmd.includes('diff --cached --name-status')) return 'A\ttests/auth.test.js'
        if (cmd.includes('diff --cached --stat')) return '1 file changed, 15 insertions(+)'
        if (cmd.includes('diff --cached')) return MockHelper.createMockDiff('test')
        if (cmd.includes('git log --oneline')) return ''
        return ''
      }
      require('child_process').execSync = execSyncMock
      
      // Mock simple user input
      require('readline').createInterface = () => ({
        question: (prompt, callback) => callback('y'),
        close: () => {}
      })
      
      const consoleLogs = []
      const originalLog = console.log
      console.log = (...args) => consoleLogs.push(args.join(' '))
      
      await gitSmart.run()
      
      console.log = originalLog
      
      expect(consoleLogs.some(log => log.includes('test('))).toBe(true)
    })

    test('should handle multiple file types correctly', async () => {
      gitSmart = new GitSmart({ dryRun: true })
      
      execSyncMock = (cmd) => {
        if (cmd.includes('rev-parse')) return ''
        if (cmd.includes('diff --cached --name-only')) return 'src/auth.js\nREADME.md\npackage.json'
        if (cmd.includes('diff --cached --name-status')) {
          return 'A\tsrc/auth.js\nM\tREADME.md\nM\tpackage.json'
        }
        if (cmd.includes('diff --cached --stat')) return '3 files changed, 25 insertions(+), 2 deletions(-)'
        if (cmd.includes('diff --cached')) return MockHelper.createMockDiff('feat')
        if (cmd.includes('git log --oneline')) return ''
        return ''
      }
      require('child_process').execSync = execSyncMock
      
      require('readline').createInterface = () => ({
        question: (prompt, callback) => callback('y'),
        close: () => {}
      })
      
      await expect(gitSmart.run()).resolves.not.toThrow()
    })
  })

  // Helper functions
  function createMockAnalysis() {
    return {
      changeType: 'feat',
      confidence: 80,
      fileChanges: {
        added: ['src/auth.js'],
        modified: [],
        categories: new Set(['code']),
        fileTypes: new Set(['JavaScript'])
      },
      codeChanges: {
        newFunctions: ['authenticateUser'],
        newClasses: [],
        keywords: []
      },
      stats: {
        files: 1,
        insertions: 10,
        deletions: 0
      }
    }
  }

  function createMockStyleGuide() {
    return {
      useConventional: true,
      preferredPrefix: 'feat',
      targetLength: 50,
      includeScope: true,
      useCapitalization: false,
      usePeriod: false,
      tone: 'casual',
      adaptMessageToStyle: (message) => message
    }
  }
})