# Git-Smart Documentation

This directory contains the Docusaurus-based documentation for Git-Smart.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## Structure

- `/docs` - Documentation content (Markdown files)
- `/src` - Custom React components and pages
- `/static` - Static assets (images, files)
- `/docusaurus.config.js` - Main configuration file

## Deployment

The documentation is automatically deployed to GitHub Pages when changes are pushed to the main branch.

### Manual Deployment

```bash
# Deploy to GitHub Pages
GIT_USER=your-username npm run deploy
```

## Contributing

1. Edit documentation files in the `/docs` directory
2. Test changes locally with `npm start`
3. Submit a pull request

## Configuration

Key configuration files:

- `docusaurus.config.js` - Main Docusaurus configuration
- `sidebars.js` - Sidebar navigation structure
- `src/css/custom.css` - Custom styling

## Features

- ✅ Responsive design
- ✅ Dark/light mode
- ✅ Search integration (Algolia)
- ✅ Code syntax highlighting
- ✅ Mobile-friendly navigation
- ✅ SEO optimization
- ✅ Social media cards

## Links

- [Documentation Site](https://neabyte.github.io/git-smart/)
- [Docusaurus Documentation](https://docusaurus.io/)
- [Main Git-Smart Repository](https://github.com/NeaDigitra/git-smart)