function parseArgs(args) {
  const options = {
    interactive: false,
    verbose: false,
    dryRun: false,
    help: false,
    // v1.1.0: New enhanced options
    enhanced: false,
    analyze: false,
    profile: false
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
      // v1.1.0: Enhanced pattern recognition
      case '-e':
      case '--enhanced':
        options.enhanced = true
        break
      // v1.1.0: Deep commit history analysis
      case '-a':
      case '--analyze':
        options.analyze = true
        break
      // v1.1.0: Show style profile
      case '-p':
      case '--profile':
        options.profile = true
        break
    }
  }
  return options
}

function showHelp() {
  console.log(`
🚀 Git-Smart v1.1.0 - AI-powered commit message generator

Usage: git-smart [options]

Options:
  -i, --interactive    Interactive mode with multiple suggestions
  -v, --verbose        Show detailed analysis information
  -d, --dry-run        Show suggested message without committing
  -e, --enhanced       Use enhanced pattern recognition (v1.1.0)
  -a, --analyze        Show detailed commit history analysis
  -p, --profile        Display your commit style profile
  -h, --help          Show this help message

Examples:
  git add .
  git-smart                    # Generate and commit with suggested message
  git-smart --interactive      # Choose from multiple suggestions
  git-smart --enhanced         # Use advanced pattern recognition
  git-smart --analyze          # Deep analysis of commit patterns
  git-smart --profile          # Show your commit style profile
  git-smart --dry-run          # See suggestion without committing

v1.1.0 Features:
  • Enhanced vocabulary pattern recognition
  • Team style analysis and recommendations
  • Improved confidence scoring
  • Advanced scope and type frequency analysis

Requirements:
  - Must be in a git repository
  - Must have staged changes (git add files first)
  `)
}

module.exports = { parseArgs, showHelp }