// Sample commit histories for testing different styles
const sampleCommits = {
  // Conventional commit style
  conventional: [
    { hash: 'abc123', message: 'feat(auth): add JWT authentication system' },
    { hash: 'def456', message: 'fix(api): resolve null pointer exception in user service' },
    { hash: 'ghi789', message: 'docs(readme): update installation instructions' },
    { hash: 'jkl012', message: 'test(auth): add unit tests for login functionality' },
    { hash: 'mno345', message: 'refactor(utils): extract validation helpers to separate module' },
    { hash: 'pqr678', message: 'style(css): improve button hover animations' },
    { hash: 'stu901', message: 'chore(deps): update dependencies to latest versions' },
    { hash: 'vwx234', message: 'perf(api): optimize database queries for user lookup' },
    { hash: 'yza567', message: 'feat(ui): implement dark mode toggle' },
    { hash: 'bcd890', message: 'fix(auth): handle expired token edge case' }
  ],

  // Imperative style
  imperative: [
    { hash: 'abc123', message: 'Add user authentication system' },
    { hash: 'def456', message: 'Fix login validation bug' },
    { hash: 'ghi789', message: 'Update README documentation' },
    { hash: 'jkl012', message: 'Implement password reset functionality' },
    { hash: 'mno345', message: 'Remove deprecated API endpoints' },
    { hash: 'pqr678', message: 'Optimize database connection pooling' },
    { hash: 'stu901', message: 'Create user profile component' },
    { hash: 'vwx234', message: 'Update styling for mobile responsiveness' },
    { hash: 'yza567', message: 'Add error handling for API requests' },
    { hash: 'bcd890', message: 'Refactor authentication middleware' }
  ],

  // Descriptive style
  descriptive: [
    { hash: 'abc123', message: 'User authentication and authorization' },
    { hash: 'def456', message: 'Login form validation improvements' },
    { hash: 'ghi789', message: 'Documentation updates' },
    { hash: 'jkl012', message: 'Password reset workflow' },
    { hash: 'mno345', message: 'API cleanup and modernization' },
    { hash: 'pqr678', message: 'Database performance optimizations' },
    { hash: 'stu901', message: 'New user profile interface' },
    { hash: 'vwx234', message: 'Mobile responsive design' },
    { hash: 'yza567', message: 'Enhanced error handling' },
    { hash: 'bcd890', message: 'Authentication system refactoring' }
  ],

  // Mixed style with emojis and tickets
  mixed: [
    { hash: 'abc123', message: '🚀 feat: Add user authentication #123' },
    { hash: 'def456', message: 'Fix login bug (resolves JIRA-456)' },
    { hash: 'ghi789', message: '📝 Update documentation.' },
    { hash: 'jkl012', message: 'FEAT: Implement password reset' },
    { hash: 'mno345', message: 'remove old code' },
    { hash: 'pqr678', message: '⚡ Optimize DB queries #789' },
    { hash: 'stu901', message: 'Create user profile component.' },
    { hash: 'vwx234', message: 'Mobile responsive updates' },
    { hash: 'yza567', message: '🐛 fix: Handle API errors properly' },
    { hash: 'bcd890', message: 'Refactor auth middleware (PR-234)' }
  ],

  // Formal tone
  formal: [
    { hash: 'abc123', message: 'Implement comprehensive user authentication system' },
    { hash: 'def456', message: 'Resolve critical validation issue in login process' },
    { hash: 'ghi789', message: 'Enhance documentation with detailed installation guide' },
    { hash: 'jkl012', message: 'Establish secure password reset mechanism' },
    { hash: 'mno345', message: 'Eliminate deprecated API endpoints for security' },
    { hash: 'pqr678', message: 'Optimize database performance through query refinement' },
    { hash: 'stu901', message: 'Architect user profile management interface' },
    { hash: 'vwx234', message: 'Ensure mobile responsiveness across all components' },
    { hash: 'yza567', message: 'Strengthen error handling mechanisms' },
    { hash: 'bcd890', message: 'Restructure authentication middleware architecture' }
  ],

  // Casual tone
  casual: [
    { hash: 'abc123', message: 'Add user login stuff' },
    { hash: 'def456', message: 'Fix broken login thing' },
    { hash: 'ghi789', message: 'Update docs' },
    { hash: 'jkl012', message: 'Make password reset work' },
    { hash: 'mno345', message: 'Clean up old API junk' },
    { hash: 'pqr678', message: 'Speed up database queries' },
    { hash: 'stu901', message: 'Build user profile page' },
    { hash: 'vwx234', message: 'Fix mobile layout issues' },
    { hash: 'yza567', message: 'Better error messages' },
    { hash: 'bcd890', message: 'Cleanup auth code' }
  ],

  // Short messages
  short: [
    { hash: 'abc123', message: 'Auth' },
    { hash: 'def456', message: 'Fix bug' },
    { hash: 'ghi789', message: 'Docs' },
    { hash: 'jkl012', message: 'Reset' },
    { hash: 'mno345', message: 'Cleanup' },
    { hash: 'pqr678', message: 'Optimize' },
    { hash: 'stu901', message: 'Profile' },
    { hash: 'vwx234', message: 'Mobile' },
    { hash: 'yza567', message: 'Errors' },
    { hash: 'bcd890', message: 'Refactor' }
  ],

  // Long messages
  long: [
    { hash: 'abc123', message: 'Implement a comprehensive user authentication system with JWT tokens, password hashing, and session management' },
    { hash: 'def456', message: 'Fix critical validation bug in the login process that was causing users to be unable to authenticate properly' },
    { hash: 'ghi789', message: 'Update the README documentation with detailed installation instructions, API usage examples, and troubleshooting guide' },
    { hash: 'jkl012', message: 'Implement secure password reset functionality with email verification and temporary token generation' },
    { hash: 'mno345', message: 'Remove all deprecated API endpoints that are no longer needed and update client code accordingly' },
    { hash: 'pqr678', message: 'Optimize database queries for user lookup operations to improve overall application performance significantly' },
    { hash: 'stu901', message: 'Create a new user profile component with editable fields, avatar upload, and preference management' },
    { hash: 'vwx234', message: 'Update CSS styling across all components to ensure proper mobile responsiveness and accessibility' },
    { hash: 'yza567', message: 'Add comprehensive error handling for all API requests with proper user feedback and logging' },
    { hash: 'bcd890', message: 'Refactor the authentication middleware to be more modular and easier to test and maintain' }
  ],

  // Empty history
  empty: [],

  // Single commit
  single: [
    { hash: 'abc123', message: 'Initial commit' }
  ]
}

module.exports = { sampleCommits }