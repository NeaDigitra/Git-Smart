class HistoryAnalyzer {
  constructor() {
    this.commitPatterns = {
      conventional: /^(feat|fix|docs|style|refactor|test|chore|perf|build|ci|revert|security|deps|release|hotfix|wip|merge|init)(\(.+\))?: .+/,
      types: ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore', 'perf', 'build', 'ci', 'revert', 'security', 'deps', 'release', 'hotfix', 'wip', 'merge', 'init'],
      prefixes: /^(add|update|remove|fix|implement|create|delete|improve|optimize|refactor|build|deploy|configure|setup|init|merge|revert)/i
    }
  }

  analyzeCommitHistory(commits) {
    if (!(commits) || commits.length === 0) {
      return this.getDefaultStyle()
    }
    const analysis = {
      style: this.detectCommitStyle(commits),
      commonPrefixes: this.extractCommonPrefixes(commits),
      averageLength: this.calculateAverageLength(commits),
      patterns: this.identifyPatterns(commits),
      tone: this.detectTone(commits)
    }
    return analysis
  }

  detectCommitStyle(commits) {
    let conventionalCount = 0
    let simpleCount = 0
    let imperativeCount = 0
    commits.forEach(commit => {
      const message = commit.message
      // Check for conventional commits
      if (this.commitPatterns.conventional.test(message)) {
        conventionalCount++
      }
      // Check for imperative mood
      else if (this.commitPatterns.prefixes.test(message)) {
        imperativeCount++
      }
      // Simple descriptive
      else {
        simpleCount++
      }
    })
    const total = commits.length
    if (conventionalCount / total > 0.6) return 'conventional'
    if (imperativeCount / total > 0.5) return 'imperative'
    return 'descriptive'
  }

  extractCommonPrefixes(commits) {
    const prefixes = {}
    commits.forEach(commit => {
      const message = commit.message.toLowerCase()
      const words = message.split(' ')
      const firstWord = words[0]
      if (firstWord && firstWord.length > 2) {
        prefixes[firstWord] = (prefixes[firstWord] || 0) + 1
      }
    })
    return Object.entries(prefixes)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([word, count]) => ({ word, count, frequency: count / commits.length }))
  }

  calculateAverageLength(commits) {
    const totalLength = commits.reduce((sum, commit) => sum + commit.message.length, 0)
    return Math.round(totalLength / commits.length)
  }

  identifyPatterns(commits) {
    const patterns = {
      hasScope: 0,
      hasEmoji: 0,
      hasTicketNumber: 0,
      startsWithCapital: 0,
      endsWithPeriod: 0
    }

    commits.forEach(commit => {
      const message = commit.message
      if (/\(.+\)/.test(message)) patterns.hasScope++
      if (/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]/u.test(message)) patterns.hasEmoji++
      if (/#\d+|[A-Z]+-\d+/.test(message)) patterns.hasTicketNumber++
      if (/^[A-Z]/.test(message)) patterns.startsWithCapital++
      if (/\.$/.test(message)) patterns.endsWithPeriod++
    })
    const total = commits.length
    return Object.entries(patterns).reduce((acc, [key, count]) => {
      acc[key] = count / total
      return acc
    }, {})
  }

  detectTone(commits) {
    let formalCount = 0
    let casualCount = 0
    const formalIndicators = /\b(implement|optimize|refactor|enhance|resolve|address|ensure)\b/i
    const casualIndicators = /\b(fix|add|update|change|make|get|do)\b/i
    commits.forEach(commit => {
      if (formalIndicators.test(commit.message)) formalCount++
      if (casualIndicators.test(commit.message)) casualCount++
    })
    return formalCount > casualCount ? 'formal' : 'casual'
  }

  generateStyleGuide(history) {
    return {
      useConventional: history.style === 'conventional',
      preferredPrefix: history.commonPrefixes[0]?.word || 'add',
      targetLength: Math.min(Math.max(history.averageLength, 30), 72),
      includeScope: history.patterns.hasScope > 0.3,
      useCapitalization: history.patterns.startsWithCapital > 0.7,
      usePeriod: history.patterns.endsWithPeriod > 0.5,
      tone: history.tone
    }
  }

  getDefaultStyle() {
    return {
      style: 'conventional',
      commonPrefixes: [{ word: 'feat', count: 1, frequency: 1 }],
      averageLength: 50,
      patterns: {
        hasScope: 0.2,
        hasEmoji: 0,
        hasTicketNumber: 0,
        startsWithCapital: 0.8,
        endsWithPeriod: 0
      },
      tone: 'casual'
    }
  }

  adaptMessageToStyle(message, styleGuide) {
    let adaptedMessage = message
    // Apply capitalization
    if (styleGuide.useCapitalization && adaptedMessage.length > 0) {
      adaptedMessage = adaptedMessage.charAt(0).toUpperCase() + adaptedMessage.slice(1)
    } else {
      adaptedMessage = adaptedMessage.charAt(0).toLowerCase() + adaptedMessage.slice(1)
    }
    // Apply period
    if (styleGuide.usePeriod && !adaptedMessage.endsWith('.')) {
      adaptedMessage += '.'
    } else if (!(styleGuide.usePeriod) && adaptedMessage.endsWith('.')) {
      adaptedMessage = adaptedMessage.slice(0, -1)
    }
    // Adjust tone
    if (styleGuide.tone === 'formal') {
      adaptedMessage = this.makeFormal(adaptedMessage)
    }
    // Trim to target length
    if (adaptedMessage.length > styleGuide.targetLength) {
      adaptedMessage = adaptedMessage.substring(0, styleGuide.targetLength - 3) + '...'
    }
    return adaptedMessage
  }

  makeFormal(message) {
    const replacements = {
      'fix': 'resolve',
      'add': 'implement',
      'update': 'enhance',
      'change': 'modify',
      'make': 'create',
      'get': 'retrieve'
    }
    let formalMessage = message
    Object.entries(replacements).forEach(([casual, formal]) => {
      const regex = new RegExp(`\\b${casual}\\b`, 'gi')
      formalMessage = formalMessage.replace(regex, formal)
    })
    return formalMessage
  }
}

module.exports = { HistoryAnalyzer }