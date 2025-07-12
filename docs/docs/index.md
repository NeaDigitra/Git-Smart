---
sidebar_position: 1
title: Overview
description: Transform your git commits with AI-powered message generation that works completely offline
slug: /
---

# Git-Smart Documentation

Transform your git commits with AI-powered message generation that works completely offline.

:::tip **v1.1.0 is here!**
Enhanced pattern recognition, deep analysis, and style profiling. [See what's new →](advanced-features/)
:::

## What is Git-Smart?

Git-Smart is an intelligent commit message generator that analyzes your code changes and creates professional, consistent commit messages following conventional commit standards.

### ⚡ Quick Example

```bash
# Traditional workflow
git add src/auth.js
git commit -m "added some auth stuff"  # 😕 Vague and inconsistent

# Git-Smart workflow  
git add src/auth.js
git-smart
# 🎯 "feat(auth): implement JWT token validation"
```

## 🎯 Why Git-Smart?

| Traditional Commits | Git-Smart Commits |
| --- | --- |
| 😕 Inconsistent formats | ✅ Conventional commit standard |
| 😕 Vague descriptions | ✅ Descriptive and specific |
| 😕 Manual effort | ✅ Automated generation |
| 😕 No learning | ✅ Adapts to your style |

## 🚀 Key Features

<div className="row">
  <div className="col col--6">
    <div className="card margin--sm">
      <div className="card__header">
        <h3>🤖 Intelligent Analysis</h3>
      </div>
      <div className="card__body">
        <p>Analyzes code changes, file types, and patterns to understand what you've actually changed</p>
      </div>
    </div>
  </div>
  <div className="col col--6">
    <div className="card margin--sm">
      <div className="card__header">
        <h3>🔒 100% Offline</h3>
      </div>
      <div className="card__body">
        <p>No API keys, external services, or data sharing required. Works completely offline</p>
      </div>
    </div>
  </div>
</div>

<div className="row">
  <div className="col col--6">
    <div className="card margin--sm">
      <div className="card__header">
        <h3>📊 18 Commit Types</h3>
      </div>
      <div className="card__body">
        <p>Complete coverage from feat and fix to security, deps, and performance improvements</p>
      </div>
    </div>
  </div>
  <div className="col col--6">
    <div className="card margin--sm">
      <div className="card__header">
        <h3>🎯 70+ Scopes</h3>
      </div>
      <div className="card__body">
        <p>Precise categorization for frontend, backend, DevOps, testing, and business domains</p>
      </div>
    </div>
  </div>
</div>

<div className="row">
  <div className="col col--6">
    <div className="card margin--sm">
      <div className="card__header">
        <h3>👥 Team Ready</h3>
      </div>
      <div className="card__body">
        <p>Maintains consistency across teams with style analysis and recommendations</p>
      </div>
    </div>
  </div>
  <div className="col col--6">
    <div className="card margin--sm">
      <div className="card__header">
        <h3>⚡ Zero Config</h3>
      </div>
      <div className="card__body">
        <p>Works immediately after installation with no setup or configuration required</p>
      </div>
    </div>
  </div>
</div>

## ✨ v1.1.0 Advanced Features

- **Enhanced Pattern Recognition** - Advanced vocabulary and scope analysis
- **Deep Analysis Mode** - Comprehensive commit history insights  
- **Style Profiling** - Personal style analysis with recommendations
- **Team Insights** - Collaborative workflow optimization

## 🏃‍♂️ Quick Start

```bash
# Install Git-Smart
npm install -g @neabyte/git-smart

# Use in any git repository
git add .
git-smart
```

**Result:** Professional commit messages generated automatically based on your code changes.

## 🎯 Perfect For

- **Individual Developers** - Professional, consistent commit messages
- **Development Teams** - Standardized formats across the team  
- **Open Source Projects** - Professional commit history for contributors
- **Enterprise Teams** - Automated quality and consistency enforcement

## 🌟 Real Impact

> "Git-Smart transformed our team's commit history from inconsistent one-liners to professional, searchable commit messages. Our code reviews became more efficient and our release notes practically write themselves." 
> 
> — Development Team Lead

:::info **Ready to get started?**
Follow our [Getting Started Guide](getting-started/installation) for a complete walkthrough.
:::

## Documentation Structure

<div className="row">
  <div className="col col--4">
    <div className="card margin--sm">
      <div className="card__header">
        <h3>🚀 Getting Started</h3>
      </div>
      <div className="card__body">
        <p>Installation, basic usage, and your first commit</p>
        <a href="getting-started/installation" className="button button--primary button--sm">Get Started</a>
      </div>
    </div>
  </div>
  <div className="col col--4">
    <div className="card margin--sm">
      <div className="card__header">
        <h3>💡 Core Features</h3>
      </div>
      <div className="card__body">
        <p>Intelligent analysis, commit types, and interactive mode</p>
        <a href="core-features/intelligent-analysis" className="button button--primary button--sm">Learn More</a>
      </div>
    </div>
  </div>
  <div className="col col--4">
    <div className="card margin--sm">
      <div className="card__header">
        <h3>🧠 Advanced Features</h3>
      </div>
      <div className="card__body">
        <p>v1.1.0 enhanced pattern recognition and analytics</p>
        <a href="advanced-features/pattern-recognition" className="button button--primary button--sm">Explore</a>
      </div>
    </div>
  </div>
</div>

<div className="row">
  <div className="col col--4">
    <div className="card margin--sm">
      <div className="card__header">
        <h3>📘 User Guide</h3>
      </div>
      <div className="card__body">
        <p>Complete CLI reference and best practices</p>
        <a href="user-guide/cli-reference" className="button button--primary button--sm">Reference</a>
      </div>
    </div>
  </div>
  <div className="col col--4">
    <div className="card margin--sm">
      <div className="card__header">
        <h3>👥 Team Collaboration</h3>
      </div>
      <div className="card__body">
        <p>Maintaining consistency across development teams</p>
        <a href="team-collaboration/style-guides" className="button button--primary button--sm">Collaborate</a>
      </div>
    </div>
  </div>
  <div className="col col--4">
    <div className="card margin--sm">
      <div className="card__header">
        <h3>🔧 API Reference</h3>
      </div>
      <div className="card__body">
        <p>Developer documentation for programmatic usage</p>
        <a href="api-reference/gitsmart" className="button button--primary button--sm">API Docs</a>
      </div>
    </div>
  </div>
</div>