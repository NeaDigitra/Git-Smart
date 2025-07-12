require('../test-framework')
const { HistoryAnalyzer } = require('../../src/analyzers/HistoryAnalyzer')

describe('HistoryAnalyzer', () => {
  let analyzer

  beforeEach(() => {
    analyzer = new HistoryAnalyzer()
  })

  describe('constructor', () => {
    test('should initialize with commit patterns', () => {
      expect(analyzer.commitPatterns.conventional).toBeInstanceOf(RegExp)
      expect(analyzer.commitPatterns.types).toContain('feat')
      expect(analyzer.commitPatterns.types).toContain('fix')
      expect(analyzer.commitPatterns.prefixes).toBeInstanceOf(RegExp)
    })
  })

  describe('analyzeCommitHistory', () => {
    test('should return default style for empty commits', () => {
      const result = analyzer.analyzeCommitHistory([])
      
      expect(result.style).toBe('conventional')
      expect(result.commonPrefixes).toHaveLength(1)
      expect(result.averageLength).toBe(50)
    })

    test('should analyze conventional commits', () => {
      const commits = [
        { message: 'feat: add user authentication' },
        { message: 'fix: resolve login bug' },
        { message: 'docs: update README' },
        { message: 'test: add auth tests' }
      ]
      
      const result = analyzer.analyzeCommitHistory(commits)
      
      expect(result.style).toBe('conventional')
      expect(result.tone).toBe('casual')
    })

    test('should analyze imperative style commits', () => {
      const commits = [
        { message: 'Add user authentication' },
        { message: 'Update login form' },
        { message: 'Fix password validation' },
        { message: 'Remove old code' }
      ]
      
      const result = analyzer.analyzeCommitHistory(commits)
      
      expect(result.style).toBe('imperative')
    })

    test('should analyze descriptive commits', () => {
      const commits = [
        { message: 'User authentication system' },
        { message: 'Login form improvements' },
        { message: 'Password validation fixes' }
      ]
      
      const result = analyzer.analyzeCommitHistory(commits)
      
      expect(result.style).toBe('descriptive')
    })
  })

  describe('detectCommitStyle', () => {
    test('should detect conventional commits style', () => {
      const commits = [
        { message: 'feat: new feature' },
        { message: 'fix: bug fix' },
        { message: 'docs: documentation' },
        { message: 'feat(scope): scoped feature' }
      ]
      
      const result = analyzer.detectCommitStyle(commits)
      
      expect(result).toBe('conventional')
    })

    test('should detect imperative style', () => {
      const commits = [
        { message: 'Add new feature' },
        { message: 'Fix bug in auth' },
        { message: 'Update documentation' }
      ]
      
      const result = analyzer.detectCommitStyle(commits)
      
      expect(result).toBe('imperative')
    })

    test('should detect descriptive style', () => {
      const commits = [
        { message: 'New user interface' },
        { message: 'Database optimizations' },
        { message: 'Code cleanup' }
      ]
      
      const result = analyzer.detectCommitStyle(commits)
      
      expect(result).toBe('descriptive')
    })

    test('should handle mixed styles', () => {
      const commits = [
        { message: 'feat: new feature' },
        { message: 'Add something' },
        { message: 'Random description' },
        { message: 'fix: bug fix' }
      ]
      
      const result = analyzer.detectCommitStyle(commits)
      
      expect(['conventional', 'imperative', 'descriptive']).toContain(result)
    })
  })

  describe('extractCommonPrefixes', () => {
    test('should extract and rank common prefixes', () => {
      const commits = [
        { message: 'feat: feature 1' },
        { message: 'feat: feature 2' },
        { message: 'fix: bug 1' },
        { message: 'docs: documentation' },
        { message: 'feat: feature 3' }
      ]
      
      const result = analyzer.extractCommonPrefixes(commits)
      
      expect(result[0].word).toBe('feat:')
      expect(result[0].count).toBe(3)
      expect(result[0].frequency).toBe(0.6)
      expect(result[1].word).toBe('fix:')
      expect(result[1].count).toBe(1)
    })

    test('should handle commits without clear prefixes', () => {
      const commits = [
        { message: 'A' },
        { message: 'B' },
        { message: 'Various changes made' }
      ]
      
      const result = analyzer.extractCommonPrefixes(commits)
      
      expect(result).toHaveLength(2) // Only words longer than 2 chars
      expect(result[0].word).toBe('various')
    })

    test('should limit results to top 10', () => {
      const commits = Array.from({ length: 15 }, (_, i) => ({
        message: `prefix${i}: message ${i}`
      }))
      
      const result = analyzer.extractCommonPrefixes(commits)
      
      expect(result.length).toBeLessThan(11)
    })
  })

  describe('calculateAverageLength', () => {
    test('should calculate correct average length', () => {
      const commits = [
        { message: 'short' },          // 5 chars
        { message: 'medium message' }, // 14 chars  
        { message: 'this is a very long commit message' } // 35 chars
      ]
      
      const result = analyzer.calculateAverageLength(commits)
      
      expect(result).toBe(18) // (5 + 14 + 35) / 3 = 18
    })

    test('should handle empty commits array', () => {
      const result = analyzer.calculateAverageLength([])
      
      expect(isNaN(result)).toBe(true)
    })
  })

  describe('identifyPatterns', () => {
    test('should identify scoped commits', () => {
      const commits = [
        { message: 'feat(auth): add login' },
        { message: 'fix(ui): button style' },
        { message: 'docs: update readme' }
      ]
      
      const result = analyzer.identifyPatterns(commits)
      
      expect(result.hasScope).toBe(2/3) // 2 out of 3 have scope
    })

    test('should identify emoji usage', () => {
      const commits = [
        { message: '🚀 feat: new feature' },
        { message: '🐛 fix: bug fix' },
        { message: 'docs: update readme' }
      ]
      
      const result = analyzer.identifyPatterns(commits)
      
      expect(result.hasEmoji).toBe(2/3)
    })

    test('should identify ticket numbers', () => {
      const commits = [
        { message: 'feat: add feature #123' },
        { message: 'fix: resolve JIRA-456' },
        { message: 'docs: update readme' }
      ]
      
      const result = analyzer.identifyPatterns(commits)
      
      expect(result.hasTicketNumber).toBe(2/3)
    })

    test('should identify capitalization patterns', () => {
      const commits = [
        { message: 'Add new feature' },
        { message: 'Fix bug in auth' },
        { message: 'update documentation' }
      ]
      
      const result = analyzer.identifyPatterns(commits)
      
      expect(result.startsWithCapital).toBe(2/3)
    })

    test('should identify period usage', () => {
      const commits = [
        { message: 'Add new feature.' },
        { message: 'Fix bug in auth.' },
        { message: 'Update documentation' }
      ]
      
      const result = analyzer.identifyPatterns(commits)
      
      expect(result.endsWithPeriod).toBe(2/3)
    })
  })

  describe('detectTone', () => {
    test('should detect formal tone', () => {
      const commits = [
        { message: 'Implement user authentication system' },
        { message: 'Optimize database query performance' },
        { message: 'Refactor component architecture' },
        { message: 'Enhance security protocols' }
      ]
      
      const result = analyzer.detectTone(commits)
      
      expect(result).toBe('formal')
    })

    test('should detect casual tone', () => {
      const commits = [
        { message: 'Add login button' },
        { message: 'Fix broken link' },
        { message: 'Update user page' },
        { message: 'Change button color' }
      ]
      
      const result = analyzer.detectTone(commits)
      
      expect(result).toBe('casual')
    })

    test('should handle mixed tone', () => {
      const commits = [
        { message: 'Implement authentication' },
        { message: 'Add login button' }
      ]
      
      const result = analyzer.detectTone(commits)
      
      expect(['formal', 'casual']).toContain(result)
    })
  })

  describe('generateStyleGuide', () => {
    test('should generate comprehensive style guide', () => {
      const history = {
        style: 'conventional',
        commonPrefixes: [{ word: 'feat', count: 3, frequency: 0.6 }],
        averageLength: 45,
        patterns: {
          hasScope: 0.4,
          hasEmoji: 0.1,
          hasTicketNumber: 0.2,
          startsWithCapital: 0.8,
          endsWithPeriod: 0.3
        },
        tone: 'formal'
      }
      
      const result = analyzer.generateStyleGuide(history)
      
      expect(result.useConventional).toBe(true)
      expect(result.preferredPrefix).toBe('feat')
      expect(result.targetLength).toBe(45)
      expect(result.includeScope).toBe(true) // > 0.3
      expect(result.useCapitalization).toBe(true) // > 0.7
      expect(result.usePeriod).toBe(false) // <= 0.5
      expect(result.tone).toBe('formal')
    })

    test('should handle edge cases in style guide', () => {
      const history = {
        style: 'descriptive',
        commonPrefixes: [],
        averageLength: 20, // Too short
        patterns: {
          hasScope: 0.1,
          startsWithCapital: 0.5,
          endsWithPeriod: 0.6
        },
        tone: 'casual'
      }
      
      const result = analyzer.generateStyleGuide(history)
      
      expect(result.useConventional).toBe(false)
      expect(result.preferredPrefix).toBe('add') // default
      expect(result.targetLength).toBe(30) // minimum
      expect(result.includeScope).toBe(false)
      expect(result.useCapitalization).toBe(false)
      expect(result.usePeriod).toBe(true)
    })

    test('should cap target length at maximum', () => {
      const history = {
        style: 'conventional',
        commonPrefixes: [{ word: 'feat' }],
        averageLength: 100, // Too long
        patterns: {},
        tone: 'casual'
      }
      
      const result = analyzer.generateStyleGuide(history)
      
      expect(result.targetLength).toBe(72) // maximum
    })
  })

  describe('getDefaultStyle', () => {
    test('should return sensible defaults', () => {
      const result = analyzer.getDefaultStyle()
      
      expect(result.style).toBe('conventional')
      expect(result.commonPrefixes).toHaveLength(1)
      expect(result.commonPrefixes[0].word).toBe('feat')
      expect(result.averageLength).toBe(50)
      expect(result.patterns.startsWithCapital).toBe(0.8)
      expect(result.patterns.endsWithPeriod).toBe(0)
      expect(result.tone).toBe('casual')
    })
  })

  describe('adaptMessageToStyle', () => {
    test('should apply capitalization', () => {
      const styleGuide = { useCapitalization: true, usePeriod: false, targetLength: 72 }
      
      const result = analyzer.adaptMessageToStyle('add new feature', styleGuide)
      
      expect(result).toBe('Add new feature')
    })

    test('should remove capitalization', () => {
      const styleGuide = { useCapitalization: false, usePeriod: false, targetLength: 72 }
      
      const result = analyzer.adaptMessageToStyle('Add new feature', styleGuide)
      
      expect(result).toBe('add new feature')
    })

    test('should add period', () => {
      const styleGuide = { useCapitalization: false, usePeriod: true, targetLength: 72 }
      
      const result = analyzer.adaptMessageToStyle('add new feature', styleGuide)
      
      expect(result).toBe('add new feature.')
    })

    test('should remove period', () => {
      const styleGuide = { useCapitalization: false, usePeriod: false, targetLength: 72 }
      
      const result = analyzer.adaptMessageToStyle('add new feature.', styleGuide)
      
      expect(result).toBe('add new feature')
    })

    test('should make formal tone', () => {
      const styleGuide = { 
        useCapitalization: false, 
        usePeriod: false, 
        tone: 'formal',
        targetLength: 72 
      }
      
      const result = analyzer.adaptMessageToStyle('fix login bug', styleGuide)
      
      expect(result).toContain('resolve') // fix -> resolve
    })

    test('should truncate long messages', () => {
      const styleGuide = { 
        useCapitalization: false, 
        usePeriod: false, 
        targetLength: 20 
      }
      
      const longMessage = 'this is a very long commit message that exceeds the target length'
      const result = analyzer.adaptMessageToStyle(longMessage, styleGuide)
      
      expect(result.length).toBeLessThan(21)
      expect(result).toContain('...')
    })
  })

  describe('makeFormal', () => {
    test('should replace casual words with formal equivalents', () => {
      const testCases = [
        { input: 'fix login bug', expected: 'resolve login bug' },
        { input: 'add new feature', expected: 'implement new feature' },
        { input: 'update user interface', expected: 'enhance user interface' },
        { input: 'change button color', expected: 'modify button color' },
        { input: 'make improvements', expected: 'create improvements' },
        { input: 'get user data', expected: 'retrieve user data' }
      ]
      
      testCases.forEach(({ input, expected }) => {
        const result = analyzer.makeFormal(input)
        expect(result).toBe(expected)
      })
    })

    test('should handle case insensitive replacement', () => {
      const result = analyzer.makeFormal('Fix the bug')
      
      expect(result).toBe('resolve the bug')
    })

    test('should not replace partial word matches', () => {
      const result = analyzer.makeFormal('prefix and suffix')
      
      expect(result).toBe('prefix and suffix') // 'fix' in 'prefix' should not be replaced
    })

    test('should handle multiple replacements in one message', () => {
      const result = analyzer.makeFormal('fix bug and add feature')
      
      expect(result).toBe('resolve bug and implement feature')
    })
  })
})