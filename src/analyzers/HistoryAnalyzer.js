class HistoryAnalyzer {
  constructor() {
    this.commitPatterns = {
      conventional: /^(feat|fix|docs|style|refactor|test|chore|perf|build|ci|revert|security|deps|release|hotfix|wip|merge|init)(\(.+\))?: .+/,
      types: ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore', 'perf', 'build', 'ci', 'revert', 'security', 'deps', 'release', 'hotfix', 'wip', 'merge', 'init'],
      prefixes: /^(add|update|remove|fix|implement|create|delete|improve|optimize|refactor|build|deploy|configure|setup|init|merge|revert)/i
    }
    
    // v1.1.0: Enhanced pattern recognition
    this.vocabularyPatterns = {
      formal: ['implement', 'optimize', 'refactor', 'enhance', 'resolve', 'address', 'ensure', 'establish', 'configure', 'initialize'],
      casual: ['fix', 'add', 'update', 'change', 'make', 'get', 'do', 'put', 'set', 'clean'],
      technical: ['api', 'database', 'auth', 'config', 'service', 'component', 'module', 'function', 'class', 'method'],
      business: ['user', 'customer', 'order', 'payment', 'product', 'feature', 'workflow', 'process', 'report', 'dashboard']
    }
    
    this.scopePatterns = {
      frontend: ['ui', 'component', 'view', 'page', 'form', 'modal', 'button', 'input', 'layout'],
      backend: ['api', 'service', 'controller', 'model', 'database', 'auth', 'middleware', 'route'],
      devops: ['ci', 'cd', 'deploy', 'build', 'docker', 'k8s', 'config', 'env', 'scripts'],
      testing: ['test', 'spec', 'mock', 'fixture', 'coverage', 'e2e', 'unit', 'integration']
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
      tone: this.detectTone(commits),
      // v1.1.0: Enhanced analysis
      vocabularyProfile: this.analyzeVocabulary(commits),
      scopePreferences: this.analyzeScopePreferences(commits),
      typeFrequency: this.analyzeTypeFrequency(commits),
      confidenceFactors: this.calculateConfidenceFactors(commits)
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

  // v1.1.0: New enhanced analysis methods
  analyzeVocabulary(commits) {
    const vocabulary = {
      formal: 0,
      casual: 0,
      technical: 0,
      business: 0,
      dominantWords: new Map()
    }

    commits.forEach(commit => {
      const message = commit.message.toLowerCase()
      const words = message.split(/\s+/)
      
      words.forEach(word => {
        // Track word frequency
        vocabulary.dominantWords.set(word, (vocabulary.dominantWords.get(word) || 0) + 1)
        
        // Categorize vocabulary
        if (this.vocabularyPatterns.formal.some(pattern => message.includes(pattern))) {
          vocabulary.formal++
        }
        if (this.vocabularyPatterns.casual.some(pattern => message.includes(pattern))) {
          vocabulary.casual++
        }
        if (this.vocabularyPatterns.technical.some(pattern => message.includes(pattern))) {
          vocabulary.technical++
        }
        if (this.vocabularyPatterns.business.some(pattern => message.includes(pattern))) {
          vocabulary.business++
        }
      })
    })

    // Convert to percentages and get top words
    const total = commits.length
    return {
      formal: vocabulary.formal / total,
      casual: vocabulary.casual / total,
      technical: vocabulary.technical / total,
      business: vocabulary.business / total,
      topWords: Array.from(vocabulary.dominantWords.entries())
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
        .map(([word, count]) => ({ word, count, frequency: count / total }))
    }
  }

  analyzeScopePreferences(commits) {
    const scopes = new Map()
    const categories = {
      frontend: 0,
      backend: 0,
      devops: 0,
      testing: 0
    }

    commits.forEach(commit => {
      const message = commit.message
      // Extract scope from conventional commits
      const scopeMatch = message.match(/\(([^)]+)\)/)
      if (scopeMatch) {
        const scope = scopeMatch[1]
        scopes.set(scope, (scopes.get(scope) || 0) + 1)
        
        // Categorize scope
        const scopeLower = scope.toLowerCase()
        Object.entries(this.scopePatterns).forEach(([category, patterns]) => {
          if (patterns.some(pattern => scopeLower.includes(pattern))) {
            categories[category]++
          }
        })
      }
    })

    const total = commits.length
    return {
      categories: Object.entries(categories).reduce((acc, [key, count]) => {
        acc[key] = count / total
        return acc
      }, {}),
      topScopes: Array.from(scopes.entries())
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
        .map(([scope, count]) => ({ scope, count, frequency: count / total }))
    }
  }

  analyzeTypeFrequency(commits) {
    const types = new Map()
    
    commits.forEach(commit => {
      const message = commit.message
      // Extract type from conventional commits
      const typeMatch = message.match(/^([a-z]+)/)
      if (typeMatch && this.commitPatterns.types.includes(typeMatch[1])) {
        const type = typeMatch[1]
        types.set(type, (types.get(type) || 0) + 1)
      }
    })

    const total = commits.length
    return Array.from(types.entries())
      .sort(([,a], [,b]) => b - a)
      .map(([type, count]) => ({ type, count, frequency: count / total }))
  }

  calculateConfidenceFactors(commits) {
    const factors = {
      consistency: 0,
      conventionalAdherence: 0,
      scopeUsage: 0,
      messageQuality: 0
    }

    if (commits.length === 0) return factors

    // Consistency: How similar are the commit styles
    const styles = commits.map(commit => this.categorizeCommitStyle(commit.message))
    const mostCommonStyle = this.getMostFrequent(styles)
    factors.consistency = styles.filter(s => s === mostCommonStyle).length / commits.length

    // Conventional adherence
    const conventionalCommits = commits.filter(commit => 
      this.commitPatterns.conventional.test(commit.message)
    )
    factors.conventionalAdherence = conventionalCommits.length / commits.length

    // Scope usage
    const scopedCommits = commits.filter(commit => /\(.+\)/.test(commit.message))
    factors.scopeUsage = scopedCommits.length / commits.length

    // Message quality (length and descriptiveness)
    const qualityScores = commits.map(commit => {
      const message = commit.message
      const length = message.length
      const hasDescription = message.split(':')[1]?.trim().length > 5
      return (length >= 20 && length <= 72 && hasDescription) ? 1 : 0
    })
    factors.messageQuality = qualityScores.reduce((sum, score) => sum + score, 0) / commits.length

    return factors
  }

  categorizeCommitStyle(message) {
    if (this.commitPatterns.conventional.test(message)) return 'conventional'
    if (this.commitPatterns.prefixes.test(message)) return 'imperative'
    return 'descriptive'
  }

  getMostFrequent(array) {
    const frequency = {}
    array.forEach(item => frequency[item] = (frequency[item] || 0) + 1)
    return Object.keys(frequency).reduce((a, b) => frequency[a] > frequency[b] ? a : b)
  }

  // v1.1.0: Enhanced style guide generation with new analysis
  generateEnhancedStyleGuide(history) {
    const baseGuide = this.generateStyleGuide(history)
    
    return {
      ...baseGuide,
      // Enhanced preferences based on vocabulary analysis
      vocabularyStyle: this.getVocabularyStyle(history.vocabularyProfile),
      preferredScopes: history.scopePreferences?.topScopes?.slice(0, 5) || [],
      mostUsedTypes: history.typeFrequency?.slice(0, 5) || [],
      confidenceScore: this.calculateOverallConfidence(history.confidenceFactors),
      recommendations: this.generateRecommendations(history)
    }
  }

  getVocabularyStyle(vocabularyProfile) {
    if (!vocabularyProfile) return 'balanced'
    
    const { formal, casual, technical, business } = vocabularyProfile
    const max = Math.max(formal, casual, technical, business)
    
    if (formal === max) return 'formal'
    if (casual === max) return 'casual'
    if (technical === max) return 'technical'
    if (business === max) return 'business'
    return 'balanced'
  }

  calculateOverallConfidence(factors) {
    if (!factors) return 0.5
    
    const weights = {
      consistency: 0.3,
      conventionalAdherence: 0.3,
      scopeUsage: 0.2,
      messageQuality: 0.2
    }
    
    return Object.entries(weights).reduce((score, [factor, weight]) => {
      return score + (factors[factor] || 0) * weight
    }, 0)
  }

  generateRecommendations(history) {
    const recommendations = []
    const factors = history.confidenceFactors || {}
    
    if (factors.consistency < 0.7) {
      recommendations.push('Consider standardizing commit message format across the team')
    }
    
    if (factors.conventionalAdherence < 0.5) {
      recommendations.push('Adopt conventional commit format for better tooling integration')
    }
    
    if (factors.scopeUsage < 0.3) {
      recommendations.push('Use scopes to better categorize changes (e.g., feat(auth): ...)')
    }
    
    if (factors.messageQuality < 0.6) {
      recommendations.push('Write more descriptive commit messages (20-72 characters)')
    }
    
    return recommendations
  }
}

module.exports = { HistoryAnalyzer }