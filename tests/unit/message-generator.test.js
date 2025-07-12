require('../test-framework')
const { MessageGenerator } = require('../../src/generators/MessageGenerator')

describe('MessageGenerator', () => {
  let generator

  beforeEach(() => {
    generator = new MessageGenerator()
  })

  describe('constructor', () => {
    test('should initialize with templates for all commit types', () => {
      // Core types
      expect(generator.templates.feat).toBeInstanceOf(Array)
      expect(generator.templates.fix).toBeInstanceOf(Array)
      expect(generator.templates.docs).toBeInstanceOf(Array)
      expect(generator.templates.test).toBeInstanceOf(Array)
      expect(generator.templates.refactor).toBeInstanceOf(Array)
      expect(generator.templates.style).toBeInstanceOf(Array)
      expect(generator.templates.chore).toBeInstanceOf(Array)
      expect(generator.templates.perf).toBeInstanceOf(Array)
      
      // Extended types
      expect(generator.templates.build).toBeInstanceOf(Array)
      expect(generator.templates.ci).toBeInstanceOf(Array)
      expect(generator.templates.security).toBeInstanceOf(Array)
      expect(generator.templates.deps).toBeInstanceOf(Array)
      expect(generator.templates.revert).toBeInstanceOf(Array)
      expect(generator.templates.hotfix).toBeInstanceOf(Array)
      expect(generator.templates.wip).toBeInstanceOf(Array)
      expect(generator.templates.merge).toBeInstanceOf(Array)
      expect(generator.templates.init).toBeInstanceOf(Array)
      expect(generator.templates.release).toBeInstanceOf(Array)
    })

    test('should have comprehensive scope mappings', () => {
      // Core scopes
      expect(generator.scopes.api).toBe('api')
      expect(generator.scopes.ui).toBe('ui')
      expect(generator.scopes.auth).toBe('auth')
      expect(generator.scopes.database).toBe('database')
      expect(generator.scopes.config).toBe('config')
      
      // Architecture scopes
      expect(generator.scopes.service).toBe('service')
      expect(generator.scopes.controller).toBe('controller')
      expect(generator.scopes.model).toBe('model')
      
      // DevOps scopes
      expect(generator.scopes.build).toBe('build')
      expect(generator.scopes.ci).toBe('ci')
      expect(generator.scopes.deploy).toBe('deploy')
      
      // Security scopes
      expect(generator.scopes.security).toBe('security')
      expect(generator.scopes.permission).toBe('security')
    })
  })

  describe('generateMessages', () => {
    test('should generate primary message only by default', () => {
      const analysis = createMockAnalysis('feat')
      const styleGuide = createMockStyleGuide()
      
      const result = generator.generateMessages(analysis, styleGuide)
      
      expect(result).toHaveLength(1)
      expect(result[0].type).toBe('primary')
      expect(result[0].message).toContain('feat(')
    })

    test('should generate alternatives when requested', () => {
      const analysis = createMockAnalysis('feat')
      const styleGuide = createMockStyleGuide()
      
      const result = generator.generateMessages(analysis, styleGuide, { includeAlternatives: true })
      
      expect(result.length).toBeGreaterThan(1)
      expect(result[0].type).toBe('primary')
      expect(result.some(msg => msg.type === 'alternative')).toBe(true)
    })
  })

  describe('generatePrimaryMessage', () => {
    test('should generate feat message with action and description', () => {
      const analysis = createMockAnalysis('feat', {
        fileChanges: {
          added: ['src/auth.js'],
          modified: [],
          categories: new Set(['code'])
        },
        codeChanges: {
          newFunctions: ['authenticateUser'],
          newClasses: []
        }
      })
      const styleGuide = createMockStyleGuide()
      
      const result = generator.generatePrimaryMessage(analysis, styleGuide)
      
      expect(result).toContain('feat(')
      expect(result).toContain('):')
      expect(result.charAt(0)).toBe(result.charAt(0).toLowerCase())
    })

    test('should generate fix message', () => {
      const analysis = createMockAnalysis('fix', {
        fileChanges: {
          added: [],
          modified: ['src/api.js'],
          categories: new Set(['code'])
        },
        codeChanges: {
          newFunctions: [],
          keywords: ['fix', 'bug']
        }
      })
      const styleGuide = createMockStyleGuide()
      
      const result = generator.generatePrimaryMessage(analysis, styleGuide)
      
      expect(result).toContain('fix(')
    })

    test('should generate test message', () => {
      const analysis = createMockAnalysis('test', {
        fileChanges: {
          added: ['tests/auth.test.js'],
          modified: [],
          categories: new Set(['test'])
        },
        codeChanges: {
          tests: 3
        }
      })
      const styleGuide = createMockStyleGuide()
      
      const result = generator.generatePrimaryMessage(analysis, styleGuide)
      
      expect(result).toContain('test(')
    })

    test('should generate security message', () => {
      const analysis = createMockAnalysis('security', {
        fileChanges: {
          added: [],
          modified: ['src/auth/security.js'],
          categories: new Set(['security'])
        },
        codeChanges: {
          newFunctions: ['validateToken'],
          keywords: ['security', 'auth']
        }
      })
      const styleGuide = createMockStyleGuide()
      
      const result = generator.generatePrimaryMessage(analysis, styleGuide)
      
      expect(result).toContain('security(')
    })

    test('should generate build message', () => {
      const analysis = createMockAnalysis('build', {
        fileChanges: {
          added: [],
          modified: ['webpack.config.js'],
          categories: new Set(['build'])
        },
        codeChanges: {
          newFunctions: [],
          keywords: ['webpack', 'build']
        }
      })
      const styleGuide = createMockStyleGuide()
      
      const result = generator.generatePrimaryMessage(analysis, styleGuide)
      
      expect(result).toContain('build(')
    })

    test('should generate ci message', () => {
      const analysis = createMockAnalysis('ci', {
        fileChanges: {
          added: ['.github/workflows/test.yml'],
          modified: [],
          categories: new Set(['build'])
        },
        codeChanges: {
          newFunctions: [],
          keywords: ['workflow', 'ci']
        }
      })
      const styleGuide = createMockStyleGuide()
      
      const result = generator.generatePrimaryMessage(analysis, styleGuide)
      
      expect(result).toContain('ci(')
    })

    test('should apply style guide adaptations', () => {
      const analysis = createMockAnalysis('feat')
      const styleGuide = createMockStyleGuide()
      styleGuide.adaptMessageToStyle = (message) => message.toUpperCase()
      
      const result = generator.generatePrimaryMessage(analysis, styleGuide)
      
      expect(result).toBe(result.toUpperCase())
    })
  })

  describe('generateAlternatives', () => {
    test('should generate multiple alternatives using different templates', () => {
      const analysis = createMockAnalysis('feat')
      const styleGuide = createMockStyleGuide()
      
      const result = generator.generateAlternatives(analysis, styleGuide)
      
      expect(result.length).toBeGreaterThan(0)
      result.forEach(alt => {
        expect(alt.type).toBe('alternative')
        expect(alt.confidence).toBeLessThan(analysis.confidence)
        expect(alt.message).toContain('feat(')
      })
    })

    test('should add alternative change type for low confidence', () => {
      const analysis = createMockAnalysis('feat')
      analysis.confidence = 40 // Low confidence
      const styleGuide = createMockStyleGuide()
      
      const result = generator.generateAlternatives(analysis, styleGuide)
      
      expect(result.some(alt => !alt.message.startsWith('feat('))).toBe(true)
    })

    test('should maintain decreasing confidence for alternatives', () => {
      const analysis = createMockAnalysis('feat')
      analysis.confidence = 80
      const styleGuide = createMockStyleGuide()
      
      const result = generator.generateAlternatives(analysis, styleGuide)
      
      for (let i = 1; i < result.length; i++) {
        expect(result[i].confidence).toBeLessThan(result[i-1].confidence)
      }
    })
  })

  describe('generateDescription', () => {
    test('should describe new functions', () => {
      const analysis = {
        fileChanges: { added: [], categories: new Set() },
        codeChanges: { newFunctions: ['authenticateUser', 'validateToken'] }
      }
      
      const result = generator.generateDescription(analysis)
      
      expect(result).toBe('authenticateUser function')
    })

    test('should describe multiple functions', () => {
      const analysis = {
        fileChanges: { added: [], categories: new Set() },
        codeChanges: { newFunctions: ['func1', 'func2', 'func3'] }
      }
      
      const result = generator.generateDescription(analysis)
      
      expect(result).toBe('func1 and other functions')
    })

    test('should describe new classes', () => {
      const analysis = {
        fileChanges: { added: [], categories: new Set() },
        codeChanges: { newFunctions: [], newClasses: ['UserManager'] }
      }
      
      const result = generator.generateDescription(analysis)
      
      expect(result).toBe('UserManager class')
    })

    test('should describe new files', () => {
      const analysis = {
        fileChanges: { 
          added: ['src/auth.js'], 
          categories: new Set(['code']) 
        },
        codeChanges: { newFunctions: [], newClasses: [] }
      }
      
      const result = generator.generateDescription(analysis)
      
      expect(result).toBe('auth')
    })

    test('should describe multiple files', () => {
      const analysis = {
        fileChanges: { 
          added: ['src/auth.js', 'src/utils.js', 'src/api.js'], 
          categories: new Set(['code']) 
        },
        codeChanges: { newFunctions: [], newClasses: [] }
      }
      
      const result = generator.generateDescription(analysis)
      
      expect(result).toBe('auth and 2 other files')
    })

    test('should describe by category', () => {
      const analysis = {
        fileChanges: { 
          added: [],
          modified: ['README.md'],
          categories: new Set(['docs']) 
        },
        codeChanges: { newFunctions: [], newClasses: [] }
      }
      
      const result = generator.generateDescription(analysis)
      
      expect(result).toBe('documentation')
    })

    test('should describe by file type', () => {
      const analysis = {
        fileChanges: { 
          added: [],
          modified: ['styles.css'],
          categories: new Set(['code']),
          fileTypes: new Set(['CSS'])
        },
        codeChanges: { newFunctions: [], newClasses: [] }
      }
      
      const result = generator.generateDescription(analysis)
      
      expect(result).toBe('CSS code')
    })

    test('should describe API integration', () => {
      const analysis = {
        fileChanges: { added: [], categories: new Set() },
        codeChanges: { 
          newFunctions: [], 
          newClasses: [], 
          apiCalls: 3,
          database: 0,
          imports: 1
        }
      }
      
      const result = generator.generateDescription(analysis)
      
      expect(result).toBe('API integration')
    })

    test('should describe database functionality', () => {
      const analysis = {
        fileChanges: { added: [], categories: new Set() },
        codeChanges: { 
          newFunctions: [], 
          newClasses: [], 
          apiCalls: 0,
          database: 2,
          imports: 1
        }
      }
      
      const result = generator.generateDescription(analysis)
      
      expect(result).toBe('database functionality')
    })

    test('should describe module dependencies', () => {
      const analysis = {
        fileChanges: { added: [], categories: new Set() },
        codeChanges: { 
          newFunctions: [], 
          newClasses: [], 
          apiCalls: 0,
          database: 0,
          imports: 5
        }
      }
      
      const result = generator.generateDescription(analysis)
      
      expect(result).toBe('module dependencies')
    })

    test('should describe existing functionality for modifications', () => {
      const analysis = {
        fileChanges: { 
          added: [],
          modified: ['file1.js', 'file2.js', 'file3.js'],
          categories: new Set(['code'])
        },
        codeChanges: { 
          newFunctions: [], 
          newClasses: [],
          apiCalls: 0,
          database: 0,
          imports: 1
        }
      }
      
      const result = generator.generateDescription(analysis)
      
      expect(result).toBe('existing functionality')
    })

    test('should provide fallback description', () => {
      const analysis = {
        fileChanges: { 
          added: ['new-file.js'],
          modified: [],
          categories: new Set(['code'])
        },
        codeChanges: { 
          newFunctions: [], 
          newClasses: [],
          apiCalls: 0,
          database: 0,
          imports: 1
        }
      }
      
      const result = generator.generateDescription(analysis)
      
      expect(result).toBe('new-file')
    })
  })

  describe('detectAction', () => {
    test('should detect create action for new files only', () => {
      const fileChanges = { added: ['new.js'], modified: [], deleted: [], renamed: [] }
      const codeChanges = {}
      
      const result = generator.detectAction(fileChanges, codeChanges)
      
      expect(result).toBe('create')
    })

    test('should detect remove action', () => {
      const fileChanges = { added: [], modified: [], deleted: ['old.js'], renamed: [] }
      const codeChanges = {}
      
      const result = generator.detectAction(fileChanges, codeChanges)
      
      expect(result).toBe('remove')
    })

    test('should detect refactor action for renamed files', () => {
      const fileChanges = { added: [], modified: [], deleted: [], renamed: ['old.js'] }
      const codeChanges = {}
      
      const result = generator.detectAction(fileChanges, codeChanges)
      
      expect(result).toBe('refactor')
    })

    test('should detect implement action for new functions', () => {
      const fileChanges = { added: [], modified: ['file.js'], categories: new Set() }
      const codeChanges = { newFunctions: ['newFunc'], newClasses: [] }
      
      const result = generator.detectAction(fileChanges, codeChanges)
      
      expect(result).toBe('implement')
    })

    test('should detect test action', () => {
      const fileChanges = { added: [], modified: [], categories: new Set(['test']) }
      const codeChanges = { tests: 3 }
      
      const result = generator.detectAction(fileChanges, codeChanges)
      
      expect(result).toBe('test')
    })

    test('should detect database action', () => {
      const fileChanges = { added: [], modified: [], categories: new Set() }
      const codeChanges = { database: 2 }
      
      const result = generator.detectAction(fileChanges, codeChanges)
      
      expect(result).toBe('database')
    })

    test('should detect api action', () => {
      const fileChanges = { added: [], modified: [], categories: new Set() }
      const codeChanges = { apiCalls: 1 }
      
      const result = generator.detectAction(fileChanges, codeChanges)
      
      expect(result).toBe('api')
    })

    test('should detect action from categories', () => {
      const fileChanges = { added: [], modified: [], categories: new Set(['ui']) }
      const codeChanges = {}
      
      const result = generator.detectAction(fileChanges, codeChanges)
      
      expect(result).toBe('ui')
    })

    test('should detect action from file paths', () => {
      const fileChanges = { 
        added: ['src/auth/login.js'], 
        modified: [], 
        categories: new Set(['code']) 
      }
      const codeChanges = {}
      
      const result = generator.detectAction(fileChanges, codeChanges)
      
      expect(result).toBe('auth')
    })

    test('should detect security action from paths', () => {
      const fileChanges = { 
        added: ['src/security/crypto.js'], 
        modified: [], 
        categories: new Set(['code']) 
      }
      const codeChanges = {}
      
      const result = generator.detectAction(fileChanges, codeChanges)
      
      expect(result).toBe('security')
    })

    test('should detect payment action from paths', () => {
      const fileChanges = { 
        added: ['src/payment/billing.js'], 
        modified: [], 
        categories: new Set(['code']) 
      }
      const codeChanges = {}
      
      const result = generator.detectAction(fileChanges, codeChanges)
      
      expect(result).toBe('payment')
    })

    test('should detect ci action from paths', () => {
      const fileChanges = { 
        added: ['.github/workflows/deploy.yml'], 
        modified: [], 
        categories: new Set(['build']) 
      }
      const codeChanges = {}
      
      const result = generator.detectAction(fileChanges, codeChanges)
      
      expect(result).toBe('ci')
    })

    test('should detect database action from paths', () => {
      const fileChanges = { 
        added: ['migrations/001_create_users.sql'], 
        modified: [], 
        categories: new Set(['database']) 
      }
      const codeChanges = {}
      
      const result = generator.detectAction(fileChanges, codeChanges)
      
      expect(result).toBe('database')
    })

    test('should detect update action for more modifications than additions', () => {
      const fileChanges = { 
        added: ['new.js'], 
        modified: ['file1.js', 'file2.js', 'file3.js'],
        categories: new Set() 
      }
      const codeChanges = {}
      
      const result = generator.detectAction(fileChanges, codeChanges)
      
      expect(result).toBe('update')
    })

    test('should default to core action', () => {
      const fileChanges = { added: ['new.js'], modified: ['old.js'], categories: new Set() }
      const codeChanges = {}
      
      const result = generator.detectAction(fileChanges, codeChanges)
      
      expect(result).toBe('core')
    })
  })

  describe('getAlternativeChangeType', () => {
    test('should suggest feat for non-feat with new functions', () => {
      const analysis = {
        changeType: 'fix',
        fileChanges: { added: ['new.js'] },
        codeChanges: { newFunctions: ['newFunc'] }
      }
      
      const result = generator.getAlternativeChangeType(analysis)
      
      expect(result).toBe('feat')
    })

    test('should suggest fix for non-fix with bug keywords', () => {
      const analysis = {
        changeType: 'feat',
        fileChanges: { added: [] },
        codeChanges: { keywords: ['fix', 'bug', 'error'] }
      }
      
      const result = generator.getAlternativeChangeType(analysis)
      
      expect(result).toBe('fix')
    })

    test('should suggest refactor for non-refactor with many modifications', () => {
      const analysis = {
        changeType: 'feat',
        fileChanges: { modified: ['a.js', 'b.js', 'c.js'] },
        codeChanges: { keywords: [] }
      }
      
      const result = generator.getAlternativeChangeType(analysis)
      
      expect(result).toBe('refactor')
    })

    test('should default to chore', () => {
      const analysis = {
        changeType: 'feat',
        fileChanges: { added: [], modified: [] },
        codeChanges: { newFunctions: [], keywords: [] }
      }
      
      const result = generator.getAlternativeChangeType(analysis)
      
      expect(result).toBe('chore')
    })
  })

  describe('helper methods', () => {
    test('getReadableFileName should format file names', () => {
      expect(generator.getReadableFileName('src/user-auth.js')).toBe('user auth')
      expect(generator.getReadableFileName('components/Button_Component.tsx')).toBe('button component')
      expect(generator.getReadableFileName('utils.js')).toBe('utils')
    })

    test('getCategoryDescription should map categories', () => {
      expect(generator.getCategoryDescription('test')).toBe('test coverage')
      expect(generator.getCategoryDescription('docs')).toBe('documentation')
      expect(generator.getCategoryDescription('config')).toBe('configuration')
      expect(generator.getCategoryDescription('ui')).toBe('user interface')
      expect(generator.getCategoryDescription('api')).toBe('API endpoints')
      expect(generator.getCategoryDescription('utils')).toBe('utility functions')
      expect(generator.getCategoryDescription('unknown')).toBe('unknown')
    })

    test('applyBasicStyle should enforce lowercase and no periods', () => {
      const styleGuide = {}
      
      expect(generator.applyBasicStyle('Fix Bug', styleGuide)).toBe('fix Bug')
      expect(generator.applyBasicStyle('Add feature.', styleGuide)).toBe('add feature')
      expect(generator.applyBasicStyle('UPDATE docs.', styleGuide)).toBe('uPDATE docs')
    })
  })

  // Helper functions for tests
  function createMockAnalysis(changeType, overrides = {}) {
    return {
      changeType,
      confidence: 75,
      fileChanges: {
        added: ['src/new.js'],
        modified: [],
        deleted: [],
        renamed: [],
        categories: new Set(['code']),
        fileTypes: new Set(['JavaScript'])
      },
      codeChanges: {
        newFunctions: ['newFunction'],
        newClasses: [],
        imports: 1,
        exports: 1,
        apiCalls: 0,
        database: 0,
        tests: 0,
        keywords: []
      },
      ...overrides
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
      tone: 'casual'
    }
  }
})