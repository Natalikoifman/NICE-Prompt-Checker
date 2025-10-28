#!/bin/bash

# Script to create Teams app package
# Usage: ./package-app.sh

echo "📦 Creating Teams App Package..."

# Check if required files exist
if [ ! -f "appPackage/manifest.json" ]; then
    echo "❌ Error: manifest.json not found in appPackage/"
    exit 1
fi

if [ ! -f "appPackage/color.png" ]; then
    echo "❌ Error: color.png not found in appPackage/"
    exit 1
fi

if [ ! -f "appPackage/outline.png" ]; then
    echo "❌ Error: outline.png not found in appPackage/"
    exit 1
fi

# Check if placeholders are still in manifest
if grep -q "{{TEAMS_APP_ID}}" appPackage/manifest.json; then
    echo "⚠️  Warning: manifest.json contains placeholder {{TEAMS_APP_ID}}"
    echo "   Please replace it with a real GUID"
    echo "   Generate one at: https://guidgenerator.com"
fi

if grep -q "{{MICROSOFT_APP_ID}}" appPackage/manifest.json; then
    echo "⚠️  Warning: manifest.json contains placeholder {{MICROSOFT_APP_ID}}"
    echo "   Please replace it with your Bot's Microsoft App ID"
fi

# Create package
cd appPackage
zip -q ../TeamsAppPackage.zip manifest.json color.png outline.png
cd ..

if [ -f "TeamsAppPackage.zip" ]; then
    echo "✅ Package created successfully: TeamsAppPackage.zip"
    echo ""
    echo "Next steps:"
    echo "1. Update manifest.json with your App ID and Bot ID (if not done)"
    echo "2. Re-run this script to create updated package"
    echo "3. Upload TeamsAppPackage.zip to Microsoft Teams"
    echo ""
    echo "See DEPLOYMENT.md for detailed instructions"
else
    echo "❌ Error: Failed to create package"
    exit 1
fi
