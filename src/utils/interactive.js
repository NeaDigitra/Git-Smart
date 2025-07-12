const readline = require('readline')

class InteractivePrompt {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
  }

  async askQuestion(question) {
    return new Promise((resolve) => {
      this.rl.question(question, (answer) => {
        resolve(answer.trim())
      })
    })
  }

  async selectFromOptions(options, prompt = 'Choose an option:') {
    console.log(`\n${prompt}`)
    options.forEach((option, index) => {
      console.log(`  ${index + 1}. ${option}`)
    })
    console.log(`  ${options.length + 1}. Edit custom message`)
    const answer = await this.askQuestion(`\nSelect (1-${options.length + 1}): `)
    const choice = parseInt(answer)
    
    if (choice >= 1 && choice <= options.length) {
      return { type: 'selected', index: choice - 1, value: options[choice - 1] }
    } else if (choice === options.length + 1) {
      return { type: 'custom' }
    } else {
      console.log('Invalid choice. Please try again.')
      return this.selectFromOptions(options, prompt)
    }
  }

  async confirmAction(message, defaultYes = true) {
    const suffix = defaultYes ? ' (Y/n)' : ' (y/N)'
    const answer = await this.askQuestion(`${message}${suffix}: `)
    if (answer === '') return defaultYes
    return answer.toLowerCase().startsWith('y')
  }

  async getCustomMessage(defaultMessage = '') {
    console.log('\nEnter your commit message:')
    if (defaultMessage) {
      console.log(`(Press Enter to use: "${defaultMessage}")`)
    }
    const message = await this.askQuestion('> ')
    return message || defaultMessage
  }

  displayAnalysis(analysis) {
    console.log('\n🔍 Analyzing changes...')
    const { fileChanges, codeChanges, changeType, confidence } = analysis
    // Files summary
    const fileSummary = []
    if (fileChanges.added.length > 0) fileSummary.push(`${fileChanges.added.length} added`)
    if (fileChanges.modified.length > 0) fileSummary.push(`${fileChanges.modified.length} modified`)
    if (fileChanges.deleted.length > 0) fileSummary.push(`${fileChanges.deleted.length} deleted`)
    console.log(`   • Files: ${fileSummary.join(', ')}`)
    // File types
    if (fileChanges.fileTypes.size > 0) {
      console.log(`   • Types: ${Array.from(fileChanges.fileTypes).join(', ')}`)
    }
    // Code changes
    if (codeChanges.newFunctions.length > 0) {
      console.log(`   • Functions: ${codeChanges.newFunctions.slice(0, 3).join(', ')}`)
    }
    if (codeChanges.newClasses.length > 0) {
      console.log(`   • Classes: ${codeChanges.newClasses.slice(0, 3).join(', ')}`)
    }
    // Change type and confidence
    console.log(`   • Type: ${changeType} (${confidence}% confidence)`)
    console.log(`   • Summary: ${analysis.summary}`)
  }

  displayMessages(messages) {
    console.log('\n💡 Suggested commit messages:')
    messages.forEach((msg, index) => {
      const confidenceIcon = msg.confidence > 70 ? '🎯' : msg.confidence > 50 ? '👍' : '🤔'
      console.log(`   ${index + 1}. ${msg.message} ${confidenceIcon} (${msg.confidence}%)`)
    })
  }

  displayError(error) {
    console.error(`\n❌ Error: ${error}`)
  }

  displaySuccess(message) {
    console.log(`\n✅ ${message}`)
  }

  displayWarning(message) {
    console.log(`\n⚠️  ${message}`)
  }

  displayInfo(message) {
    console.log(`\n💡 ${message}`)
  }

  close() {
    this.rl.close()
  }
}

// Simple prompts for non-interactive mode
class SimplePrompt {
  static async confirm(message, defaultYes = true) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    return new Promise((resolve) => {
      const suffix = defaultYes ? ' (Y/n)' : ' (y/N)'
      rl.question(`${message}${suffix}: `, (answer) => {
        rl.close()
        if (answer === '') resolve(defaultYes)
        else resolve(answer.toLowerCase().startsWith('y'))
      })
    })
  }

  static async input(message, defaultValue = '') {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    return new Promise((resolve) => {
      const prompt = defaultValue ? `${message} (${defaultValue}): ` : `${message}: `
      rl.question(prompt, (answer) => {
        rl.close()
        resolve(answer.trim() || defaultValue)
      })
    })
  }
}

module.exports = { InteractivePrompt, SimplePrompt }