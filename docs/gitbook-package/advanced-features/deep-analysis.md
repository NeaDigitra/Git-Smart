# Deep Analysis Mode (v1.1.0)

The `--analyze` option provides comprehensive insights into your commit history patterns, helping you understand your coding and communication style.

## Running Deep Analysis

```bash
git-smart --analyze
```

This command analyzes your last 100 commits and provides detailed insights without generating commit messages.

## Analysis Report Structure

### 📈 Commit Style Overview
```
📈 Commit Style: conventional
📏 Average Length: 43 characters  
🎯 Tone: casual
```

**Insights Provided:**
- **Style Classification** - conventional, imperative, or descriptive
- **Message Length Patterns** - Your typical commit message length
- **Tone Analysis** - Formal vs casual communication style

### 📝 Vocabulary Analysis
```
📝 Vocabulary Analysis:
  Formal: 15.2%
  Casual: 67.8%
  Technical: 8.1%
  Business: 8.9%
```

**Understanding Your Vocabulary:**
- **High Formal %** - You prefer professional language (`implement`, `optimize`, `enhance`)
- **High Casual %** - You use everyday language (`fix`, `add`, `update`)
- **High Technical %** - You focus on technical terms (`api`, `database`, `auth`)
- **High Business %** - You emphasize user-facing features (`user`, `customer`, `product`)

### 🏷️ Most Used Commit Types
```
🏷️ Most Used Commit Types:
  1. feat: 12 times (34.3%)
  2. fix: 8 times (22.9%)
  3. refactor: 6 times (17.1%)
  4. docs: 4 times (11.4%)
  5. chore: 3 times (8.6%)
```

**Type Usage Insights:**
- **High feat %** - You frequently add new features
- **High fix %** - You often work on bug fixes
- **Balanced Distribution** - You work on various types of changes
- **Low docs %** - Consider improving documentation practices

### 🎯 Quality Metrics
```
🎯 Quality Metrics:
  Consistency: 87.5%
  Conventional Adherence: 92.3%
  Scope Usage: 45.2%
  Message Quality: 78.9%
```

**Metric Explanations:**

**Consistency (87.5%)**
- Measures how similar your commit styles are
- Higher = more predictable patterns
- Target: >80% for good consistency

**Conventional Adherence (92.3%)**
- Percentage following conventional commit format
- Higher = better tooling compatibility
- Target: >90% for professional projects

**Scope Usage (45.2%)**
- How often you include scopes `feat(scope): message`
- Higher = better change categorization
- Target: >50% for complex projects

**Message Quality (78.9%)**
- Based on length, descriptiveness, and clarity
- Higher = more informative commit history
- Target: >70% for maintainable projects

## Interpreting Results

### Excellent Patterns (90%+ scores)
- You have well-established, consistent patterns
- Your commit history is professional and informative
- Consider mentoring others on commit message quality

### Good Patterns (70-89% scores)
- You have solid commit practices with room for improvement
- Focus on areas with lower scores
- Consider establishing team standards

### Needs Improvement (<70% scores)
- Significant opportunity to improve commit quality
- Consider using Git-Smart's enhanced mode consistently
- Review [best practices](../user-guide/best-practices.md)

## Using Analysis for Improvement

### 1. Identify Weak Areas
Focus on metrics below 70%:
```bash
# If scope usage is low
git-smart --enhanced  # Better scope suggestions

# If consistency is low  
git-smart --profile   # Understand your patterns
```

### 2. Track Progress Over Time
Run analysis periodically:
```bash
# Monthly analysis
git-smart --analyze > analysis-$(date +%Y-%m).txt
```

### 3. Team Comparison
Share analysis results with your team to establish standards.

## Advanced Usage

### Analysis + Profile
```bash
git-smart --analyze --profile
```
Get both detailed analysis and personal style insights.

### Filter by Date Range
The analysis automatically focuses on recent commits, but you can influence this by working in different repositories or branches.

## Next Steps

- [Style Profiling](style-profiling.md) - Get personalized style recommendations
- [Team Insights](team-insights.md) - Apply analysis to team workflows
- [Best Practices](../user-guide/best-practices.md) - Improve based on your analysis