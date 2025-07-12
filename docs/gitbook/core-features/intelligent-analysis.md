# Intelligent Analysis

Git-Smart's core strength lies in its sophisticated analysis engine that understands your code changes at multiple levels. Learn how Git-Smart "thinks" about your commits.

## Multi-Layer Analysis

Git-Smart examines your changes through several analytical layers:

### 1. File-Level Analysis

**Change Detection:**
```bash
# Git-Smart identifies different types of file changes
git add src/newFeature.js      # New file → likely feat
git add src/bugfix.js          # Modified file → analyze content
git add deprecated/old.js      # Deleted file → likely refactor/chore
```

**File Categorization:**
- **Source Code** - `.js`, `.ts`, `.py`, `.java`, etc.
- **Documentation** - `.md`, `.rst`, `.txt`, README files
- **Configuration** - `.json`, `.yaml`, `.env`, config files
- **Tests** - Files in `test/`, `spec/`, `__tests__/` directories
- **Build/CI** - `.github/`, `webpack.config.js`, `Dockerfile`

### 2. Content Analysis

**Code Pattern Recognition:**
```javascript
// Git-Smart detects these patterns:

// New function → feat
function authenticateUser(credentials) { ... }

// Error handling → fix
try {
  processData(input);
} catch (error) {
  console.error('Fixed validation error:', error);
}

// Performance optimization → perf
const memoizedCalculation = useMemo(() => { ... });

// Refactoring patterns → refactor
const { extractedFunction } = require('./utils');
```

**Keyword Analysis:**
Git-Smart recognizes contextual keywords:
- **Bug fixes:** `fix`, `bug`, `error`, `issue`, `resolve`, `patch`
- **Features:** `add`, `implement`, `create`, `introduce`, `new`
- **Performance:** `optimize`, `performance`, `speed`, `cache`, `memory`
- **Security:** `auth`, `security`, `token`, `password`, `encrypt`

### 3. Structural Analysis

**Project Architecture Understanding:**
```
src/
├── components/     # UI components → scope: ui, component
├── services/       # Business logic → scope: service, api
├── utils/          # Utilities → scope: utils, helper
├── tests/          # Test files → type: test
└── config/         # Configuration → scope: config
```

**Import/Export Analysis:**
```javascript
// New imports suggest dependencies or features
import { newFeature } from './feature';  // feat
import { fixedUtil } from './utils';     // fix

// Export changes suggest API modifications
export { newPublicAPI };  // feat(api)
```

## Analysis Flow

### Step 1: File Change Detection
```
🔍 Analyzing changes...
   • Files: 2 added, 1 modified, 0 deleted
   • Categories: JavaScript, Test, Documentation
```

Git-Smart inventories all staged changes and categorizes them.

### Step 2: Content Examination
```
   • Functions: authenticateUser, validateToken
   • Classes: UserManager
   • Imports: crypto, bcrypt
   • Patterns: error handling, validation
```

Examines the actual code content for semantic meaning.

### Step 3: Pattern Matching
```
   • Type: feat (85% confidence)
   • Scope: auth (detected from file paths and content)
   • Keywords: authentication, security, validation
```

Combines all analysis to determine the most appropriate commit type and scope.

### Step 4: Historical Context
```
   • Style: conventional (matches 94% of recent commits)
   • Tone: technical (matches vocabulary patterns)
   • Length: targeting 45 characters (your average)
```

Considers your commit history to match your established style.

## Confidence Scoring

Git-Smart calculates confidence based on multiple factors:

### High Confidence (85%+)
- **Clear patterns** detected in code changes
- **Consistent file categorization** (all files relate to same feature)
- **Strong keyword matches** for specific commit types
- **Historical pattern alignment** with your previous commits

### Medium Confidence (60-84%)
- **Mixed patterns** with one dominant type
- **Partial keyword matches** or ambiguous changes
- **Some uncertainty** about scope or type
- **Reasonable historical alignment**

### Lower Confidence (35-59%)
- **Unclear or mixed patterns** in changes
- **Multiple possible interpretations** of the changes
- **Limited contextual information** available
- **Deviates from historical patterns**

