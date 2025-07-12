const { runUnitTests } = require('./unit/runner')
const { runIntegrationTests } = require('./integration/runner')
const { testFramework } = require('./test-framework')

async function runAllTests() {
  console.log('🚀 Git-Smart Test Suite Runner\n')
  
  let totalPassed = 0
  let totalFailed = 0
  let hasFailures = false
  
  try {
    console.log('=' .repeat(50))
    console.log('📝 UNIT TESTS')
    console.log('=' .repeat(50))
    
    // Reset test framework
    testFramework.tests = []
    testFramework.suites = []
    testFramework.passed = 0
    testFramework.failed = 0
    testFramework.errors = []
    
    // Load unit tests
    require('./unit/git-utils.test.js')
    require('./unit/diff-analyzer.test.js')
    require('./unit/history-analyzer.test.js')
    require('./unit/message-generator.test.js')
    
    const unitSuccess = await testFramework.run()
    totalPassed += testFramework.passed
    totalFailed += testFramework.failed
    
    if (!unitSuccess) {
      hasFailures = true
    }
    
    console.log('\n' + '=' .repeat(50))
    console.log('🔗 INTEGRATION TESTS')
    console.log('=' .repeat(50))
    
    // Reset test framework for integration tests
    testFramework.tests = []
    testFramework.suites = []
    testFramework.passed = 0
    testFramework.failed = 0
    testFramework.errors = []
    
    // Load integration tests
    require('./integration/git-smart.test.js')
    
    const integrationSuccess = await testFramework.run()
    totalPassed += testFramework.passed
    totalFailed += testFramework.failed
    
    if (!integrationSuccess) {
      hasFailures = true
    }
    
    // Overall summary
    console.log('\n' + '=' .repeat(50))
    console.log('📊 OVERALL TEST SUMMARY')
    console.log('=' .repeat(50))
    console.log(`✅ Total Passed: ${totalPassed}`)
    console.log(`❌ Total Failed: ${totalFailed}`)
    console.log(`📝 Total Tests: ${totalPassed + totalFailed}`)
    
    if (hasFailures) {
      console.log('\n💥 Test suite completed with failures!')
      process.exit(1)
    } else {
      console.log('\n🎉 All tests passed successfully!')
      process.exit(0)
    }
    
  } catch (error) {
    console.error('\n💀 Test runner encountered an error:')
    console.error(error.message)
    console.error(error.stack)
    process.exit(1)
  }
}

// Handle command line arguments
const args = process.argv.slice(2)

if (args.includes('--watch')) {
  console.log('👀 Watch mode not implemented yet')
  process.exit(1)
}

if (require.main === module) {
  runAllTests().catch(console.error)
}

module.exports = { runAllTests }