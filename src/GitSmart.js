const { GitUtils } = require('./utils/git')
const { DiffAnalyzer } = require('./analyzers/DiffAnalyzer')
const { HistoryAnalyzer } = require('./analyzers/HistoryAnalyzer')
const { MessageGenerator } = require('./generators/MessageGenerator')
const { InteractivePrompt, SimplePrompt } = require('./utils/interactive')

class GitSmart {
  constructor(options = {}) {
    this.options = {
      interactive: false,
      verbose: false,
      dryRun: false,
      ...options
    }
    this.diffAnalyzer = new DiffAnalyzer()
    this.historyAnalyzer = new HistoryAnalyzer()
    this.messageGenerator = new MessageGenerator()
    this.interactive = this.options.interactive ? new InteractivePrompt() : null
  }

  async run() {
    try {
      // Validate git repository
      await this.validateEnvironment()
      // Analyze changes
      const analysis = await this.analyzeChanges()
      // Get commit style from history
      const styleGuide = await this.getStyleGuide()
      // Generate commit messages
      const messages = this.generateCommitMessages(analysis, styleGuide)
      // Handle user interaction
      const selectedMessage = await this.handleUserInteraction(analysis, messages)
      // Commit or show result
      await this.executeCommit(selectedMessage)
      
    } catch (error) {
      if (this.interactive) {
        this.interactive.displayError(error.message)
        this.interactive.close()
      } else {
        console.error('❌ Error:', error.message)
      }
      throw error
    } finally {
      if (this.interactive) {
        this.interactive.close()
      }
    }
  }

  async validateEnvironment() {
    if (!GitUtils.isGitRepository()) {
      throw new Error('Not a git repository. Please run this command from within a git repository.')
    }
    if (!GitUtils.hasStagedChanges()) {
      throw new Error('No staged changes found. Please stage your changes with "git add" first.')
    }
    if (this.options.verbose) {
      console.log('✅ Git repository and staged changes detected')
    }
  }

  async analyzeChanges() {
    if (this.options.verbose) {
      console.log('🔍 Analyzing staged changes...')
    }
    const diff = GitUtils.getStagedDiff()
    const stagedFiles = GitUtils.getStagedFiles()
    const stats = GitUtils.getDiffStats()
    const analysis = this.diffAnalyzer.analyze(diff, stagedFiles)
    analysis.stats = stats
    if (this.options.verbose) {
      console.log(`   • ${stats.files} files changed`)
      console.log(`   • ${stats.insertions} insertions, ${stats.deletions} deletions`)
      console.log(`   • Change type: ${analysis.changeType} (${analysis.confidence}% confidence)`)
    }
    return analysis
  }

  async getStyleGuide() {
    if (this.options.verbose) {
      console.log('📚 Analyzing commit history for style patterns...')
    }
    const commits = GitUtils.getRecentCommits(50)
    const historyAnalysis = this.historyAnalyzer.analyzeCommitHistory(commits)
    const styleGuide = this.historyAnalyzer.generateStyleGuide(historyAnalysis)
    if (this.options.verbose && commits.length > 0) {
      console.log(`   • Detected style: ${historyAnalysis.style}`)
      console.log(`   • Common prefix: "${historyAnalysis.commonPrefixes[0]?.word || 'none'}"`)
      console.log(`   • Average length: ${historyAnalysis.averageLength} characters`)
    }
    // Add the adaptation method
    styleGuide.adaptMessageToStyle = (message, guide) => {
      return this.historyAnalyzer.adaptMessageToStyle(message, guide)
    }
    return styleGuide
  }

  generateCommitMessages(analysis, styleGuide) {
    const options = {
      includeAlternatives: this.options.interactive
    }
    return this.messageGenerator.generateMessages(analysis, styleGuide, options)
  }

  async handleUserInteraction(analysis, messages) {
    if (this.options.interactive) {
      return await this.handleInteractiveMode(analysis, messages)
    } else {
      return await this.handleSimpleMode(messages[0])
    }
  }

  async handleInteractiveMode(analysis, messages) {
    this.interactive.displayAnalysis(analysis)
    this.interactive.displayMessages(messages)
    const choice = await this.interactive.selectFromOptions(
      messages.map(m => m.message),
      '💬 Choose a commit message:'
    )
    if (choice.type === 'selected') {
      return messages[choice.index].message
    } else if (choice.type === 'custom') {
      return await this.interactive.getCustomMessage(messages[0].message)
    }
  }

  async handleSimpleMode(primaryMessage) {
    console.log('\n🔍 Analyzing changes...')
    console.log(`💡 Suggested commit: "${primaryMessage.message}"`)
    if (this.options.dryRun) {
      console.log('\n📋 Dry run mode - no commit will be made')
      return null
    }
    const confirmed = await SimplePrompt.confirm('Use this message?', true)
    if (!(confirmed)) {
      const customMessage = await SimplePrompt.input('Enter custom message', primaryMessage.message)
      return customMessage
    }
    return primaryMessage.message
  }

  async executeCommit(message) {
    if (!(message)) {
      console.log('ℹ️ No commit made')
      return
    }
    if (this.options.dryRun) {
      console.log(`\n📋 Dry run - would commit with message: "${message}"`)
      return
    }
    try {
      GitUtils.commit(message)
      if (this.interactive) {
        this.interactive.displaySuccess(`Committed with message: "${message}"`)
      } else {
        console.log(`✅ Committed successfully!`)
      }
      if (this.options.verbose) {
        console.log(`📝 Message: "${message}"`)
      }
    } catch (error) {
      throw new Error(`Failed to commit: ${error.message}`)
    }
  }
}

module.exports = { GitSmart }