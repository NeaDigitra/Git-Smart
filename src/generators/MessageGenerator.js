class MessageGenerator {
  constructor() {
    this.templates = {
      // Core types
      feat: [
        'add {description}',
        'implement {description}',
        'introduce {description}',
        'create {description}'
      ],
      fix: [
        'fix {description}',
        'resolve {description}',
        'correct {description}',
        'address {description}'
      ],
      refactor: [
        'refactor {description}',
        'restructure {description}',
        'reorganize {description}',
        'improve {description}'
      ],
      docs: [
        'update documentation',
        'add documentation for {description}',
        'improve docs',
        'document {description}'
      ],
      test: [
        'add tests for {description}',
        'improve test coverage',
        'add {description} tests',
        'update test suite'
      ],
      style: [
        'improve code style',
        'format code',
        'update styling for {description}',
        'apply style changes'
      ],
      chore: [
        'update {description}',
        'maintain {description}',
        'update dependencies',
        'configure {description}'
      ],
      perf: [
        'optimize {description}',
        'improve performance of {description}',
        'enhance {description} speed',
        'optimize code'
      ],
      // Additional types
      build: [
        'update build system',
        'configure build for {description}',
        'improve build process',
        'fix build configuration'
      ],
      ci: [
        'update CI pipeline',
        'configure CI for {description}',
        'improve continuous integration',
        'fix CI workflow'
      ],
      revert: [
        'revert {description}',
        'undo {description}',
        'rollback {description}',
        'restore previous {description}'
      ],
      security: [
        'fix security issue in {description}',
        'improve security for {description}',
        'patch security vulnerability',
        'enhance security measures'
      ],
      deps: [
        'update dependencies',
        'upgrade {description}',
        'add dependency for {description}',
        'remove unused dependencies'
      ],
      release: [
        'prepare release {description}',
        'bump version to {description}',
        'release {description}',
        'publish {description}'
      ],
      hotfix: [
        'hotfix {description}',
        'emergency fix for {description}',
        'critical fix for {description}',
        'urgent fix for {description}'
      ],
      wip: [
        'work in progress on {description}',
        'partial implementation of {description}',
        'ongoing work on {description}',
        'initial work on {description}'
      ],
      merge: [
        'merge {description}',
        'integrate {description}',
        'combine {description}',
        'merge branch {description}'
      ],
      init: [
        'initial commit',
        'initialize {description}',
        'setup {description}',
        'bootstrap {description}'
      ]
    }
    this.scopes = {
      // Core functionality
      api: 'api',
      ui: 'ui',
      auth: 'auth',
      database: 'database',
      db: 'database',
      config: 'config',
      test: 'test',
      tests: 'test',
      docs: 'docs',
      utils: 'utils',

      // Architecture patterns
      service: 'service',
      controller: 'controller',
      model: 'model',
      data: 'data',
      repository: 'data',
      // User management
      user: 'user',
      admin: 'admin',
      profile: 'user',
      account: 'user',
      // Frontend specific
      component: 'ui',
      view: 'ui',
      layout: 'ui',
      style: 'style',
      css: 'style',
      // Backend specific
      middleware: 'api',
      route: 'api',
      endpoint: 'api',
      handler: 'api',
      // DevOps & Build
      build: 'build',
      ci: 'ci',
      cd: 'ci',
      deploy: 'deploy',
      docker: 'config',
      k8s: 'config',
      kubernetes: 'config',
      // Data & Storage
      migration: 'database',
      schema: 'database',
      seed: 'database',
      query: 'database',
      cache: 'performance',
      // Security & Auth
      security: 'security',
      oauth: 'auth',
      jwt: 'auth',
      session: 'auth',
      permission: 'security',
      role: 'security',
      // Monitoring & Analytics
      logging: 'logging',
      log: 'logging',
      monitoring: 'monitoring',
      metrics: 'monitoring',
      analytics: 'analytics',
      // Business features
      payment: 'payment',
      billing: 'payment',
      order: 'order',
      cart: 'cart',
      product: 'product',
      // Communication
      email: 'notification',
      mail: 'notification',
      notification: 'notification',
      alert: 'notification',
      // Localization
      i18n: 'localization',
      locale: 'localization',
      translation: 'localization',
      // Performance
      performance: 'performance',
      perf: 'performance',
      optimize: 'performance',
      // General
      core: 'core',
      common: 'utils',
      lib: 'utils',
      helper: 'utils'
    }
  }

  generateMessages(analysis, styleGuide, options = {}) {
    // Input validation
    if (!analysis || typeof analysis !== 'object') {
      throw new Error('Analysis object is required')
    }
    if (!styleGuide || typeof styleGuide !== 'object') {
      throw new Error('Style guide object is required')
    }
    if (!analysis.changeType) {
      throw new Error('Analysis must include changeType')
    }
    
    const messages = []
    
    try {
      // Primary message based on analysis
      const primary = this.generatePrimaryMessage(analysis, styleGuide)
      
      if (!primary || typeof primary !== 'string' || primary.trim().length === 0) {
        throw new Error('Failed to generate primary commit message')
      }
      
      messages.push({ message: primary, confidence: analysis.confidence || 50, type: 'primary' })
      
      // Alternative messages
      if (options.includeAlternatives) {
        const alternatives = this.generateAlternatives(analysis, styleGuide)
        if (Array.isArray(alternatives)) {
          alternatives.forEach(alt => messages.push(alt))
        }
      }
      
      return messages
    } catch (error) {
      throw new Error(`Failed to generate commit messages: ${error.message}`)
    }
  }

  generatePrimaryMessage(analysis, styleGuide) {
    const { changeType, fileChanges, codeChanges } = analysis
    // Get description based on changes
    const description = this.generateDescription(analysis)
    // Get action (scope) based on changes
    const action = this.detectAction(fileChanges, codeChanges)
    // Use format: type(action): description
    let message = `${changeType}(${action}): ${description}`
    // Ensure lowercase start
    message = message.charAt(0).toLowerCase() + message.slice(1)
    // Apply style preferences
    return styleGuide.adaptMessageToStyle ?
      styleGuide.adaptMessageToStyle(message, styleGuide) :
      this.applyBasicStyle(message, styleGuide)
  }

  generateAlternatives(analysis, styleGuide) {
    const alternatives = []
    const { changeType } = analysis
    const templates = this.templates[changeType] || this.templates.feat
    const description = this.generateDescription(analysis)
    const action = this.detectAction(analysis.fileChanges, analysis.codeChanges)
    // Generate 2-3 alternatives using different templates
    for (let i = 1; i < Math.min(templates.length, 4); i++) {
      const altDescription = templates[i].replace('{description}', description)
      const message = `${changeType}(${action}): ${altDescription}`
      alternatives.push({
        message: this.applyBasicStyle(message, styleGuide),
        confidence: Math.max(analysis.confidence - (i * 10), 20),
        type: 'alternative'
      })
    }
    // Add a different change type as alternative if confidence is low
    if (analysis.confidence < 60) {
      const altType = this.getAlternativeChangeType(analysis)
      if (altType !== changeType) {
        const altTemplate = this.templates[altType][0]
        const altDescription = altTemplate.replace('{description}', description)
        const message = `${altType}(${action}): ${altDescription}`
        alternatives.push({
          message: this.applyBasicStyle(message, styleGuide),
          confidence: 40,
          type: 'alternative'
        })
      }
    }
    return alternatives
  }

  generateDescription(analysis) {
    const { fileChanges, codeChanges } = analysis
    // Function/class based description
    if (codeChanges.newFunctions.length > 0) {
      const funcNames = codeChanges.newFunctions.slice(0, 2)
      return funcNames.length === 1 ?
        `${funcNames[0]} function` :
        `${funcNames[0]} and other functions`
    }
    if (codeChanges.newClasses.length > 0) {
      return `${codeChanges.newClasses[0]} class`
    }
    // File based description
    if (fileChanges.added.length > 0) {
      const fileName = this.getReadableFileName(fileChanges.added[0])
      return fileChanges.added.length === 1 ?
        fileName :
        `${fileName} and ${fileChanges.added.length - 1} other files`
    }
    // Category based description
    const categories = Array.from(fileChanges.categories)
    if (categories.length === 1 && categories[0] !== 'code') {
      return this.getCategoryDescription(categories[0])
    }
    // File type based description
    const fileTypes = Array.from(fileChanges.fileTypes)
    if (fileTypes.length === 1) {
      return `${fileTypes[0]} code`
    }
    // Generic descriptions based on change patterns
    if (codeChanges.apiCalls > 0) return 'API integration'
    if (codeChanges.database > 0) return 'database functionality'
    if (codeChanges.imports > 2) return 'module dependencies'
    // Fallback descriptions
    if (fileChanges.modified.length > fileChanges.added.length) {
      return 'existing functionality'
    }
    return 'new functionality'
  }

  detectAction(fileChanges, codeChanges) {
    // Determine action based on what was actually done
    // File-based actions
    if (fileChanges.added.length > 0 && fileChanges.modified.length === 0) {
      return 'create'
    }
    if (fileChanges.deleted.length > 0) {
      return 'remove'
    }
    if (fileChanges.renamed.length > 0) {
      return 'refactor'
    }
    // Code-based actions
    if (codeChanges.newFunctions.length > 0 || codeChanges.newClasses.length > 0) {
      return 'implement'
    }
    if (codeChanges.tests > 0) {
      return 'test'
    }
    if (codeChanges.database > 0) {
      return 'database'
    }
    if (codeChanges.apiCalls > 0) {
      return 'api'
    }
    // Category-based actions
    const categories = Array.from(fileChanges.categories)
    if (categories.includes('test')) return 'test'
    if (categories.includes('docs')) return 'docs'
    if (categories.includes('config')) return 'config'
    if (categories.includes('ui')) return 'ui'
    if (categories.includes('api')) return 'api'
    if (categories.includes('utils')) return 'utils'
    if (categories.includes('style')) return 'style'
    if (categories.includes('build')) return 'build'
    if (categories.includes('ci')) return 'ci'
    if (categories.includes('security')) return 'security'
    // Path-based actions (comprehensive)
    const paths = [...fileChanges.added, ...fileChanges.modified]
    for (const path of paths) {
      // Authentication & Authorization
      if (path.includes('auth')) return 'auth'
      if (path.includes('login')) return 'auth'
      if (path.includes('oauth')) return 'auth'
      if (path.includes('jwt')) return 'auth'
      if (path.includes('session')) return 'auth'
      // User Management
      if (path.includes('user')) return 'user'
      if (path.includes('profile')) return 'user'
      if (path.includes('account')) return 'user'
      // Admin & Management
      if (path.includes('admin')) return 'admin'
      if (path.includes('dashboard')) return 'admin'
      if (path.includes('management')) return 'admin'
      // UI & Frontend
      if (path.includes('component')) return 'ui'
      if (path.includes('view')) return 'ui'
      if (path.includes('template')) return 'ui'
      if (path.includes('layout')) return 'ui'
      if (path.includes('page')) return 'ui'
      if (path.includes('form')) return 'ui'
      if (path.includes('modal')) return 'ui'
      if (path.includes('button')) return 'ui'

      // Backend Architecture
      if (path.includes('service')) return 'service'
      if (path.includes('controller')) return 'controller'
      if (path.includes('model')) return 'model'
      if (path.includes('repository')) return 'data'
      if (path.includes('entity')) return 'model'
      if (path.includes('dto')) return 'model'

      // API & Routes
      if (path.includes('route')) return 'api'
      if (path.includes('endpoint')) return 'api'
      if (path.includes('middleware')) return 'api'
      if (path.includes('handler')) return 'api'

      // Database
      if (path.includes('migration')) return 'database'
      if (path.includes('schema')) return 'database'
      if (path.includes('seed')) return 'database'
      if (path.includes('query')) return 'database'
      if (path.includes('db')) return 'database'

      // Configuration
      if (path.includes('config')) return 'config'
      if (path.includes('setting')) return 'config'
      if (path.includes('env')) return 'config'
      if (path.includes('docker')) return 'config'
      if (path.includes('webpack')) return 'build'
      if (path.includes('babel')) return 'build'
      if (path.includes('tsconfig')) return 'config'

      // CI/CD & Build
      if (path.includes('github')) return 'ci'
      if (path.includes('gitlab')) return 'ci'
      if (path.includes('jenkins')) return 'ci'
      if (path.includes('workflow')) return 'ci'
      if (path.includes('pipeline')) return 'ci'
      if (path.includes('deploy')) return 'deploy'

      // Utils & Helpers
      if (path.includes('util')) return 'utils'
      if (path.includes('helper')) return 'utils'
      if (path.includes('lib')) return 'utils'
      if (path.includes('common')) return 'utils'

      // Monitoring & Logging
      if (path.includes('log')) return 'logging'
      if (path.includes('monitor')) return 'monitoring'
      if (path.includes('metric')) return 'monitoring'
      if (path.includes('analytics')) return 'analytics'

      // Security
      if (path.includes('security')) return 'security'
      if (path.includes('crypto')) return 'security'
      if (path.includes('encrypt')) return 'security'
      if (path.includes('permission')) return 'security'
      if (path.includes('role')) return 'security'

      // Performance
      if (path.includes('cache')) return 'performance'
      if (path.includes('optimize')) return 'performance'
      if (path.includes('perf')) return 'performance'

      // Testing
      if (path.includes('spec')) return 'test'
      if (path.includes('mock')) return 'test'
      if (path.includes('fixture')) return 'test'

      // Localization
      if (path.includes('i18n')) return 'localization'
      if (path.includes('locale')) return 'localization'
      if (path.includes('translation')) return 'localization'

      // Email & Notifications
      if (path.includes('email')) return 'notification'
      if (path.includes('mail')) return 'notification'
      if (path.includes('notification')) return 'notification'
      if (path.includes('alert')) return 'notification'

      // Payment & E-commerce
      if (path.includes('payment')) return 'payment'
      if (path.includes('billing')) return 'payment'
      if (path.includes('order')) return 'order'
      if (path.includes('cart')) return 'cart'
      if (path.includes('product')) return 'product'
    }

    // File extension based actions
    const extensions = [...fileChanges.added, ...fileChanges.modified]
      .map(path => path.split('.').pop())

    if (extensions.some(ext => ['css', 'scss', 'sass', 'less', 'styl'].includes(ext))) {
      return 'style'
    }
    if (extensions.some(ext => ['json', 'yaml', 'yml', 'toml', 'ini'].includes(ext))) {
      return 'config'
    }
    if (extensions.some(ext => ['md', 'rst', 'txt', 'doc'].includes(ext))) {
      return 'docs'
    }
    if (extensions.some(ext => ['sql', 'db'].includes(ext))) {
      return 'database'
    }
    // Default action based on change type
    if (fileChanges.modified.length > fileChanges.added.length) {
      return 'update'
    }
    return 'core'
  }

  getAlternativeChangeType(analysis) {
    const { fileChanges, codeChanges } = analysis
    // If primary wasn't feat, try feat
    if (analysis.changeType !== 'feat' &&
        (codeChanges.newFunctions.length > 0 || fileChanges.added.length > 0)) {
      return 'feat'
    }
    // If primary wasn't fix, try fix
    if (analysis.changeType !== 'fix' &&
        codeChanges.keywords.some(k => /fix|bug|error|resolve|patch/i.test(k))) {
      return 'fix'
    }
    // If primary wasn't refactor, try refactor
    if (analysis.changeType !== 'refactor' && fileChanges.modified.length > 2) {
      return 'refactor'
    }
    // Try security if security-related keywords found
    if (analysis.changeType !== 'security' &&
        codeChanges.keywords.some(k => /security|vulnerability|exploit|auth|encrypt/i.test(k))) {
      return 'security'
    }
    // Try perf if performance-related
    if (analysis.changeType !== 'perf' &&
        codeChanges.keywords.some(k => /performance|optimize|speed|cache|memory/i.test(k))) {
      return 'perf'
    }
    // Try build if build-related
    if (analysis.changeType !== 'build' &&
        fileChanges.added.concat(fileChanges.modified).some(f =>
          /webpack|babel|rollup|vite|package\.json|tsconfig|build/i.test(f))) {
      return 'build'
    }
    // Try ci if CI-related
    if (analysis.changeType !== 'ci' &&
        fileChanges.added.concat(fileChanges.modified).some(f =>
          /\.github|gitlab-ci|jenkins|workflow|pipeline/i.test(f))) {
      return 'ci'
    }
    return 'chore'
  }

  getReadableFileName(filePath) {
    const fileName = filePath.split('/').pop().split('.')[0]
    return fileName.replace(/[-_]/g, ' ').toLowerCase()
  }

  getCategoryDescription(category) {
    const descriptions = {
      // Core
      test: 'test coverage',
      docs: 'documentation',
      config: 'configuration',
      ui: 'user interface',
      api: 'API endpoints',
      utils: 'utility functions',
      core: 'core functionality',
      // Architecture
      service: 'service layer',
      controller: 'controller logic',
      model: 'data models',
      data: 'data layer',
      middleware: 'middleware logic',
      // User & Auth
      auth: 'authentication',
      user: 'user management',
      admin: 'admin functionality',
      security: 'security measures',

      // Frontend
      component: 'UI components',
      view: 'view templates',
      layout: 'page layouts',
      style: 'styling',

      // Backend
      database: 'database operations',
      migration: 'database migrations',
      schema: 'database schema',
      query: 'database queries',

      // DevOps
      build: 'build system',
      ci: 'CI/CD pipeline',
      deploy: 'deployment',
      docker: 'containerization',

      // Features
      payment: 'payment system',
      order: 'order management',
      cart: 'shopping cart',
      product: 'product catalog',
      notification: 'notifications',

      // Performance & Monitoring
      performance: 'performance optimization',
      monitoring: 'system monitoring',
      logging: 'logging system',
      analytics: 'analytics tracking',

      // Localization
      localization: 'internationalization',
      i18n: 'internationalization'
    }
    return descriptions[category] || category
  }

  applyBasicStyle(message, styleGuide) {
    let styled = message
    // Always lowercase for conventional commits
    styled = styled.charAt(0).toLowerCase() + styled.slice(1)
    // No periods for conventional commits
    if (styled.endsWith('.')) {
      styled = styled.slice(0, -1)
    }
    return styled
  }
}

module.exports = { MessageGenerator }