require('../test-framework')
const { GitUtils } = require('../../src/utils/git')

describe('GitUtils', () => {
  let execSyncMock

  // Mock exec results
  const mockDiffOutput = `M\tsrc/auth.js
A\tsrc/utils.js
D\told-file.js`

  const mockDiffCached = `diff --git a/src/auth.js b/src/auth.js
index 1234567..abcdefg 100644
--- a/src/auth.js
+++ b/src/auth.js
@@ -1,3 +1,6 @@
 function login(user) {
+  if (!user.email) {
+    throw new Error('Email required')
+  }
   return authenticate(user)
 }`

  const mockCommitHistory = `abc123 feat: add authentication
def456 fix: resolve login bug
ghi789 docs: update README`

  const mockStatsOutput = `2 files changed, 5 insertions(+), 1 deletion(-)`

  beforeEach(() => {
    // Reset mocks before each test
    if (execSyncMock) {
      execSyncMock.restore()
    }
  })

  afterEach(() => {
    if (execSyncMock) {
      execSyncMock.restore()
    }
  })

  describe('isGitRepository', () => {
    test('should return true when in git repository', () => {
      execSyncMock = MockHelper.mockExecSync('', false)
      
      const result = GitUtils.isGitRepository()
      
      expect(result).toBe(true)
    })

    test('should return false when not in git repository', () => {
      execSyncMock = MockHelper.mockExecSync('', true)
      
      const result = GitUtils.isGitRepository()
      
      expect(result).toBe(false)
    })
  })

  describe('hasStagedChanges', () => {
    test('should return true when files are staged', () => {
      execSyncMock = MockHelper.mockExecSync('src/auth.js\nsrc/utils.js')
      
      const result = GitUtils.hasStagedChanges()
      
      expect(result).toBe(true)
    })

    test('should return false when no files are staged', () => {
      execSyncMock = MockHelper.mockExecSync('')
      
      const result = GitUtils.hasStagedChanges()
      
      expect(result).toBe(false)
    })

    test('should return false on git command error', () => {
      execSyncMock = MockHelper.mockExecSync('', true)
      
      const result = GitUtils.hasStagedChanges()
      
      expect(result).toBe(false)
    })
  })

  describe('getStagedDiff', () => {
    test('should return diff content for staged files', () => {
      execSyncMock = MockHelper.mockExecSync(mockDiffCached)
      
      const result = GitUtils.getStagedDiff()
      
      expect(result).toContain('diff --git')
      expect(result).toContain('src/auth.js')
      expect(result).toContain('Email required')
    })

    test('should throw error when git command fails', () => {
      execSyncMock = MockHelper.mockExecSync('', true)
      
      expect(() => GitUtils.getStagedDiff()).toThrow('Failed to get staged changes')
    })
  })

  describe('getStagedFiles', () => {
    test('should parse file status correctly', () => {
      execSyncMock = MockHelper.mockExecSync(mockDiffOutput)
      
      const result = GitUtils.getStagedFiles()
      
      expect(result).toHaveLength(3)
      expect(result[0]).toEqual({ status: 'M', path: 'src/auth.js' })
      expect(result[1]).toEqual({ status: 'A', path: 'src/utils.js' })
      expect(result[2]).toEqual({ status: 'D', path: 'old-file.js' })
    })

    test('should handle empty output', () => {
      execSyncMock = MockHelper.mockExecSync('')
      
      const result = GitUtils.getStagedFiles()
      
      expect(result).toHaveLength(0)
    })

    test('should throw error on command failure', () => {
      execSyncMock = MockHelper.mockExecSync('', true)
      
      expect(() => GitUtils.getStagedFiles()).toThrow('Failed to get staged files')
    })
  })

  describe('getRecentCommits', () => {
    test('should parse commit history correctly', () => {
      execSyncMock = MockHelper.mockExecSync(mockCommitHistory)
      
      const result = GitUtils.getRecentCommits(3)
      
      expect(result).toHaveLength(3)
      expect(result[0]).toEqual({ hash: 'abc123', message: 'feat: add authentication' })
      expect(result[1]).toEqual({ hash: 'def456', message: 'fix: resolve login bug' })
      expect(result[2]).toEqual({ hash: 'ghi789', message: 'docs: update README' })
    })

    test('should return empty array on git command error', () => {
      execSyncMock = MockHelper.mockExecSync('', true)
      
      const result = GitUtils.getRecentCommits()
      
      expect(result).toHaveLength(0)
    })

    test('should handle empty commit history', () => {
      execSyncMock = MockHelper.mockExecSync('')
      
      const result = GitUtils.getRecentCommits()
      
      expect(result).toHaveLength(0)
    })
  })

  describe('commit', () => {
    test('should execute git commit successfully', () => {
      execSyncMock = MockHelper.mockExecSync('')
      
      const result = GitUtils.commit('feat: add new feature')
      
      expect(result).toBe(true)
    })

    test('should handle quotes in commit message', () => {
      execSyncMock = MockHelper.mockExecSync('')
      
      const result = GitUtils.commit('feat: add "quoted" feature')
      
      expect(result).toBe(true)
    })

    test('should throw error on commit failure', () => {
      execSyncMock = MockHelper.mockExecSync('', true)
      
      expect(() => GitUtils.commit('test message')).toThrow('Failed to commit')
    })
  })

  describe('getDiffStats', () => {
    test('should parse diff stats correctly', () => {
      execSyncMock = MockHelper.mockExecSync(mockStatsOutput)
      
      const result = GitUtils.getDiffStats()
      
      expect(result).toEqual({
        files: 2,
        insertions: 5,
        deletions: 1
      })
    })

    test('should handle stats with only insertions', () => {
      execSyncMock = MockHelper.mockExecSync('1 file changed, 3 insertions(+)')
      
      const result = GitUtils.getDiffStats()
      
      expect(result).toEqual({
        files: 1,
        insertions: 3,
        deletions: 0
      })
    })

    test('should handle stats with only deletions', () => {
      execSyncMock = MockHelper.mockExecSync('1 file changed, 2 deletions(-)')
      
      const result = GitUtils.getDiffStats()
      
      expect(result).toEqual({
        files: 1,
        insertions: 0,
        deletions: 2
      })
    })

    test('should return zero stats on error', () => {
      execSyncMock = MockHelper.mockExecSync('', true)
      
      const result = GitUtils.getDiffStats()
      
      expect(result).toEqual({
        files: 0,
        insertions: 0,
        deletions: 0
      })
    })

    test('should handle empty stats output', () => {
      execSyncMock = MockHelper.mockExecSync('')
      
      const result = GitUtils.getDiffStats()
      
      expect(result).toEqual({
        files: 0,
        insertions: 0,
        deletions: 0
      })
    })
  })
})