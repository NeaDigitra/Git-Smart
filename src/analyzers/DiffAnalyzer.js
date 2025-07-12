class DiffAnalyzer {
  constructor() {
    this.fileTypeMap = {
      '.js': 'JavaScript',
      '.ts': 'TypeScript', 
      '.jsx': 'React',
      '.tsx': 'React TypeScript',
      '.py': 'Python',
      '.java': 'Java',
      '.css': 'CSS',
      '.scss': 'SCSS',
      '.html': 'HTML',
      '.md': 'Markdown',
      '.json': 'JSON',
      '.xml': 'XML',
      '.sql': 'SQL',
      '.sh': 'Shell Script',
      '.yml': 'YAML',
      '.yaml': 'YAML'
    }

    this.patterns = {
      newFunction: /^\+.*(?:function|def|const|let|var)\s+(\w+)/gm,
      newClass: /^\+.*(?:class|interface)\s+(\w+)/gm,
      newComponent: /^\+.*(?:function|const)\s+(\w+).*(?:jsx|tsx)/gm,
      imports: /^\+.*(?:import|require|from)/gm,
      exports: /^\+.*(?:export|module\.exports)/gm,
      apiCall: /^\+.*(?:fetch|axios|api|http)/gm,
      database: /^\+.*(?:sql|query|database|db\.|collection)/gm,
      test: /^\+.*(?:test|spec|describe|it\(|expect)/gm,
      bugFix: /(?:fix|bug|error|issue|resolve)/gi,
      performance: /(?:optimize|performance|speed|cache|async)/gi,
      security: /(?:auth|security|token|password|encrypt)/gi,
      refactor: /(?:refactor|restructure|reorganize|move|rename)/gi
    }
  }

  analyze(diff, stagedFiles) {
    const analysis = {
      fileChanges: this.analyzeFileChanges(stagedFiles),
      codeChanges: this.analyzeCodeChanges(diff),
      changeType: null,
      confidence: 0,
      keywords: [],
      summary: ''
    }
    analysis.changeType = this.determineChangeType(analysis)
    analysis.confidence = this.calculateConfidence(analysis)
    analysis.summary = this.generateSummary(analysis)
    return analysis
  }

  analyzeFileChanges(stagedFiles) {
    const changes = {
      added: [],
      modified: [],
      deleted: [],
      renamed: [],
      fileTypes: new Set(),
      categories: new Set()
    }
    stagedFiles.forEach(file => {
      const extension = this.getFileExtension(file.path)
      const category = this.categorizeFile(file.path)
      changes.fileTypes.add(this.fileTypeMap[extension] || extension)
      changes.categories.add(category)
      switch (file.status) {
        case 'A':
          changes.added.push(file.path)
          break
        case 'M':
          changes.modified.push(file.path)
          break
        case 'D':
          changes.deleted.push(file.path)
          break
        case 'R':
          changes.renamed.push(file.path)
          break
      }
    })
    return changes
  }

  analyzeCodeChanges(diff) {
    const changes = {
      newFunctions: this.extractMatches(diff, this.patterns.newFunction),
      newClasses: this.extractMatches(diff, this.patterns.newClass),
      imports: this.countMatches(diff, this.patterns.imports),
      exports: this.countMatches(diff, this.patterns.exports),
      apiCalls: this.countMatches(diff, this.patterns.apiCall),
      database: this.countMatches(diff, this.patterns.database),
      tests: this.countMatches(diff, this.patterns.test),
      keywords: this.extractKeywords(diff)
    }
    return changes
  }

  determineChangeType(analysis) {
    const { fileChanges, codeChanges } = analysis
    const allPaths = [...fileChanges.added, ...fileChanges.modified]
    // Security fixes (highest priority)
    if (codeChanges.keywords.some(k => /security|vulnerability|exploit|auth|encrypt|password/i.test(k))) {
      return 'security'
    }
    // Hotfixes
    if (codeChanges.keywords.some(k => /hotfix|critical|urgent|emergency/i.test(k))) {
      return 'hotfix'
    }
    // Build system changes
    if (allPaths.some(p => /webpack|babel|rollup|vite|package\.json|tsconfig|build/i.test(p))) {
      return 'build'
    }
    // CI/CD changes
    if (allPaths.some(p => /\.github|gitlab-ci|jenkins|workflow|pipeline|docker/i.test(p))) {
      return 'ci'
    }
    // Dependencies
    if (allPaths.some(p => /package\.json|yarn\.lock|package-lock\.json|requirements\.txt|pom\.xml/i.test(p))) {
      return 'deps'
    }
    // Test files
    if (fileChanges.categories.has('test') || codeChanges.tests > 0) {
      return 'test'
    }
    // Documentation
    if (fileChanges.categories.has('docs')) {
      return 'docs'
    }
    // Style only changes
    if (fileChanges.fileTypes.has('CSS') || fileChanges.fileTypes.has('SCSS') || 
        allPaths.every(p => /\.(css|scss|sass|less|styl)$/i.test(p))) {
      return 'style'
    }
    // Performance improvements
    if (codeChanges.keywords.some(k => /optimize|performance|speed|cache|memory|async/i.test(k))) {
      return 'perf'
    }
    // Bug fixes
    if (codeChanges.keywords.some(k => /fix|bug|error|issue|resolve|patch/i.test(k))) {
      return 'fix'
    }
    // Refactoring
    if (codeChanges.keywords.some(k => /refactor|move|rename|restructure|reorganize/i.test(k)) || 
        fileChanges.renamed.length > 0) {
      return 'refactor'
    }
    // Reverts
    if (codeChanges.keywords.some(k => /revert|undo|rollback/i.test(k))) {
      return 'revert'
    }
    // Work in progress
    if (codeChanges.keywords.some(k => /wip|work.*progress|todo|fixme/i.test(k))) {
      return 'wip'
    }
    // New files with functions/classes (features)
    if (fileChanges.added.length > 0 && (codeChanges.newFunctions.length > 0 || codeChanges.newClasses.length > 0)) {
      return 'feat'
    }
    // New functionality in existing files
    if (codeChanges.newFunctions.length > 0 || codeChanges.newClasses.length > 0) {
      return 'feat'
    }
    // Configuration changes
    if (fileChanges.categories.has('config')) {
      return 'chore'
    }
    // Initial commit
    if (fileChanges.added.length > 5 && fileChanges.modified.length === 0) {
      return 'init'
    }
    // Default based on change patterns
    if (fileChanges.added.length > fileChanges.modified.length) {
      return 'feat'
    }
    return fileChanges.modified.length > 0 ? 'feat' : 'chore'
  }

  calculateConfidence(analysis) {
    let confidence = 50; // Base confidence
    // High confidence indicators
    if (analysis.fileChanges.categories.has('test')) confidence += 30
    if (analysis.fileChanges.categories.has('docs')) confidence += 30
    if (analysis.codeChanges.newFunctions.length > 0) confidence += 20
    if (analysis.codeChanges.keywords.length > 2) confidence += 15
    // Lower confidence for mixed changes
    if (analysis.fileChanges.categories.size > 3) confidence -= 20
    if (analysis.fileChanges.added.length + analysis.fileChanges.modified.length > 10) confidence -= 15
    return Math.min(Math.max(confidence, 10), 90)
  }

  generateSummary(analysis) {
    const { fileChanges, codeChanges } = analysis
    const parts = []
    if (fileChanges.added.length > 0) {
      parts.push(`${fileChanges.added.length} new file${fileChanges.added.length > 1 ? 's' : ''}`)
    }
    if (fileChanges.modified.length > 0) {
      parts.push(`${fileChanges.modified.length} modified`)
    }
    if (codeChanges.newFunctions.length > 0) {
      parts.push(`${codeChanges.newFunctions.length} new function${codeChanges.newFunctions.length > 1 ? 's' : ''}`)
    }
    return parts.join(', ') || 'Code changes detected'
  }

  // Helper methods
  getFileExtension(filePath) {
    const lastDot = filePath.lastIndexOf('.')
    return lastDot === -1 ? '' : filePath.substring(lastDot)
  }

  categorizeFile(filePath) {
    const lowerPath = filePath.toLowerCase()
    // Test files
    if (lowerPath.includes('test') || lowerPath.includes('spec') || lowerPath.includes('__tests__')) return 'test'
    // Documentation
    if (lowerPath.includes('doc') || lowerPath.includes('readme') || lowerPath.match(/\.(md|rst|txt)$/)) return 'docs'
    // Configuration
    if (lowerPath.includes('config') || lowerPath.includes('package.json') || 
        lowerPath.match(/\.(json|yaml|yml|toml|ini|env)$/)) return 'config'
    // Build & CI
    if (lowerPath.includes('webpack') || lowerPath.includes('babel') || 
        lowerPath.includes('.github') || lowerPath.includes('dockerfile')) return 'build'
    // Styles
    if (lowerPath.match(/\.(css|scss|sass|less|styl)$/)) return 'style'
    // UI Components
    if (lowerPath.includes('component') || lowerPath.includes('ui') || 
        lowerPath.includes('view') || lowerPath.includes('page')) return 'ui'
    // API & Services
    if (lowerPath.includes('api') || lowerPath.includes('service') || 
        lowerPath.includes('controller') || lowerPath.includes('route')) return 'api'
    // Database
    if (lowerPath.includes('migration') || lowerPath.includes('schema') || 
        lowerPath.includes('model') || lowerPath.match(/\.(sql|db)$/)) return 'database'
    // Security & Auth
    if (lowerPath.includes('auth') || lowerPath.includes('security') || 
        lowerPath.includes('permission') || lowerPath.includes('role')) return 'security'
    // Utils & Helpers
    if (lowerPath.includes('util') || lowerPath.includes('helper') || 
        lowerPath.includes('lib') || lowerPath.includes('common')) return 'utils'
    return 'code'
  }

  extractMatches(text, pattern) {
    const matches = []
    let match
    while ((match = pattern.exec(text)) !== null) {
      matches.push(match[1])
    }
    return matches
  }

  countMatches(text, pattern) {
    return (text.match(pattern) || []).length
  }

  extractKeywords(diff) {
    const keywords = new Set()
    const lines = diff.split('\n').filter(line => line.startsWith('+') || line.startsWith('-'))
    lines.forEach(line => {
      Object.values(this.patterns).forEach(pattern => {
        if (typeof pattern === 'object' && pattern.test) {
          const matches = line.match(pattern)
          if (matches) {
            matches.forEach(match => keywords.add(match.toLowerCase()))
          }
        }
      })
    })
    return Array.from(keywords)
  }
}

module.exports = { DiffAnalyzer }