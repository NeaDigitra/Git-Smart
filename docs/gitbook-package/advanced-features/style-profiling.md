# Style Profiling (v1.1.0)

The `--profile` option creates a personalized analysis of your commit style, providing insights and recommendations tailored to your specific patterns.

## Running Style Profile

```bash
git-smart --profile
```

This generates a comprehensive profile of your commit style based on historical patterns.

## Profile Report Structure

### 👤 Your Commit Style Profile

```
👤 Your Commit Style Profile
=============================

🎨 Style: technical
📝 Format: Conventional Commits
🎯 Confidence Score: 87.3%
```

**Profile Elements:**

**Style Classification:**
- **Formal** - Professional, detailed language
- **Casual** - Everyday, approachable language  
- **Technical** - Code-focused, precise terminology
- **Business** - User-centered, feature-oriented
- **Balanced** - Mix of different styles

**Format Preference:**
- **Conventional Commits** - Uses `type(scope): description` format
- **Free Form** - More flexible, descriptive messages

**Confidence Score:**
- **90%+** - Highly consistent, well-established patterns
- **70-89%** - Good patterns with minor inconsistencies
- **50-69%** - Moderate patterns, room for improvement
- **<50%** - Inconsistent patterns, consider standardization

### 🏷️ Your Preferred Scopes

```
🏷️ Your Preferred Scopes:
  1. api (28.6%)
  2. ui (14.3%) 
  3. auth (12.1%)
  4. database (9.8%)
  5. config (7.2%)
```

**Scope Insights:**
- **High API Usage** - You frequently work on backend services
- **UI Focus** - Significant frontend development
- **Auth Concentration** - Security and authentication work
- **Database Work** - Data layer modifications
- **Config Changes** - System configuration updates

### 📊 Your Most Used Types

```
📊 Your Most Used Types:
  1. feat (34.5%)
  2. fix (22.1%)
  3. refactor (18.3%)
  4. docs (12.4%)
  5. chore (8.7%)
```

**Type Analysis:**
- **Feature Heavy** - Primary focus on new functionality
- **Bug Fix Active** - Significant maintenance work
- **Refactoring** - Code quality improvements
- **Documentation** - Good documentation practices
- **Maintenance** - Regular housekeeping

### 💡 Personalized Recommendations

```
💡 Recommendations:
  1. Consider using more descriptive scopes for better categorization
  2. Increase documentation commits for better project maintenance
  3. Your technical vocabulary is excellent - maintain this consistency
```

**Common Recommendations:**

**Consistency Improvements:**
- Standardize scope usage across similar changes
- Maintain consistent message length (30-72 characters)
- Use conventional commit format consistently

**Quality Enhancements:**
- Include more descriptive information in commit bodies
- Use scopes to better categorize changes
- Consider breaking large changes into smaller commits

**Team Alignment:**
- Share your successful patterns with the team
- Consider your style when reviewing others' commits
- Help establish team-wide standards

## Understanding Your Profile

### High-Confidence Profiles (85%+)

You have well-established patterns:
- ✅ **Maintain Current Style** - Your patterns work well
- ✅ **Mentor Others** - Share your successful approaches
- ✅ **Fine-tune** - Small adjustments for perfection

**Suggested Actions:**
```bash
# Use enhanced mode to maintain quality
git-smart --enhanced

# Periodically review your patterns
git-smart --analyze --profile
```

### Moderate-Confidence Profiles (60-84%)

You have good foundations with improvement opportunities:
- 🎯 **Focus on Weak Areas** - Address lower-scoring metrics
- 🎯 **Increase Consistency** - Use Git-Smart more regularly
- 🎯 **Establish Patterns** - Be more intentional about style

**Suggested Actions:**
```bash
# Use enhanced mode for better suggestions
git-smart --enhanced --interactive

# Review recommendations regularly
git-smart --profile
```

### Low-Confidence Profiles (<60%)

Significant opportunity for improvement:
- 🚀 **Establish Standards** - Create consistent patterns
- 🚀 **Use Git-Smart Regularly** - Build better habits
- 🚀 **Learn Best Practices** - Study conventional commits

**Suggested Actions:**
```bash
# Always use enhanced mode
git-smart --enhanced

# Study your patterns
git-smart --analyze --profile

# Review best practices
git-smart --help
```

## Tracking Profile Evolution

### Monthly Profile Reviews
```bash
# Save monthly profiles
git-smart --profile > profile-$(date +%Y-%m).txt
```

### Compare Over Time
Track how your style evolves:
- **Confidence Score Changes** - Are you becoming more consistent?
- **Scope Evolution** - Are you using more appropriate scopes?
- **Type Distribution** - Is your work pattern changing?

### Team Profile Comparison
Share profiles with team members to:
- Understand different approaches
- Establish team standards
- Learn from high-confidence profiles

## Using Profile Insights

### Personal Development
- **Strengthen Weak Areas** - Focus on low-scoring aspects
- **Maintain Strong Patterns** - Continue successful practices
- **Experiment Thoughtfully** - Try new approaches while maintaining quality

### Code Review
- **Apply Your Standards** - Use your profile insights during reviews
- **Recognize Different Styles** - Understand team members' approaches
- **Suggest Improvements** - Share insights from your profile

### Project Planning
- **Scope Planning** - Use your preferred scopes for new features
- **Work Distribution** - Understand your typical change patterns
- **Documentation Planning** - Address documentation gaps

## Next Steps

- [Team Insights](team-insights.md) - Apply profiling to team workflows
- [Best Practices](../user-guide/best-practices.md) - Improve based on your profile
- [Enhanced Pattern Recognition](pattern-recognition.md) - Use advanced features