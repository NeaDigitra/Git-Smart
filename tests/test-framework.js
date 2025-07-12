// Simple test framework for Git-Smart
class TestFramework {
  constructor() {
    this.tests = []
    this.suites = []
    this.currentSuite = null
    this.passed = 0
    this.failed = 0
    this.errors = []
  }

  describe(name, fn) {
    const suite = { name, tests: [] }
    this.suites.push(suite)
    this.currentSuite = suite
    fn()
    this.currentSuite = null
  }

  test(name, fn) {
    const test = { name, fn, suite: this.currentSuite?.name || 'Global' }
    this.tests.push(test)
    if (this.currentSuite) {
      this.currentSuite.tests.push(test)
    }
  }

  it(name, fn) {
    this.test(name, fn)
  }

  async run() {
    console.log('🧪 Running Git-Smart Test Suite\n')
    
    for (const test of this.tests) {
      try {
        await test.fn()
        this.passed++
        console.log(`✅ ${test.suite}: ${test.name}`)
      } catch (error) {
        this.failed++
        this.errors.push({ test: `${test.suite}: ${test.name}`, error })
        console.log(`❌ ${test.suite}: ${test.name}`)
        console.log(`   Error: ${error.message}`)
      }
    }

    this.printSummary()
    return this.failed === 0
  }

  printSummary() {
    console.log('\n📊 Test Summary:')
    console.log(`   ✅ Passed: ${this.passed}`)
    console.log(`   ❌ Failed: ${this.failed}`)
    console.log(`   📝 Total: ${this.tests.length}`)
    
    if (this.errors.length > 0) {
      console.log('\n🚨 Failed Tests:')
      this.errors.forEach(({ test, error }) => {
        console.log(`   • ${test}: ${error.message}`)
      })
    }
  }
}

// Assertion helpers
class Expect {
  constructor(actual) {
    this.actual = actual
  }

  toBe(expected) {
    if (this.actual !== expected) {
      throw new Error(`Expected ${this.actual} to be ${expected}`)
    }
    return this
  }

  toEqual(expected) {
    if (JSON.stringify(this.actual) !== JSON.stringify(expected)) {
      throw new Error(`Expected ${JSON.stringify(this.actual)} to equal ${JSON.stringify(expected)}`)
    }
    return this
  }

  toContain(expected) {
    if (!this.actual.includes(expected)) {
      throw new Error(`Expected ${this.actual} to contain ${expected}`)
    }
    return this
  }

  toHaveLength(expected) {
    if (this.actual.length !== expected) {
      throw new Error(`Expected length ${this.actual.length} to be ${expected}`)
    }
    return this
  }

  toBeTruthy() {
    if (!this.actual) {
      throw new Error(`Expected ${this.actual} to be truthy`)
    }
    return this
  }

  toBeFalsy() {
    if (this.actual) {
      throw new Error(`Expected ${this.actual} to be falsy`)
    }
    return this
  }

  toThrow(expectedMessage) {
    if (typeof this.actual !== 'function') {
      throw new Error('Expected a function to test for throwing')
    }
    
    let thrown = false
    let actualError = null
    
    try {
      this.actual()
    } catch (error) {
      thrown = true
      actualError = error
    }
    
    if (!thrown) {
      throw new Error('Expected function to throw an error')
    }
    
    if (expectedMessage && !actualError.message.includes(expectedMessage)) {
      throw new Error(`Expected error message to contain "${expectedMessage}", got "${actualError.message}"`)
    }
    
    return this
  }

  toBeGreaterThan(expected) {
    if (this.actual <= expected) {
      throw new Error(`Expected ${this.actual} to be greater than ${expected}`)
    }
    return this
  }

  toBeLessThan(expected) {
    if (this.actual >= expected) {
      throw new Error(`Expected ${this.actual} to be less than ${expected}`)
    }
    return this
  }

  toBeInstanceOf(expected) {
    if (!(this.actual instanceof expected)) {
      throw new Error(`Expected ${this.actual} to be instance of ${expected.name}`)
    }
    return this
  }
}

function expect(actual) {
  return new Expect(actual)
}

