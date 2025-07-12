---
sidebar_position: 1
title: Intelligent Analysis
description: Learn how Git-Smart analyzes your code changes to generate contextually appropriate commit messages
---

# Intelligent Analysis

Git-Smart's intelligent analysis engine examines your code changes to understand what you've actually modified and generates contextually appropriate commit messages.

## How It Works

### 1. **File Analysis**
Git-Smart analyzes each modified file to understand:
- **File type and extension** - JavaScript, Python, CSS, documentation, etc.
- **File location** - Frontend components, backend services, configuration files
- **Change patterns** - New files, modifications, deletions, renames

### 2. **Content Analysis**
For each change, Git-Smart examines:
- **Code patterns** - Function definitions, class declarations, imports
- **Keywords and terminology** - Technical terms, domain-specific language
- **Change scope** - Small tweaks vs. major refactoring

### 3. **Context Understanding**
Git-Smart builds context by analyzing:
- **Project structure** - Monorepo, microservices, frontend/backend separation
- **Naming conventions** - Existing patterns in your codebase
- **Historical patterns** - Your previous commit styles and preferences

## Analysis Categories

### File Type Detection

Git-Smart recognizes and categorizes files by their purpose:

```javascript
// Frontend Files
src/components/Button.jsx     → "ui component"
src/styles/main.css          → "styling"
src/assets/logo.png          → "asset"

// Backend Files  
src/api/auth.js              → "authentication service"
src/models/User.js           → "data model"
src/middleware/auth.js       → "middleware"

// Configuration
package.json                 → "dependency management"
webpack.config.js            → "build configuration"
.env                         → "environment configuration"

// Documentation
README.md                    → "documentation"
docs/api.md                  → "documentation"
```

### Change Pattern Recognition

Git-Smart identifies common development patterns:

#### **New Feature Development**
```diff
+ export function validateEmail(email) {
+   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
+ }
```
**Analysis:** New function creation → `feat(validation): add email validation`

#### **Bug Fixes**
```diff
- if (user.age > 18) {
+ if (user.age >= 18) {
```
**Analysis:** Logic correction → `fix(validation): correct age validation logic`

#### **Refactoring**
```diff
- function getUserData() {
-   // 50 lines of code
- }
+ function getUserData() {
+   return userService.getData();
+ }
```
**Analysis:** Code simplification → `refactor(user): simplify data retrieval logic`

#### **Security Improvements**
```diff
- app.use(cors());
+ app.use(cors({
+   origin: process.env.ALLOWED_ORIGINS?.split(','),
+   credentials: true
+ }));
```
**Analysis:** Security enhancement → `security(cors): configure secure CORS policy`

### Scope Detection

Git-Smart automatically detects the appropriate scope based on file paths and content:

| File Path | Detected Scope | Reasoning |
|-----------|----------------|-----------|
| `src/components/auth/` | `auth` | Authentication-related component |
| `src/api/users/` | `api`, `users` | User API endpoints |
| `tests/unit/` | `test` | Testing files |
| `docs/` | `docs` | Documentation |
| `build/`, `webpack.config.js` | `build` | Build configuration |
| `package.json` | `deps` | Dependency changes |

## Advanced Analysis Features

### Code Keyword Extraction

Git-Smart identifies technical terms and patterns in your changes:

```javascript
// Detected keywords: "authentication", "JWT", "token", "middleware"
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  // ... JWT validation logic
}
```

**Generated message:** `feat(auth): implement JWT authentication middleware`

### Multi-file Change Correlation

When multiple files are changed together, Git-Smart understands the relationship:

```
Modified files:
- src/components/UserProfile.jsx
- src/styles/UserProfile.css  
- src/api/userService.js
```

**Analysis:** Related changes across frontend, styling, and API → `feat(user): enhance user profile with new styling and API integration`

### Change Magnitude Assessment

Git-Smart assesses the scope of changes:

- **Minor changes** (1-10 lines) → Simple, focused messages
- **Moderate changes** (11-50 lines) → Detailed descriptions
- **Major changes** (50+ lines) → High-level summaries with scope indication

## Confidence Scoring

Git-Smart provides confidence scores for its suggestions:

### High Confidence (85%+)
- Clear, single-purpose changes
- Well-defined file patterns
- Consistent with project conventions

### Medium Confidence (60-84%)
- Multiple related changes
- Mixed file types
- Some ambiguity in purpose

### Lower Confidence (40-59%)
- Complex, multi-faceted changes
- Unclear change patterns
- Suggests using interactive mode

## Customization and Learning

### Project Pattern Learning

Git-Smart adapts to your project's specific patterns:

```javascript
// If your project consistently uses specific terms
// Git-Smart learns: "service" → "svc", "component" → "comp"

// Your pattern: feat(user-svc): ...
// Git-Smart suggests: feat(user-svc): enhance user data processing
```

### Historical Analysis Integration

Git-Smart analyzes your commit history to understand preferences:

- **Preferred commit types** - Do you use `feat` vs `add`?
- **Scope conventions** - Short vs descriptive scopes
- **Message style** - Imperative vs descriptive tone
- **Detail level** - Concise vs detailed descriptions

## Practical Examples

### Real-world Analysis Scenarios

#### E-commerce Application
```
Changes detected:
+ src/components/Cart.jsx (new shopping cart component)
+ src/api/cart.js (cart API endpoints)  
+ src/styles/cart.css (cart styling)

Analysis: Multi-layer feature implementation
Confidence: 92%
Suggestion: feat(cart): implement shopping cart functionality
```

#### Bug Fix in Authentication
```
Changes detected:
~ src/middleware/auth.js (token validation fix)
~ tests/auth.test.js (updated test cases)

Analysis: Security-related bug fix with tests
Confidence: 88%  
Suggestion: fix(auth): resolve token validation edge case
```

#### Documentation Update
```
Changes detected:
~ README.md (updated installation instructions)
~ docs/api.md (added new endpoint documentation)

Analysis: Documentation maintenance
Confidence: 95%
Suggestion: docs: update installation and API documentation
```

## Best Practices for Analysis

### To Get Better Suggestions

1. **Stage related changes together** - Group logically related modifications
2. **Make focused commits** - Avoid mixing unrelated changes
3. **Use descriptive file names** - Help Git-Smart understand context
4. **Follow project conventions** - Consistent patterns improve accuracy

### When Analysis Needs Help

If Git-Smart seems confused:
- **Use interactive mode** (`--interactive`) to see multiple options
- **Check with dry-run** (`--dry-run`) before committing
- **Use verbose mode** (`--verbose`) to understand the analysis
- **Break down large changes** into smaller, focused commits

## Next Steps

- [18 Commit Types](commit-types) - Understand all supported commit types
- [70+ Actions & Scopes](actions-scopes) - Explore available scopes and actions
- [Interactive Mode](interactive-mode) - Learn to use interactive selection