function parseArgs(args) {
  const options = {
    interactive: false,
    verbose: false,
    dryRun: false,
    help: false
  }

  for (const arg of args) {
    switch (arg) {
      case '-i':
      case '--interactive':
        options.interactive = true
        break
      case '-v':
      case '--verbose':
        options.verbose = true
        break
      case '-d':
      case '--dry-run':
        options.dryRun = true
        break
      case '-h':
      case '--help':
        options.help = true
        break
    }
  }
  return options
}

function showHelp() {
  console.log(`
🚀 Git-Smart - AI-powered commit message generator

Usage: git-smart [options]

Options:
  -i, --interactive    Interactive mode with multiple suggestions
  -v, --verbose        Show detailed analysis information
  -d, --dry-run        Show suggested message without committing
  -h, --help          Show this help message

Examples:
  git add .
  git-smart                    # Generate and commit with suggested message
  git-smart --interactive      # Choose from multiple suggestions
  git-smart --dry-run          # See suggestion without committing

Requirements:
  - Must be in a git repository
  - Must have staged changes (git add files first)
  `)
}

module.exports = { parseArgs, showHelp }