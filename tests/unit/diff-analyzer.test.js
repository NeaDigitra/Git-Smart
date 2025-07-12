require('../test-framework')
const { DiffAnalyzer } = require('../../src/analyzers/DiffAnalyzer')

describe('DiffAnalyzer', () => {
  let analyzer

  beforeEach(() => {
    analyzer = new DiffAnalyzer()
  })

  describe('constructor', () => {
    test('should create analyzer instance', () => {
      expect(analyzer).toBeTruthy()
      expect(typeof analyzer.analyze).toBe('function')
      expect(typeof analyzer.analyzeFileChanges).toBe('function')
    })

    test('should have analysis methods', () => {
      expect(typeof analyzer.analyzeCodeChanges).toBe('function')
      expect(typeof analyzer.determineChangeType).toBe('function')
      expect(typeof analyzer.calculateConfidence).toBe('function')
    })
  })

  describe('analyze', () => {
    test('should analyze simple feature addition', () => {
      const diff = MockHelper.createMockDiff('feat')
      const files = MockHelper.createMockFiles('feat')
      
      const result = analyzer.analyze(diff, files)
      
      expect(result.changeType).toBe('feat')
      expect(result.fileChanges.added).toHaveLength(2)
      expect(result.codeChanges.newFunctions).toContain('authenticateUser')
      expect(result.confidence).toBeGreaterThan(50)
    })

    test('should analyze bug fix', () => {
      const diff = MockHelper.createMockDiff('fix')
      const files = MockHelper.createMockFiles('fix')
      
      const result = analyzer.analyze(diff, files)
      
      expect(result.changeType).toBeTruthy()
      expect(result.fileChanges.modified).toHaveLength(1)
      expect(result.fileChanges.added).toHaveLength(0)
    })

    test('should analyze test files', () => {
      const diff = MockHelper.createMockDiff('test')
      const files = MockHelper.createMockFiles('test')
      
      const result = analyzer.analyze(diff, files)
      
      expect(result.changeType).toBe('test')
      expect(result.fileChanges.categories.has('test')).toBe(true)
    })

    test('should analyze documentation changes', () => {
      const diff = ''
      const files = MockHelper.createMockFiles('docs')
      
      const result = analyzer.analyze(diff, files)
      
      expect(result.changeType).toBe('docs')
      expect(result.fileChanges.categories.has('docs')).toBe(true)
    })
  })

  describe('analyzeFileChanges', () => {
    test('should categorize files correctly', () => {
      const files = [
        { status: 'A', path: 'src/auth.js' },
        { status: 'M', path: 'tests/auth.test.js' },
        { status: 'D', path: 'old-component.jsx' },
        { status: 'A', path: 'README.md' }
      ]
      
      const result = analyzer.analyzeFileChanges(files)
      
      expect(result.added).toContain('src/auth.js')
      expect(result.added).toContain('README.md')
      expect(result.modified).toContain('tests/auth.test.js')
      expect(result.deleted).toContain('old-component.jsx')
      expect(result.fileTypes.has('JavaScript')).toBe(true)
      expect(result.fileTypes.has('Markdown')).toBe(true)
      expect(result.categories.has('test')).toBe(true)
      expect(result.categories.has('docs')).toBe(true)
    })

    test('should handle empty file list', () => {
      const result = analyzer.analyzeFileChanges([])
      
      expect(result.added).toHaveLength(0)
      expect(result.modified).toHaveLength(0)
      expect(result.deleted).toHaveLength(0)
      expect(result.fileTypes.size).toBe(0)
      expect(result.categories.size).toBe(0)
    })
  })

  describe('analyzeCodeChanges', () => {
    test('should detect new functions', () => {
      const diff = `
+function authenticateUser(email) {
+  return validateEmail(email)
+}
+const validateEmail = (email) => {
+  return email.includes('@')
+}`
      
      const result = analyzer.analyzeCodeChanges(diff)
      
      expect(result.newFunctions).toContain('authenticateUser')
      expect(result.newFunctions).toContain('validateEmail')
    })

    test('should detect new classes', () => {
      const diff = `
+class UserManager {
+  constructor() {
+    this.users = []
+  }
+}
+interface UserInterface {
+  name: string
+}`
      
      const result = analyzer.analyzeCodeChanges(diff)
      
      expect(result.newClasses).toContain('UserManager')
      expect(result.newClasses).toContain('UserInterface')
    })

    test('should count imports and exports', () => {
      const diff = `
+import React from 'react'
+import { useState } from 'react'
+const util = require('util')
+export default Component
+module.exports = { helper }`
      
      const result = analyzer.analyzeCodeChanges(diff)
      
      expect(result.imports).toBe(3)
      expect(result.exports).toBe(2)
    })

    test('should detect test patterns', () => {
      const diff = `
+describe('UserAuth', () => {
+  test('should authenticate user', () => {
+    expect(auth.login()).toBeTruthy()
+  })
+  it('should handle errors', () => {
+    // test code
+  })
+})`
      
      const result = analyzer.analyzeCodeChanges(diff)
      
      expect(result.tests).toBeGreaterThan(0)
    })

    test('should detect API calls', () => {
      const diff = `
+const response = await fetch('/api/users')
+axios.get('/api/data')
+http.request(options)`
      
      const result = analyzer.analyzeCodeChanges(diff)
      
      expect(result.apiCalls).toBe(3)
    })

    test('should detect database operations', () => {
      const diff = `
+const query = 'SELECT * FROM users'
+db.collection('users').find()
+database.execute(sql)`
      
      const result = analyzer.analyzeCodeChanges(diff)
      
      expect(result.database).toBe(3)
    })
  })

  describe('determineChangeType', () => {
    test('should identify test changes', () => {
      const analysis = {
        fileChanges: { categories: new Set(['test']) },
        codeChanges: { tests: 1, newFunctions: [] }
      }
      
      const result = analyzer.determineChangeType(analysis)
      
      expect(result).toBe('test')
    })

    test('should identify documentation changes', () => {
      const analysis = {
        fileChanges: { categories: new Set(['docs']) },
        codeChanges: { tests: 0, newFunctions: [] }
      }
      
      const result = analyzer.determineChangeType(analysis)
      
      expect(result).toBe('docs')
    })

    test('should identify configuration changes', () => {
      const analysis = {
        fileChanges: { categories: new Set(['config']) },
        codeChanges: { tests: 0, newFunctions: [] }
      }
      
      const result = analyzer.determineChangeType(analysis)
      
      expect(result).toBe('chore')
    })

    test('should identify new features', () => {
      const analysis = {
        fileChanges: { 
          categories: new Set(['code']), 
          added: ['src/auth.js'],
          modified: [],
          renamed: []
        },
        codeChanges: { 
          tests: 0, 
          newFunctions: ['authenticateUser'],
          newClasses: [],
          keywords: []
        }
      }
      
      const result = analyzer.determineChangeType(analysis)
      
      expect(result).toBe('feat')
    })

    test('should identify bug fixes by keywords', () => {
      const analysis = {
        fileChanges: { 
          categories: new Set(['code']), 
          added: [],
          modified: ['src/api.js'],
          renamed: []
        },
        codeChanges: { 
          tests: 0, 
          newFunctions: [],
          newClasses: [],
          keywords: ['fix', 'bug', 'error']
        }
      }
      
      const result = analyzer.determineChangeType(analysis)
      
      expect(result).toBe('fix')
    })

    test('should identify refactoring', () => {
      const analysis = {
        fileChanges: { 
          categories: new Set(['code']), 
          added: [],
          modified: ['src/auth.js'],
          renamed: ['old-auth.js']
        },
        codeChanges: { 
          tests: 0, 
          newFunctions: [],
          newClasses: [],
          keywords: ['refactor', 'move']
        }
      }
      
      const result = analyzer.determineChangeType(analysis)
      
      expect(result).toBe('refactor')
    })

    test('should identify performance improvements', () => {
      const analysis = {
        fileChanges: { 
          categories: new Set(['code']), 
          added: [],
          modified: ['src/utils.js'],
          renamed: []
        },
        codeChanges: { 
          tests: 0, 
          newFunctions: [],
          newClasses: [],
          keywords: ['optimize', 'performance', 'cache']
        }
      }
      
      const result = analyzer.determineChangeType(analysis)
      
      expect(result).toBe('perf')
    })

    test('should identify style changes', () => {
      const analysis = {
        fileChanges: { 
          categories: new Set(['code']), 
          fileTypes: new Set(['CSS', 'SCSS']),
          added: [],
          modified: ['styles.css'],
          renamed: []
        },
        codeChanges: { 
          tests: 0, 
          newFunctions: [],
          newClasses: [],
          keywords: []
        }
      }
      
      const result = analyzer.determineChangeType(analysis)
      
      expect(result).toBe('style')
    })

    test('should default to feat for modifications', () => {
      const analysis = {
        fileChanges: { 
          categories: new Set(['code']), 
          fileTypes: new Set(['JavaScript']),
          added: [],
          modified: ['src/app.js'],
          renamed: []
        },
        codeChanges: { 
          tests: 0, 
          newFunctions: [],
          newClasses: [],
          keywords: []
        }
      }
      
      const result = analyzer.determineChangeType(analysis)
      
      expect(result).toBe('feat')
    })

    test('should default to chore for no modifications', () => {
      const analysis = {
        fileChanges: { 
          categories: new Set(['code']), 
          added: [],
          modified: [],
          renamed: []
        },
        codeChanges: { 
          tests: 0, 
          newFunctions: [],
          newClasses: [],
          keywords: []
        }
      }
      
      const result = analyzer.determineChangeType(analysis)
      
      expect(result).toBe('chore')
    })
  })

  describe('calculateConfidence', () => {
    test('should give high confidence for test files', () => {
      const analysis = {
        fileChanges: { 
          categories: new Set(['test']),
          added: ['test.js'],
          modified: []
        },
        codeChanges: { 
          newFunctions: [],
          keywords: []
        }
      }
      
      const result = analyzer.calculateConfidence(analysis)
      
      expect(result).toBeGreaterThan(70)
    })

    test('should give high confidence for docs', () => {
      const analysis = {
        fileChanges: { 
          categories: new Set(['docs']),
          added: ['README.md'],
          modified: []
        },
        codeChanges: { 
          newFunctions: [],
          keywords: []
        }
      }
      
      const result = analyzer.calculateConfidence(analysis)
      
      expect(result).toBeGreaterThan(70)
    })

    test('should increase confidence for new functions', () => {
      const analysis = {
        fileChanges: { 
          categories: new Set(['code']),
          added: [],
          modified: []
        },
        codeChanges: { 
          newFunctions: ['newFunc'],
          keywords: []
        }
      }
      
      const result = analyzer.calculateConfidence(analysis)
      
      expect(result).toBeGreaterThan(60)
    })

    test('should decrease confidence for mixed changes', () => {
      const analysis = {
        fileChanges: { 
          categories: new Set(['code', 'test', 'docs', 'config']),
          added: Array(12).fill('file'),
          modified: []
        },
        codeChanges: { 
          newFunctions: [],
          keywords: []
        }
      }
      
      const result = analyzer.calculateConfidence(analysis)
      
      expect(result).toBeLessThan(50)
    })

    test('should have minimum confidence of 10', () => {
      const analysis = {
        fileChanges: { 
          categories: new Set(['code', 'test', 'docs', 'config', 'api']),
          added: Array(20).fill('file'),
          modified: []
        },
        codeChanges: { 
          newFunctions: [],
          keywords: []
        }
      }
      
      const result = analyzer.calculateConfidence(analysis)
      
      expect(result).toBeGreaterThan(9)
      expect(result).toBeLessThan(91)
    })
  })

  describe('generateSummary', () => {
    test('should summarize file additions', () => {
      const analysis = {
        fileChanges: { 
          added: ['file1.js', 'file2.js'],
          modified: []
        },
        codeChanges: { 
          newFunctions: []
        }
      }
      
      const result = analyzer.generateSummary(analysis)
      
      expect(result).toContain('2 new files')
    })

    test('should summarize file modifications', () => {
      const analysis = {
        fileChanges: { 
          added: [],
          modified: ['file1.js']
        },
        codeChanges: { 
          newFunctions: []
        }
      }
      
      const result = analyzer.generateSummary(analysis)
      
      expect(result).toContain('1 modified')
    })

    test('should summarize new functions', () => {
      const analysis = {
        fileChanges: { 
          added: [],
          modified: []
        },
        codeChanges: { 
          newFunctions: ['func1', 'func2', 'func3']
        }
      }
      
      const result = analyzer.generateSummary(analysis)
      
      expect(result).toContain('3 new functions')
    })

    test('should provide default summary', () => {
      const analysis = {
        fileChanges: { 
          added: [],
          modified: []
        },
        codeChanges: { 
          newFunctions: []
        }
      }
      
      const result = analyzer.generateSummary(analysis)
      
      expect(result).toBe('Code changes detected')
    })
  })

  describe('helper methods', () => {
    test('getFileExtension should extract extension correctly', () => {
      expect(analyzer.getFileExtension('file.js')).toBe('.js')
      expect(analyzer.getFileExtension('path/to/file.test.js')).toBe('.js')
      expect(analyzer.getFileExtension('noextension')).toBe('')
    })

    test('categorizeFile should categorize paths correctly', () => {
      expect(analyzer.categorizeFile('tests/auth.test.js')).toBe('test')
      expect(analyzer.categorizeFile('src/auth.spec.js')).toBe('test')
      expect(analyzer.categorizeFile('README.md')).toBe('docs')
      expect(analyzer.categorizeFile('docs/api.md')).toBe('docs')
      expect(analyzer.categorizeFile('config/webpack.js')).toBe('config')
      expect(analyzer.categorizeFile('package.json')).toBe('config')
      expect(analyzer.categorizeFile('src/components/Button.jsx')).toBe('ui')
      expect(analyzer.categorizeFile('src/api/users.js')).toBe('api')
      expect(analyzer.categorizeFile('src/utils/helper.js')).toBe('utils')
      expect(analyzer.categorizeFile('src/app.js')).toBe('code')
    })

    test('extractMatches should extract pattern matches', () => {
      const text = 'function test1() {}\nconst test2 = () => {}'
      const pattern = /(?:function|const)\s+(\w+)/g
      
      const result = analyzer.extractMatches(text, pattern)
      
      expect(result).toContain('test1')
      expect(result).toContain('test2')
    })

    test('countMatches should count pattern occurrences', () => {
      const text = 'import React\nimport { useState }\nconst util = require()'
      const pattern = /import|require/g
      
      const result = analyzer.countMatches(text, pattern)
      
      expect(result).toBe(3)
    })
  })
})