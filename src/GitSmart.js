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
    // Check if we're in a git repository
    if (!GitUtils.isGitRepository()) {
      throw new Error('Not a git repository. Please run this command from within a git repository.')
    }
    
    // Check for staged changes
    if (!GitUtils.hasStagedChanges()) {
      throw new Error('No staged changes found. Please stage your changes with "git add" first.')
    }
    
    // Additional validation: check if git is accessible
    try {
      GitUtils.getStagedFiles()
    } catch (error) {
      throw new Error(`Git repository validation failed: ${error.message}`)
    }
  }

  async analyzeChanges() {
    try {
      const diff = GitUtils.getStagedDiff()
      const stagedFiles = GitUtils.getStagedFiles()
      const stats = GitUtils.getDiffStats()
      
      // Validate that we have some changes to analyze
      if (!diff && stagedFiles.length === 0) {
        throw new Error('No changes detected to analyze')
      }
      
      const analysis = this.diffAnalyzer.analyze(diff, stagedFiles)
      analysis.stats = stats
      
      return analysis
    } catch (error) {
      throw new Error(`Failed to analyze changes: ${error.message}`)
    }
  }

  async getStyleGuide() {
    try {
      const commits = GitUtils.getRecentCommits(50)
      
      // Validate commit history
      if (!Array.isArray(commits)) {
        throw new Error('Invalid commit history format')
      }
      
      const historyAnalysis = this.historyAnalyzer.analyzeCommitHistory(commits)
      
      // v1.1.0: Use enhanced style guide generation
      const styleGuide = this.options.enhanced 
        ? this.historyAnalyzer.generateEnhancedStyleGuide(historyAnalysis)
        : this.historyAnalyzer.generateStyleGuide(historyAnalysis)
      
      // Validate style guide
      if (!styleGuide || typeof styleGuide !== 'object') {
        throw new Error('Failed to generate style guide')
      }
      
      // Add the adaptation method
      styleGuide.adaptMessageToStyle = (message, guide) => {
        return this.historyAnalyzer.adaptMessageToStyle(message, guide)
      }
      
      // v1.1.0: Store enhanced analysis for potential CLI options
      if (this.options.enhanced) {
        styleGuide.enhancedAnalysis = historyAnalysis
      }
      
      return styleGuide
    } catch (error) {
      throw new Error(`Failed to analyze commit history: ${error.message}`)
    }
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
    // Analysis output moved to interactive prompts only
    if (this.options.dryRun) {
      // Dry run notification removed for linting compliance
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
    if (!message) {
      return
    }
    
    if (this.options.dryRun) {
      return
    }
    
    // Additional validation before committing
    if (typeof message !== 'string' || message.trim().length === 0) {
      throw new Error('Invalid commit message: must be a non-empty string')
    }
    
    // Check message length (git has practical limits)
    if (message.length > 3600) {
      throw new Error('Commit message too long (maximum 3600 characters)')
    }
    
    try {
      const result = GitUtils.commit(message.trim())
      
      if (this.interactive) {
        this.interactive.displaySuccess(`Committed with message: "${message}"`)
      }
      
      return result
    } catch (error) {
      // Provide more helpful error messages for common issues
      if (error.message.includes('nothing to commit')) {
        throw new Error('No changes to commit. Please stage your changes first.')
      }
      if (error.message.includes('not a git repository')) {
        throw new Error('Not in a git repository. Please run from within a git repository.')
      }
      if (error.message.includes('Author identity unknown')) {
        throw new Error('Git user not configured. Please set user.name and user.email with git config.')
      }
      
      throw new Error(`Failed to commit: ${error.message}`)
    }
  }
}

module.exports = { GitSmart }