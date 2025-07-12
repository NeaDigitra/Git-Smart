const { testFramework } = require('../test-framework')

async function runIntegrationTests() {
  console.log('🔗 Running Integration Tests\n')
  
  // Load all integration test files
  require('./git-smart.test.js')
  
  const success = await testFramework.run()
  
  if (success) {
    console.log('\n🎉 All integration tests passed!')
    process.exit(0)
  } else {
    console.log('\n💥 Some integration tests failed!')
    process.exit(1)
  }
}

if (require.main === module) {
  runIntegrationTests().catch(console.error)
}

module.exports = { runIntegrationTests }