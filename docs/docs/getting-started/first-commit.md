---
sidebar_position: 3
title: Your First Commit
description: Hands-on tutorial that walks you through creating your first intelligent commit message
---

# Your First Commit

This hands-on tutorial walks you through creating your first intelligent commit message with Git-Smart using a practical example.

## Prerequisites

Before starting, make sure you have:
- Git-Smart installed ([Installation Guide](installation))
- A git repository (we'll create one if needed)
- Basic familiarity with git commands

## Tutorial: Building a Simple Authentication System

Let's walk through a realistic scenario where you're adding authentication to a web application.

### Step 1: Set Up the Demo Project

```bash
# Create a new project directory
mkdir git-smart-demo
cd git-smart-demo

# Initialize git repository
git init

# Create a basic project structure
mkdir -p src/{auth,components,utils} tests
touch src/index.js README.md package.json
```

### Step 2: Create Your First Feature

Let's add a user authentication module:

```bash
# Create the authentication file
cat > src/auth/userAuth.js << 'EOF'
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserAuth {
  constructor(secretKey) {
    this.secretKey = secretKey;
  }

  async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }

  async validatePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }

  generateToken(userId) {
    return jwt.sign({ userId }, this.secretKey, { expiresIn: '24h' });
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, this.secretKey);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}

module.exports = UserAuth;
EOF
```

### Step 3: Stage Your Changes

```bash
# Stage the new authentication file
git add src/auth/userAuth.js
```

### Step 4: Use Git-Smart for Your First Commit

Now let's see Git-Smart in action:

```bash
# Run Git-Smart with verbose output to see the analysis
git-smart --verbose
```

You should see output similar to:

```bash
🔍 Analyzing changes...

📁 File Analysis:
├── src/auth/userAuth.js (new file)
│   ├── Type: JavaScript source file
│   ├── Location: Authentication module
│   └── Size: 847 bytes

🔍 Content Analysis:
├── Detected patterns: class definition, authentication methods
├── Keywords: auth, password, token, jwt, bcrypt
├── Functions: hashPassword, validatePassword, generateToken, verifyToken
├── Dependencies: bcrypt, jsonwebtoken
└── Domain: Authentication and security

🎯 Classification:
├── Change type: New feature (100% confidence)
├── Scope: auth (99% confidence from file path and content)
├── Pattern: Authentication implementation
└── Overall confidence: 94%

💡 Suggested commit message:
   feat(auth): implement user authentication with JWT and bcrypt

✅ Commit created: feat(auth): implement user authentication with JWT and bcrypt
```

### Step 5: Add Tests (Second Commit)

Let's add tests for our authentication module:

```bash
# Create test file
cat > tests/userAuth.test.js << 'EOF'
const UserAuth = require('../src/auth/userAuth');

describe('UserAuth', () => {
  let userAuth;
  
  beforeEach(() => {
    userAuth = new UserAuth('test-secret-key');
  });

  describe('Password hashing', () => {
    test('should hash password correctly', async () => {
      const password = 'testPassword123';
      const hashed = await userAuth.hashPassword(password);
      
      expect(hashed).not.toBe(password);
      expect(hashed).toMatch(/^\$2b\$/);
    });

    test('should validate correct password', async () => {
      const password = 'testPassword123';
      const hashed = await userAuth.hashPassword(password);
      const isValid = await userAuth.validatePassword(password, hashed);
      
      expect(isValid).toBe(true);
    });
  });

  describe('JWT tokens', () => {
    test('should generate valid JWT token', () => {
      const userId = '12345';
      const token = userAuth.generateToken(userId);
      
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
    });

    test('should verify valid token', () => {
      const userId = '12345';
      const token = userAuth.generateToken(userId);
      const decoded = userAuth.verifyToken(token);
      
      expect(decoded.userId).toBe(userId);
    });
  });
});
EOF

# Stage and commit the tests
git add tests/userAuth.test.js
git-smart
```

Expected output:
```bash
🔍 Analyzing changes...
💡 Suggested: test(auth): add comprehensive user authentication tests
✅ Commit created: test(auth): add comprehensive user authentication tests
```

### Step 6: Add Documentation (Third Commit)

Now let's document our authentication module:

```bash
# Update README with authentication documentation
cat > README.md << 'EOF'
# Git-Smart Demo Project

A demo project showcasing Git-Smart's intelligent commit message generation.

## Features

### Authentication System
- Password hashing using bcrypt
- JWT token generation and validation
- Secure user authentication flow

### Usage

```javascript
const UserAuth = require('./src/auth/userAuth');

const auth = new UserAuth('your-secret-key');

// Hash a password
const hashedPassword = await auth.hashPassword('userPassword');

// Generate JWT token
const token = auth.generateToken('userId123');

// Verify token
const decoded = auth.verifyToken(token);
```

## Testing

Run tests with:
```bash
npm test
```

## Dependencies

- bcrypt: Password hashing
- jsonwebtoken: JWT token handling
EOF

# Stage and commit documentation
git add README.md
git-smart
```

Expected output:
```bash
🔍 Analyzing changes...
💡 Suggested: docs: add authentication system documentation
✅ Commit created: docs: add authentication system documentation
```

### Step 7: Try Interactive Mode

Let's add a utility function and use interactive mode:

```bash
# Create a utility function
cat > src/utils/validators.js << 'EOF'
/**
 * Email validation utility
 */
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Password strength validation
 */
function validatePasswordStrength(password) {
  if (password.length < 8) return false;
  if (!/[A-Z]/.test(password)) return false;
  if (!/[a-z]/.test(password)) return false;
  if (!/[0-9]/.test(password)) return false;
  return true;
}

module.exports = {
  validateEmail,
  validatePasswordStrength
};
EOF

# Stage changes and use interactive mode
git add src/utils/validators.js
git-smart --interactive
```

You'll see something like:

```bash
💡 Suggested commit messages:

  1. feat(utils): add email and password validation utilities 🎯 (91%)
  2. feat(validation): implement input validation functions 👍 (84%)
  3. feat(auth): add authentication validation helpers 👍 (79%)
  4. ✏️  Write custom message

Choose option (1-4): 1

✅ Selected: "feat(utils): add email and password validation utilities"
✅ Commit created!
```

### Step 8: Review Your Commit History

Let's look at the beautiful commit history Git-Smart created:

```bash
git log --oneline
```

You should see:
```bash
a1b2c3d feat(utils): add email and password validation utilities
e4f5g6h docs: add authentication system documentation  
i7j8k9l test(auth): add comprehensive user authentication tests
m1n2o3p feat(auth): implement user authentication with JWT and bcrypt
```

## Understanding What Happened

### Intelligent Analysis in Action

Git-Smart analyzed each commit and determined:

1. **File Patterns**: `src/auth/` → authentication scope
2. **Content Analysis**: JWT, bcrypt → security implementation
3. **Change Type**: New files → feature development
4. **Naming Conventions**: Consistent scope and type usage

### Conventional Commit Benefits

Your commits now follow the conventional commit standard:
- `feat(scope): description` for new features
- `test(scope): description` for tests
- `docs: description` for documentation

This enables:
- **Automated changelog generation**
- **Semantic versioning**
- **Better code review process**
- **Clear project history**

## Common Patterns You've Learned

### 1. Feature Development Pattern
```bash
# Implementation
git add src/feature/
git-smart
# Result: feat(feature): implement core functionality

# Tests
git add tests/feature.test.js
git-smart  
# Result: test(feature): add unit tests

# Documentation
git add docs/feature.md
git-smart
# Result: docs(feature): add feature documentation
```

### 2. Bug Fix Pattern
```bash
# Fix the bug
git add src/problematic-file.js
git-smart
# Result: fix(scope): resolve specific issue description
```

### 3. Refactoring Pattern
```bash
# Restructure code
git add src/refactored-module.js
git-smart
# Result: refactor(scope): simplify module structure
```

## Troubleshooting Your First Commits

### Low Confidence Suggestions

If Git-Smart shows low confidence:

```bash
💡 Suggested: chore: update files 🤔 (45%)
```

**Solutions:**
1. **Use interactive mode**: `git-smart --interactive`
2. **Stage related files together**: Don't mix unrelated changes
3. **Make focused commits**: One logical change per commit

### Unexpected Suggestions

If the suggestion doesn't match your intention:

```bash
# Use interactive mode to see alternatives
git-smart --interactive

# Or use dry-run to see the suggestion first
git-smart --dry-run
```

### No Suggestion

If Git-Smart can't analyze your changes:

```bash
❌ Unable to determine appropriate commit message
```

**Check:**
1. Are changes staged? (`git status`)
2. Are you in a git repository?
3. Are the changes meaningful (not just whitespace)?

## Next Steps

Congratulations! You've successfully created your first intelligent commits with Git-Smart. Here's what to explore next:

### Core Features
- [Intelligent Analysis](../core-features/intelligent-analysis) - Deep dive into how Git-Smart analyzes code
- [18 Commit Types](../core-features/commit-types) - Explore all available commit types
- [70+ Scopes](../core-features/actions-scopes) - Learn about scope detection

### Advanced Usage
- [Interactive Mode](../core-features/interactive-mode) - Master interactive selection
- [Team Collaboration](../team-collaboration/style-guides) - Set up team standards
- [CI/CD Integration](../team-collaboration/cicd-integration) - Automate in pipelines

### Best Practices
- [CLI Reference](../user-guide/cli-reference) - Complete command reference
- [Configuration](../user-guide/configuration) - Customize Git-Smart
- [Best Practices](../user-guide/best-practices) - Optimize your workflow

## Practice Exercises

Try these exercises to master Git-Smart:

1. **Add a frontend component** and see how Git-Smart categorizes UI changes
2. **Fix a bug** in your authentication code and observe fix-type detection
3. **Update dependencies** in package.json and see dependency management detection
4. **Add performance optimizations** and explore performance-type commits

Each scenario will help you understand Git-Smart's intelligent analysis and improve your commit message quality!