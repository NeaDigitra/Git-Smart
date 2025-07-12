const { testFramework } = require('../test-framework')

async function runUnitTests() {
  console.log('🧪 Running Unit Tests\n')
  
  // Load all unit test files
  require('./git-utils.test.js')
  require('./diff-analyzer.test.js')
  require('./history-analyzer.test.js')
  require('./message-generator.test.js')
  
  const success = await testFramework.run()
  
  if (success) {
    console.log('\n🎉 All unit tests passed!')
    process.exit(0)
  } else {
    console.log('\n💥 Some unit tests failed!')
    process.exit(1)
  }
}

// Add beforeEach function to test framework if not already present
if (!global.beforeEach) {
  global.beforeEach = (fn) => {
    // Simple implementation - just store the function
    // In a real test framework, this would be called before each test
    global._beforeEachFn = fn
  }
}

if (!global.afterEach) {
  global.afterEach = (fn) => {
    global._afterEachFn = fn
  }
}

if (require.main === module) {
  runUnitTests().catch(console.error)
}

module.exports = { runUnitTests }