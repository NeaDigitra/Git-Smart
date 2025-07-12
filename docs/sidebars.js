/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a "Next" and "Previous" button
 - automatically add a table of contents to the right side of the page

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'index',
      label: 'Overview',
    },
    {
      type: 'category',
      label: '🚀 Getting Started',
      items: [
        'getting-started/installation',
        'getting-started/basic-usage',
        'getting-started/first-commit',
      ],
      collapsed: false,
    },
    {
      type: 'category',
      label: '💡 Core Features',
      items: [
        'core-features/intelligent-analysis',
        'core-features/commit-types',
        'core-features/actions-scopes',
        'core-features/interactive-mode',
      ],
      collapsed: false,
    },
    {
      type: 'category',
      label: '🧠 Advanced Features',
      items: [
        'advanced-features/pattern-recognition',
        'advanced-features/deep-analysis',
        'advanced-features/style-profiling',
        'advanced-features/team-insights',
        'advanced-features/confidence-scoring',
      ],
    },
    {
      type: 'category',
      label: '📘 User Guide',
      items: [
        'user-guide/cli-reference',
        'user-guide/configuration',
        'user-guide/best-practices',
        'user-guide/troubleshooting',
      ],
    },
    {
      type: 'category',
      label: '👥 Team Collaboration',
      items: [
        'team-collaboration/style-guides',
        'team-collaboration/consistency',
        'team-collaboration/cicd-integration',
      ],
    },
    {
      type: 'category',
      label: '🔧 API Reference',
      items: [
        'api-reference/gitsmart',
        'api-reference/history-analyzer',
        'api-reference/diff-analyzer',
        'api-reference/message-generator',
      ],
    },
    {
      type: 'category',
      label: '💼 Examples & Use Cases',
      items: [
        'examples/real-world',
        'examples/project-types',
        'examples/workflows',
      ],
    },
    {
      type: 'category',
      label: '🔄 Migration & Updates',
      items: [
        'migration/upgrade-v1.1.0',
        'migration/breaking-changes',
        'migration/changelog',
      ],
    },
  ],
};

module.exports = sidebars;