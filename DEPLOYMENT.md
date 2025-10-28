# NICE Prompt Checker - Teams Deployment Guide

This guide explains how to deploy the NICE Prompt Checker bot to Microsoft Teams and share it for testing.

## Overview

NICE Prompt Checker is an AI-powered bot that helps analyze, validate, and improve survey prompts. It provides instant feedback on:
- Clarity and readability
- Potential bias
- Leading or loaded language
- Double-barreled questions
- Overall effectiveness

## Prerequisites

Before deploying, you need:

1. **Azure Account** - [Sign up for free](https://azure.microsoft.com/free/)
2. **Microsoft 365 Developer Account** - For Teams testing (if needed)
3. **Node.js** - Version 16.x or later
4. **Microsoft Teams** - Desktop or web client

## Step 1: Create Azure Bot Service

### 1.1 Create a Bot Registration

1. Go to [Azure Portal](https://portal.azure.com)
2. Click "Create a resource"
3. Search for "Azure Bot" and select it
4. Click "Create"
5. Fill in the details:
   - **Bot handle**: `nice-prompt-checker` (or your preferred name)
   - **Subscription**: Select your subscription
   - **Resource group**: Create new or use existing
   - **Pricing tier**: F0 (Free) for testing
   - **Microsoft App ID**: Create new Microsoft App ID
6. Click "Review + create" and then "Create"

### 1.2 Get Bot Credentials

1. Once created, go to the bot resource
2. Navigate to "Configuration" in the left menu
3. Note down:
   - **Microsoft App ID** (shown on the page)
4. Click "Manage" next to the Microsoft App ID
5. In the "Certificates & secrets" tab:
   - Click "New client secret"
   - Add description: "Teams Bot Secret"
   - Select expiration period
   - Click "Add"
   - **IMPORTANT**: Copy the secret **Value** immediately (it won't be shown again)

## Step 2: Deploy the Bot

### Option A: Deploy to Azure (Recommended for Production)

#### 2.1 Create Azure App Service

1. In Azure Portal, create a new "Web App"
2. Configure:
   - **Name**: `nice-prompt-checker-bot`
   - **Runtime**: Node 18 LTS
   - **Region**: Choose nearest region
   - **Pricing**: F1 (Free) or higher
3. Create the resource

#### 2.2 Deploy Code

Using Azure CLI:
```bash
# Install Azure CLI if needed
# https://docs.microsoft.com/cli/azure/install-azure-cli

# Login to Azure
az login

# Deploy the code
cd /path/to/NICE-Prompt-Checker
az webapp up --name nice-prompt-checker-bot --resource-group <your-resource-group>
```

Or use VS Code with Azure App Service extension:
1. Install "Azure App Service" extension
2. Right-click on the web app
3. Select "Deploy to Web App"

#### 2.3 Configure Environment Variables

In Azure Portal, go to your App Service:
1. Navigate to "Configuration" → "Application settings"
2. Add the following settings:
   - `MicrosoftAppId`: Your Bot's App ID
   - `MicrosoftAppPassword`: Your Bot's App Secret
   - `MicrosoftAppType`: `MultiTenant`
   - `PORT`: `8080` (or as configured in Azure)

3. Click "Save"

#### 2.4 Update Bot Endpoint

1. Go back to your Azure Bot resource
2. Navigate to "Configuration"
3. Set the **Messaging endpoint** to: `https://<your-app-name>.azurewebsites.net/api/messages`
4. Click "Apply"

### Option B: Local Testing with ngrok

For quick testing without Azure deployment:

1. **Install ngrok**: Download from [ngrok.com](https://ngrok.com)

2. **Create .env file**:
```bash
cd /path/to/NICE-Prompt-Checker
cp .env.sample .env
```

Edit `.env` and add your credentials:
```
MicrosoftAppId=<your-app-id>
MicrosoftAppPassword=<your-app-secret>
MicrosoftAppType=MultiTenant
PORT=3978
```

3. **Install dependencies**:
```bash
npm install
```

4. **Start the bot**:
```bash
npm start
```

5. **Start ngrok** (in a new terminal):
```bash
ngrok http 3978
```

6. **Update Bot Endpoint**:
   - Copy the HTTPS URL from ngrok (e.g., `https://abc123.ngrok.io`)
   - In Azure Bot Service Configuration, set messaging endpoint to: `https://abc123.ngrok.io/api/messages`
   - Click "Apply"

## Step 3: Prepare Teams App Package

### 3.1 Update Manifest

1. Open `appPackage/manifest.json`
2. Replace placeholders:
   - `{{TEAMS_APP_ID}}`: Generate a new GUID at [guidgenerator.com](https://guidgenerator.com)
   - `{{MICROSOFT_APP_ID}}`: Use your Bot's Microsoft App ID from Step 1.2

Example:
```json
"id": "12345678-1234-1234-1234-123456789abc",
"bots": [
  {
    "botId": "your-microsoft-app-id-here",
    ...
  }
]
```

### 3.2 Create App Package ZIP

```bash
cd appPackage
zip -r ../TeamsAppPackage.zip manifest.json color.png outline.png
cd ..
```

Or on Windows:
1. Navigate to the `appPackage` folder
2. Select `manifest.json`, `color.png`, and `outline.png`
3. Right-click → Send to → Compressed (zipped) folder
4. Name it `TeamsAppPackage.zip`

## Step 4: Install in Microsoft Teams

### Method 1: Sideload for Personal Testing

1. Open **Microsoft Teams** (desktop or web)
2. Click on "Apps" in the left sidebar
3. Click "Manage your apps" at the bottom
4. Click "Upload an app" → "Upload a custom app"
5. Select your `TeamsAppPackage.zip` file
6. Click "Add" to install for yourself
7. The bot should now appear in your Teams chat list

### Method 2: Share with Your Team

If you have permissions to upload apps to your organization:

1. Go to **Teams Admin Center** (admin.teams.microsoft.com)
2. Navigate to "Teams apps" → "Manage apps"
3. Click "Upload" and select your `TeamsAppPackage.zip`
4. Once uploaded, go to "Permission policies"
5. Add the app to an allowed apps list
6. Share the app name with your team members

They can then:
1. Go to Teams → Apps
2. Search for "Prompt Checker"
3. Click "Add"

### Method 3: Submit to App Store (For Wide Distribution)

For organization-wide or public distribution:

1. Prepare for submission:
   - Ensure compliance with [Teams app validation guidelines](https://docs.microsoft.com/microsoftteams/platform/concepts/deploy-and-publish/appsource/prepare/teams-store-validation-guidelines)
   - Update privacy policy and terms of use URLs
   - Add comprehensive testing

2. Submit to Partner Center:
   - Go to [Partner Center](https://partner.microsoft.com)
   - Create a new offer for Microsoft Teams app
   - Upload your package
   - Complete validation process

## Step 5: Testing the Bot

### Basic Testing

1. Open the bot in Teams
2. Type a sample survey question, for example:
   ```
   Don't you think that employees should always work overtime without extra pay?
   ```

3. The bot should respond with an analysis card showing:
   - Clarity and bias scores
   - Issues detected (this example has bias and leading language)
   - Suggestions for improvement

### Test Cases

Try these prompts to verify functionality:

**Good Prompt:**
```
How satisfied are you with your current work-life balance?
```

**Biased Prompt:**
```
Obviously, everyone loves working from home. How much do you love it?
```

**Double-barreled:**
```
How satisfied are you with the salary and benefits?
```

**Too Long:**
```
Considering all the various factors including but not limited to compensation, work environment, team dynamics, management style, career growth opportunities, and work-life balance, how would you rate your overall satisfaction?
```

**Missing Question Mark:**
```
What is your preferred communication method
```

## Troubleshooting

### Bot not responding

1. Check bot endpoint in Azure Bot Service Configuration
2. Verify environment variables are set correctly
3. Check bot logs:
   - Azure: Go to App Service → Log Stream
   - Local: Check console output

### "Unable to reach app" error

1. Verify the messaging endpoint is accessible
2. Test endpoint health: `https://your-endpoint.com/health`
3. Check firewall/security group settings in Azure

### Authentication errors

1. Verify MicrosoftAppId and MicrosoftAppPassword are correct
2. Ensure the app password hasn't expired
3. Check that MicrosoftAppType is set to "MultiTenant"

### Manifest validation errors

1. Validate JSON syntax at [jsonlint.com](https://jsonlint.com)
2. Ensure all required fields are filled
3. Check that icon files are correct size:
   - color.png: 192x192 pixels
   - outline.png: 32x32 pixels
4. Verify GUID format for app ID

## Updating the Bot

To update after deployment:

1. **Update Code**: Make changes to bot logic in `src/bot.js`
2. **Test Locally**: Run locally with ngrok first
3. **Deploy Changes**:
   - Azure: Use `az webapp up` or VS Code deployment
   - The app will auto-restart
4. **Update Manifest** (if needed):
   - Increment version in `manifest.json`
   - Create new ZIP package
   - Update app in Teams (Admin Center → Manage apps → Update)

## Security Notes

- **Never commit** `.env` file with real credentials
- Store secrets in Azure Key Vault for production
- Rotate app passwords regularly
- Use Azure Managed Identity when possible
- Review and follow [Microsoft Security Best Practices](https://docs.microsoft.com/security)

## Support

For issues or questions:
- Check [Microsoft Teams Platform docs](https://docs.microsoft.com/microsoftteams/platform)
- Review [Bot Framework documentation](https://docs.microsoft.com/azure/bot-service)
- Open an issue on the [GitHub repository](https://github.com/Natalikoifman/NICE-Prompt-Checker)

## Next Steps

- Add Azure OpenAI integration for more advanced analysis
- Implement conversation history
- Add support for batch analysis
- Create reporting dashboard
- Integrate with survey platforms

---

**Note**: This guide assumes basic familiarity with Azure and Microsoft Teams. For detailed Azure setup, refer to [Azure Bot Service documentation](https://docs.microsoft.com/azure/bot-service).