## Advanced Pattern Recognition (v1.1.0)

### Vocabulary Analysis
```
📝 Analyzing vocabulary patterns...
   • Formal: 23% (implement, optimize, enhance)
   • Casual: 67% (fix, add, update)
   • Technical: 45% (api, database, auth)
   • Business: 12% (user, customer, order)
```

Git-Smart learns your vocabulary preferences and suggests messages that match your style.

### Scope Intelligence
```
🏷️ Analyzing scope preferences...
   • Backend: 45% (api, service, database)
   • Frontend: 30% (ui, component, view)
   • DevOps: 15% (ci, build, deploy)
   • Testing: 10% (test, spec, mock)
```

Understands which areas of your codebase you work on most frequently.

### Type Frequency Learning
```
📊 Analyzing commit type patterns...
   • feat: 34% (your primary work type)
   • fix: 28% (significant bug fixing)
   • refactor: 18% (code quality focus)
   • docs: 12% (good documentation habits)
```

Learns your typical work patterns and adjusts suggestions accordingly.

## Context-Aware Suggestions

### Framework Detection
Git-Smart recognizes popular frameworks and adjusts suggestions:

**React Projects:**
```javascript
// Detects React patterns
const UserComponent = () => { ... };  // feat(component)
export default UserComponent;
```

**API Projects:**
```javascript
// Detects API patterns
app.get('/users', (req, res) => { ... });  // feat(api)
```

**Database Changes:**
```sql
-- Detects database patterns
CREATE TABLE users (...);  -- feat(database)
```

### Domain-Specific Recognition

**Authentication/Security:**
```javascript
// Security-related changes
const hashPassword = (password) => { ... };  // feat(auth) or security(auth)
```

**Performance Optimization:**
```javascript
// Performance improvements
const memoized = useMemo(() => { ... });  // perf(optimization)
```

**Error Handling:**
```javascript
// Bug fixes and error handling
try { ... } catch (error) { ... }  // fix(error-handling)
```

## File Path Intelligence

Git-Smart understands common project structures:

### Frontend Patterns
```
src/components/Button.jsx     → feat(ui): add button component
src/pages/Dashboard.jsx       → feat(page): add dashboard page
src/styles/theme.css          → style(theme): update color scheme
```

### Backend Patterns
```
src/routes/users.js           → feat(api): add user endpoints
src/models/User.js            → feat(model): add user data model
src/middleware/auth.js        → feat(auth): add authentication middleware
```

### Configuration Patterns
```
webpack.config.js             → build(webpack): update build configuration
.github/workflows/ci.yml      → ci(github): add automated testing
package.json                  → deps(npm): update project dependencies
```

## Integration with Development Workflow

### IDE Integration Ready
Git-Smart's analysis can be integrated into development environments:
- **Pre-commit hooks** for automatic message generation
- **IDE extensions** for real-time suggestions
- **CLI integration** for seamless workflow

### Team Consistency
The analysis engine helps maintain team consistency:
- **Style learning** from team's collective history
- **Pattern recognition** across different developers
- **Standardization** of commit message formats

## Troubleshooting Analysis

### When Git-Smart Seems Confused

**Mixed Changes:**
```bash
# Problem: Multiple unrelated changes
git add src/feature.js src/bugfix.js config/database.js

# Solution: Separate into logical commits
git add src/feature.js
git-smart  # Clear feature commit

git add src/bugfix.js  
git-smart  # Clear fix commit
```

**Unclear Context:**
```bash
# Use interactive mode for alternatives
git-smart --interactive

# Or get detailed analysis
git-smart --verbose --dry-run
```

### Improving Analysis Quality

1. **Better File Organization** - Clear directory structure
2. **Descriptive File Names** - Help Git-Smart understand context
3. **Logical Commit Grouping** - Stage related changes together
4. **Consistent Patterns** - Maintain similar coding styles

## Next Steps

- [18 Commit Types](commit-types.md) - Understand all supported commit types
- [Actions & Scopes](actions-scopes.md) - Learn about the 70+ available scopes
- [Enhanced Pattern Recognition](../advanced-features/pattern-recognition.md) - Explore v1.1.0 advanced features