// Mock helpers
class MockHelper {
  static mockExecSync(returnValue = '', shouldThrow = false) {
    const originalExecSync = require('child_process').execSync
    
    const mock = (command, options) => {
      // Mock specific git commands for testing
      if (typeof command === 'string') {
        if (command.includes('git rev-parse --git-dir')) {
          if (shouldThrow) throw new Error('Not a git repository')
          return returnValue
        }
        if (command.includes('git diff --cached --name-only')) {
          if (shouldThrow) throw new Error('Git command failed')
          return returnValue
        }
        if (command.includes('git diff --cached --name-status')) {
          if (shouldThrow) throw new Error('Git command failed')
          return returnValue
        }
        if (command.includes('git diff --cached')) {
          if (shouldThrow) throw new Error('Git command failed')
          return returnValue
        }
        if (command.includes('git log --oneline')) {
          if (shouldThrow) throw new Error('Git command failed')
          return returnValue
        }
        if (command.includes('git diff --cached --stat')) {
          if (shouldThrow) throw new Error('Git command failed')
          return returnValue
        }
      }
      
      if (shouldThrow) {
        throw new Error('Mock error')
      }
      return returnValue
    }
    
    mock.restore = () => {
      require('child_process').execSync = originalExecSync
    }
    
    require('child_process').execSync = mock
    return mock
  }

  static createMockCommits(count = 5) {
    const commits = []
    const types = ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore', 'perf', 'build', 'ci', 'security', 'deps', 'revert', 'hotfix']
    
    for (let i = 0; i < count; i++) {
      commits.push({
        hash: `abc${i}23${i}`,
        message: `${types[i % types.length]}: sample commit ${i + 1}`
      })
    }
    
    return commits
  }

  static createMockDiff(type = 'feat') {
    const diffs = {
      feat: `
diff --git a/src/auth.js b/src/auth.js
new file mode 100644
index 0000000..1234567
--- /dev/null
+++ b/src/auth.js
@@ -0,0 +1,10 @@
+function authenticateUser(email, password) {
+  if (!email || !password) {
+    throw new Error('Missing credentials')
+  }
+  return validateCredentials(email, password)
+}
+
+function validateCredentials(email, password) {
+  return email.includes('@') && password.length > 6
+}
`,
      fix: `
diff --git a/src/api.js b/src/api.js
index 1234567..abcdefg 100644
--- a/src/api.js
+++ b/src/api.js
@@ -5,7 +5,10 @@ function fetchUser(id) {
   if (!id) {
     throw new Error('User ID required')
   }
-  return fetch(\`/api/users/\${id}\`)
+  const response = fetch(\`/api/users/\${id}\`)
+  if (!response.ok) {
+    throw new Error('Failed to fetch user')
+  }
+  return response
 }
`,
      test: `
diff --git a/tests/auth.test.js b/tests/auth.test.js
new file mode 100644
index 0000000..1234567
--- /dev/null
+++ b/tests/auth.test.js
@@ -0,0 +1,15 @@
+describe('Authentication', () => {
+  test('should authenticate valid user', () => {
+    expect(authenticateUser('user@test.com', 'password123')).toBe(true)
+  })
+  
+  test('should reject invalid credentials', () => {
+    expect(() => authenticateUser('', '')).toThrow('Missing credentials')
+  })
+})
`
    }
    
    return diffs[type] || diffs.feat
  }

  static createMockFiles(type = 'feat') {
    const files = {
      feat: [
        { status: 'A', path: 'src/auth.js' },
        { status: 'A', path: 'src/utils.js' }
      ],
      fix: [
        { status: 'M', path: 'src/api.js' }
      ],
      test: [
        { status: 'A', path: 'tests/auth.test.js' },
        { status: 'M', path: 'tests/utils.test.js' }
      ],
      docs: [
        { status: 'M', path: 'README.md' },
        { status: 'A', path: 'docs/api.md' }
      ]
    }
    
    return files[type] || files.feat
  }
}

// Global test instance
const testFramework = new TestFramework()

// Export globals for test files
global.describe = testFramework.describe.bind(testFramework)
global.test = testFramework.test.bind(testFramework)
global.it = testFramework.it.bind(testFramework)
global.expect = expect
global.MockHelper = MockHelper

module.exports = { TestFramework, Expect, MockHelper, testFramework }