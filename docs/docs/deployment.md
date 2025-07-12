---
sidebar_position: 100
title: Documentation Deployment
description: Guide for deploying Git-Smart documentation with Docusaurus
---

# Documentation Deployment

This guide covers how to deploy the Git-Smart documentation using Docusaurus.

## Quick Start

### Prerequisites

- Node.js 16.0 or higher
- npm or yarn package manager

### Installation

```bash
# Navigate to docs directory
cd docs

# Install dependencies
npm install

# Start development server
npm start
```

The documentation will be available at `http://localhost:3000`.

### Building for Production

```bash
# Build static files
npm run build

# Serve built files locally (optional)
npm run serve
```

## Deployment Options

### GitHub Pages

1. **Configure GitHub Pages in `docusaurus.config.js`:**

```javascript
const config = {
  url: 'https://your-username.github.io',
  baseUrl: '/git-smart/',
  organizationName: 'your-username',
  projectName: 'git-smart',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,
};
```

2. **Deploy:**

```bash
# Set up deployment
GIT_USER=your-username npm run deploy
```

3. **GitHub Actions (Recommended):**

Create `.github/workflows/docs-deploy.yml`:

```yaml
name: Deploy Documentation

on:
  push:
    branches: [main]
    paths: ['docs/**']

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: npm
          cache-dependency-path: docs/package-lock.json
          
      - name: Install dependencies
        run: cd docs && npm ci
        
      - name: Build documentation
        run: cd docs && npm run build
        
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./docs/build
```

### Netlify

1. **Connect your repository to Netlify**
2. **Set build settings:**
   - Build command: `cd docs && npm run build`
   - Publish directory: `docs/build`

### Vercel

1. **Install Vercel CLI:**

```bash
npm install -g vercel
```

2. **Deploy:**

```bash
cd docs
vercel
```

3. **Configure `vercel.json`:**

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "installCommand": "npm install"
}
```

## Customization

### Theme Configuration

Edit `docs/docusaurus.config.js` to customize:

- Colors and branding
- Navigation structure
- Footer content
- Search integration
- Analytics

### Content Management

- **Docs**: Add markdown files in `docs/docs/`
- **Blog**: Enable blog in config and add posts to `docs/blog/`
- **Pages**: Create custom pages in `docs/src/pages/`

### Search Integration

#### Algolia DocSearch (Recommended)

1. **Apply for DocSearch:** https://docsearch.algolia.com/apply/
2. **Configure in `docusaurus.config.js`:**

```javascript
themeConfig: {
  algolia: {
    appId: 'YOUR_APP_ID',
    apiKey: 'YOUR_SEARCH_API_KEY',
    indexName: 'git-smart',
  },
}
```

## Content Structure

```
docs/
├── docs/                          # Documentation content
│   ├── getting-started/           # Getting started guides
│   ├── core-features/            # Core feature documentation
│   ├── advanced-features/        # Advanced features
│   ├── user-guide/              # User guides and references
│   ├── team-collaboration/      # Team features
│   ├── api-reference/           # API documentation
│   ├── examples/                # Examples and use cases
│   └── migration/               # Migration guides
├── static/                       # Static assets
│   └── img/                     # Images and logos
├── src/                         # Custom React components
│   ├── css/                     # Custom CSS
│   └── pages/                   # Custom pages
└── docusaurus.config.js         # Main configuration
```

## Maintenance

### Regular Updates

1. **Keep Docusaurus updated:**

```bash
npm update @docusaurus/core @docusaurus/preset-classic
```

2. **Monitor build performance:**

```bash
npm run build -- --bundle-analyzer
```

3. **Check for broken links:**

```bash
npm run build -- --fail-on-warning
```

### Content Guidelines

- Use consistent formatting across all pages
- Include code examples and practical demonstrations
- Maintain proper cross-referencing between sections
- Update screenshots and examples regularly

## Analytics

### Google Analytics

Add to `docusaurus.config.js`:

```javascript
themeConfig: {
  gtag: {
    trackingID: 'G-XXXXXXXXXX',
    anonymizeIP: true,
  },
}
```

### Performance Monitoring

Monitor page load times and user engagement:

- Use Lighthouse for performance audits
- Monitor Core Web Vitals
- Track documentation usage patterns

## Troubleshooting

### Common Issues

1. **Build failures:**
   - Check Node.js version compatibility
   - Clear cache: `npm run clear`
   - Verify markdown syntax

2. **Deployment issues:**
   - Check GitHub Pages settings
   - Verify base URL configuration
   - Ensure all assets are properly referenced

3. **Search not working:**
   - Verify Algolia configuration
   - Check index status
   - Test search queries

### Performance Optimization

1. **Image optimization:**
   - Use WebP format when possible
   - Compress images before adding
   - Use appropriate image sizes

2. **Bundle optimization:**
   - Review bundle analyzer output
   - Remove unused dependencies
   - Enable compression in hosting

3. **Content optimization:**
   - Use proper heading hierarchy
   - Optimize page loading with lazy loading
   - Minimize large code blocks

## Contributing

To contribute to the documentation:

1. Fork the repository
2. Create a feature branch
3. Make your changes in the `docs/` directory
4. Test locally with `npm start`
5. Submit a pull request

### Writing Guidelines

- Use clear, concise language
- Include practical examples
- Follow the established structure
- Test all code examples
- Update navigation when adding new sections

## Support

For documentation-related issues:

- Check the [Docusaurus documentation](https://docusaurus.io/)
- Create an issue in the Git-Smart repository
- Contact the maintainers for major changes