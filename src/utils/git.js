const { execSync, spawnSync } = require('child_process')

class GitUtils {
  static isGitRepository() {
    try {
      execSync('git rev-parse --git-dir', { stdio: 'ignore' })
      return true
    } catch {
      return false
    }
  }

  static hasStagedChanges() {
    try {
      const output = execSync('git diff --cached --name-only', { encoding: 'utf8' })
      return output.trim().length > 0
    } catch {
      return false
    }
  }

  static getStagedDiff() {
    try {
      return execSync('git diff --cached', { encoding: 'utf8' })
    } catch (error) {
      throw new Error('Failed to get staged changes: ' + error.message)
    }
  }

  static getStagedFiles() {
    try {
      const output = execSync('git diff --cached --name-status', { encoding: 'utf8' })
      return output.trim().split('\n')
        .filter(line => line.trim())
        .map(line => {
          const [status, ...pathParts] = line.split('\t')
          return {
            status: status.trim(),
            path: pathParts.join('\t').trim()
          }
        })
    } catch (error) {
      throw new Error('Failed to get staged files: ' + error.message)
    }
  }

  static getRecentCommits(limit = 50) {
    try {
      const output = execSync(`git log --oneline -${limit}`, { encoding: 'utf8' })
      return output.trim().split('\n')
        .filter(line => line.trim())
        .map(line => {
          const spaceIndex = line.indexOf(' ')
          return {
            hash: line.substring(0, spaceIndex),
            message: line.substring(spaceIndex + 1)
          }
        })
    } catch {
      return []
    }
  }

  static commit(message) {
    // Input validation
    if (!message || typeof message !== 'string') {
      throw new Error('Commit message must be a non-empty string')
    }
    
    // Sanitize message length (git has practical limits)
    if (message.length > 72 * 50) { // ~50 lines of 72 chars
      throw new Error('Commit message too long (max 3600 characters)')
    }
    
    try {
      // Use spawnSync with argument array to prevent command injection
      const result = spawnSync('git', ['commit', '-m', message], { 
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'pipe']
      })
      
      if (result.error) {
        throw new Error('Git command failed: ' + result.error.message)
      }
      
      if (result.status !== 0) {
        throw new Error('Git commit failed: ' + (result.stderr || 'Unknown error'))
      }
      
      return true
    } catch (error) {
      throw new Error('Failed to commit: ' + error.message)
    }
  }

  static getDiffStats() {
    try {
      const output = execSync('git diff --cached --stat', { encoding: 'utf8' })
      const lines = output.trim().split('\n')
      const statsLine = lines[lines.length - 1]
      if (statsLine && statsLine.includes('changed')) {
        const matches = statsLine.match(/(\d+) files? changed(?:, (\d+) insertions?\(\+\))?(?:, (\d+) deletions?\(-\))?/)
        if (matches) {
          return {
            files: parseInt(matches[1]) || 0,
            insertions: parseInt(matches[2]) || 0,
            deletions: parseInt(matches[3]) || 0
          }
        }
      }
      return { files: 0, insertions: 0, deletions: 0 }
    } catch {
      return { files: 0, insertions: 0, deletions: 0 }
    }
  }
}

module.exports = { GitUtils }