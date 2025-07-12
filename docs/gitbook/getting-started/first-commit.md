# Your First Commit

Let's walk through creating your first intelligent commit message with Git-Smart. This hands-on tutorial will get you comfortable with the basic workflow.

## Setup Demo Project

Let's create a simple project to demonstrate Git-Smart:

```bash
# Create a new directory
mkdir git-smart-demo
cd git-smart-demo

# Initialize git repository
git init

# Create a simple JavaScript file
echo "function greetUser(name) {
  return \`Hello, \${name}! Welcome to Git-Smart.\`;
}

module.exports = { greetUser };" > greeting.js

# Create a basic README
echo "# Demo Project

This is a demo project for testing Git-Smart." > README.md
```

## Step 1: Stage Your Changes

```bash
# Check current status
git status
```

**Output:**
```
Untracked files:
  greeting.js
  README.md
```

```bash
# Stage the files
git add .

# Verify staging
git status
```

**Output:**
```
Changes to be committed:
  new file:   README.md
  new file:   greeting.js
```

## Step 2: Run Git-Smart

```bash
# Generate intelligent commit message
git-smart
```

**Expected Output:**
```
🔍 Analyzing changes...
   • Files: 2 added, 0 modified
   • Types: JavaScript, Markdown
   • Functions: greetUser
   • Type: init (95% confidence)

💡 Suggested commit: "init(project): setup demo project with greeting functionality"
Use this message? (Y/n): 
```

**What happened?**
- Git-Smart analyzed your 2 new files
- Detected JavaScript and Markdown content
- Found a new function called `greetUser`
- Determined this is an initial project setup
- Generated a descriptive commit message

## Step 3: Accept or Customize

### Option A: Accept the Suggestion
```bash
# Press Enter or type 'y'
y
```

**Output:**
```
✅ Committed successfully!
```

### Option B: Try Interactive Mode
If you want to see alternatives:
```bash
# Use interactive mode instead
git-smart --interactive
```

**Interactive Output:**
```
💡 Suggested commit messages:
   1. init(project): setup demo project with greeting functionality 🎯 (95%)
   2. feat(core): add greeting functionality and documentation 👍 (78%)
   3. chore(setup): initialize project with basic structure 👍 (65%)
   4. Edit custom message

Choose (1-4): 
```

Choose option 1 (the best suggestion) or explore the alternatives.

## Step 4: Verify Your Commit

```bash
# Check git history
git log --oneline
```

**Output:**
```
a1b2c3d init(project): setup demo project with greeting functionality
```

Perfect! You've created your first professional commit message using Git-Smart.

## Let's Make Another Commit

Now let's add a feature to see how Git-Smart handles different types of changes:

```bash
# Add user validation function
echo "
function validateUser(name) {
  if (!name || name.trim().length === 0) {
    throw new Error('Name cannot be empty');
  }
  return name.trim();
}" >> greeting.js

# Stage the changes
git add greeting.js

# Generate commit message
git-smart
```

**Expected Output:**
```
🔍 Analyzing changes...
   • Files: 0 added, 1 modified
   • Functions: validateUser
   • Type: feat (88% confidence)

💡 Suggested commit: "feat(validation): add user input validation"
Use this message? (Y/n): y
```

Notice how Git-Smart:
- Detected this as a feature addition (`feat`)
- Identified the validation scope
- Created a descriptive message about the new functionality

## Understanding the Magic

### What Git-Smart Analyzed

**File Changes:**
```
Modified: greeting.js
- Added: validateUser function
- Pattern: Input validation logic
```

**Code Patterns:**
```
- New function detected
- Error handling patterns
- Validation logic keywords
```

**Conventional Commit Format:**
```
feat(validation): add user input validation
│    │             │
│    │             └─ Clear description
│    └─ Scope (what area of code)
└─ Type (what kind of change)
```

### Why These Suggestions?

**First Commit - `init(project)`:**
- New repository with multiple files
- Mix of code and documentation
- Project initialization pattern

**Second Commit - `feat(validation)`:**
- New function added to existing file
- Validation-related functionality
- Feature enhancement pattern

## Common First-Time Scenarios

### Scenario 1: Bug Fix
```bash
# Fix a typo in the greeting function
sed -i 's/Hello/Hi/' greeting.js
git add greeting.js
git-smart
```

**Expected:** `fix(greeting): correct welcome message text`

### Scenario 2: Documentation
```bash
# Update README with usage instructions
echo "
## Usage

\`\`\`javascript
const { greetUser } = require('./greeting');
console.log(greetUser('Alice'));
\`\`\`" >> README.md

git add README.md
git-smart
```

**Expected:** `docs(readme): add usage instructions and examples`

### Scenario 3: Refactoring
```bash
# Extract constants
echo "const DEFAULT_GREETING = 'Hi';
const ERROR_MESSAGES = {
  EMPTY_NAME: 'Name cannot be empty'
};" > constants.js

git add constants.js
git-smart
```

**Expected:** `refactor(core): extract constants for better maintainability`

## Dry Run Practice

Before committing, you can preview suggestions:

```bash
# See suggestion without committing
git-smart --dry-run
```

This is perfect for:
- Learning how Git-Smart thinks
- Testing different change patterns
- Building confidence before committing

## Interactive Mode Practice

Explore multiple suggestions:

```bash
# See alternatives
git-smart --interactive
```

Benefits:
- Compare different perspectives
- Learn from various options
- Choose the best fit for your context

## Tips for Success

### 1. Start Small
Begin with simple, single-purpose commits:
```bash
# Good: Single responsibility
git add src/auth.js
git-smart

# Less ideal: Mixed purposes
git add src/auth.js src/payment.js config/database.js
git-smart
```

### 2. Use Descriptive File Names
Git-Smart learns from your file organization:
```bash
# Clear structure helps Git-Smart understand context
src/
  components/UserProfile.js  # UI component
  services/UserService.js    # Business logic
  utils/UserValidator.js     # Utility function
```

### 3. Stage Related Changes
Group logically related changes:
```bash
# Authentication feature
git add src/auth/ tests/auth/
git-smart  # "feat(auth): implement user authentication system"
```

### 4. Review and Learn
Use dry-run mode to understand Git-Smart's analysis:
```bash
git-smart --dry-run  # Learn without committing
git-smart --verbose  # See detailed analysis
```

## What's Next?

Now that you've created your first Git-Smart commits:

1. **Explore Interactive Mode** - [Interactive Features](../core-features/interactive-mode.md)
2. **Learn Advanced Features** - [Enhanced Pattern Recognition](../advanced-features/pattern-recognition.md)
3. **Understand Analysis** - [Deep Analysis Mode](../advanced-features/deep-analysis.md)
4. **Optimize Your Workflow** - [Best Practices](../user-guide/best-practices.md)

## Cleanup Demo

When you're done experimenting:
```bash
# Remove demo directory
cd ..
rm -rf git-smart-demo
```

Congratulations! You've successfully created your first intelligent commit messages with Git-Smart. 🎉