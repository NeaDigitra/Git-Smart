const { execSync } = require('child_process')

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
    try {
      execSync(`git commit -m "${message.replace(/"/g, '\\"')}"`, { encoding: 'utf8' })
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