#!/usr/bin/env node

const { GitSmart } = require('../src/GitSmart')
const { parseArgs, showHelp } = require('../src/utils/args')

async function main() {
  try {
    const args = parseArgs(process.argv.slice(2))
    
    if (args.help) {
      showHelp()
      process.exit(0)
    }

    const gitSmart = new GitSmart({
      interactive: args.interactive,
      verbose: args.verbose,
      dryRun: args.dryRun
    })

    await gitSmart.run()
  } catch (error) {
    console.error('❌ Error:', error.message)
    if (process.argv.includes('--verbose')) {
      console.error(error.stack)
    }
    process.exit(1)
  }
}

main()