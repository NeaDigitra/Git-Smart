#!/bin/bash

# 📚 Git-Smart Documentation Deployment Verification Script
# This script helps verify that the documentation deployment is working correctly

set -e

echo "🔍 Git-Smart Documentation Deployment Verification"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
DOCS_URL="https://neadigitra.github.io/Git-Smart/"
REPO_URL="https://github.com/NeaDigitra/Git-Smart"

echo ""
echo "📋 Checking prerequisites..."

# Check if we're in a Git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo -e "${RED}❌ Not in a Git repository${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Git repository detected${NC}"

# Check if docs directory exists
if [ ! -d "docs" ]; then
    echo -e "${RED}❌ docs/ directory not found${NC}"
    exit 1
fi

echo -e "${GREEN}✅ docs/ directory found${NC}"

# Check if GitHub Actions workflow exists
if [ ! -f ".github/workflows/deploy-docs.yml" ]; then
    echo -e "${RED}❌ GitHub Actions workflow not found${NC}"
    echo -e "${YELLOW}   Expected: .github/workflows/deploy-docs.yml${NC}"
    exit 1
fi

echo -e "${GREEN}✅ GitHub Actions workflow found${NC}"

# Check if package.json exists in docs
if [ ! -f "docs/package.json" ]; then
    echo -e "${RED}❌ docs/package.json not found${NC}"
    exit 1
fi

echo -e "${GREEN}✅ docs/package.json found${NC}"

# Check if docusaurus.config.js exists
if [ ! -f "docs/docusaurus.config.js" ]; then
    echo -e "${RED}❌ docs/docusaurus.config.js not found${NC}"
    exit 1
fi

echo -e "${GREEN}✅ docusaurus.config.js found${NC}"

echo ""
echo "🔧 Checking configuration..."

# Check GitHub Pages configuration in docusaurus.config.js
if grep -q "neadigitra.github.io" docs/docusaurus.config.js; then
    echo -e "${GREEN}✅ GitHub Pages URL configured correctly${NC}"
else
    echo -e "${YELLOW}⚠️  GitHub Pages URL might need configuration${NC}"
fi

if grep -q "Git-Smart" docs/docusaurus.config.js; then
    echo -e "${GREEN}✅ Project name configured correctly${NC}"
else
    echo -e "${YELLOW}⚠️  Project name might need configuration${NC}"
fi

echo ""
echo "🌐 Testing documentation site..."

# Check if documentation site is accessible
if command -v curl > /dev/null 2>&1; then
    HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$DOCS_URL" || echo "000")
    
    if [ "$HTTP_STATUS" = "200" ]; then
        echo -e "${GREEN}✅ Documentation site is live and accessible${NC}"
        echo -e "${BLUE}   🔗 ${DOCS_URL}${NC}"
    elif [ "$HTTP_STATUS" = "404" ]; then
        echo -e "${YELLOW}⚠️  Documentation site not found (404)${NC}"
        echo -e "${YELLOW}   This is normal if you haven't deployed yet${NC}"
        echo -e "${BLUE}   Expected URL: ${DOCS_URL}${NC}"
    else
        echo -e "${YELLOW}⚠️  Documentation site returned HTTP ${HTTP_STATUS}${NC}"
        echo -e "${BLUE}   URL: ${DOCS_URL}${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  curl not available - cannot test site accessibility${NC}"
    echo -e "${BLUE}   Manual check: ${DOCS_URL}${NC}"
fi

echo ""
echo "📝 Deployment checklist:"
echo ""
echo "1. ✅ Files are ready for deployment"
echo "2. 📤 Next step: Push changes to trigger deployment"
echo ""
echo -e "${BLUE}Commands to deploy:${NC}"
echo ""
echo "   git add ."
echo "   git commit -m \"docs: setup Docusaurus documentation with GitHub Pages\""
echo "   git push origin main"
echo ""
echo -e "${BLUE}After pushing:${NC}"
echo ""
echo "1. 🔗 Go to: ${REPO_URL}/settings/pages"
echo "2. 📋 Set Source to: 'GitHub Actions'"
echo "3. ⏱️  Wait 5-10 minutes for deployment"
echo "4. 🌐 Visit: ${DOCS_URL}"
echo ""
echo -e "${GREEN}🎉 Documentation setup verification complete!${NC}"

# Check if we should run local development server
echo ""
read -p "🚀 Would you like to start the local development server? (y/N): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "🏃 Starting local development server..."
    echo "📁 Navigate to: http://localhost:3000"
    echo "⏹️  Press Ctrl+C to stop"
    echo ""
    
    cd docs
    
    # Check if node_modules exists
    if [ ! -d "node_modules" ]; then
        echo "📦 Installing dependencies..."
        npm install
    fi
    
    echo "🚀 Starting server..."
    npm start
else
    echo ""
    echo "ℹ️  To start local development later:"
    echo "   cd docs && npm install && npm start"
    echo ""
    echo "✨ Happy documenting!"
fi