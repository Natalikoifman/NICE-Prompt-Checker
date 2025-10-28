#!/bin/bash

# Quick setup script for NICE Prompt Checker
# This script helps you set up the project for local development

echo "🚀 NICE Prompt Checker - Quick Setup"
echo "===================================="
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    echo "   Please install Node.js 16+ from https://nodejs.org"
    exit 1
fi

NODE_VERSION=$(node -v)
echo "✅ Node.js $NODE_VERSION found"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed"
    exit 1
fi

echo "✅ npm found"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed"
echo ""

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file from template..."
    cp .env.sample .env
    echo "✅ Created .env file"
    echo "⚠️  Please edit .env and add your Azure Bot credentials"
    echo ""
else
    echo "ℹ️  .env file already exists"
    echo ""
fi

# Check if icons exist, create if needed
if [ ! -f "appPackage/color.png" ] || [ ! -f "appPackage/outline.png" ]; then
    echo "🎨 Creating app icons..."
    node src/createIcons.js
    if [ $? -eq 0 ]; then
        echo "✅ Icons created"
    else
        echo "⚠️  Icon creation had warnings (this is usually okay)"
    fi
    echo ""
fi

echo "✨ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env with your Azure Bot credentials"
echo "   - MicrosoftAppId"
echo "   - MicrosoftAppPassword"
echo ""
echo "2. Update appPackage/manifest.json:"
echo "   - Replace {{TEAMS_APP_ID}} with a new GUID"
echo "   - Replace {{MICROSOFT_APP_ID}} with your Bot's App ID"
echo ""
echo "3. Start the bot:"
echo "   npm start"
echo ""
echo "4. For local testing with Teams:"
echo "   - Install ngrok: https://ngrok.com"
echo "   - Run: ngrok http 3978"
echo "   - Update bot endpoint in Azure"
echo ""
echo "5. Create Teams package:"
echo "   ./package-app.sh"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions"
