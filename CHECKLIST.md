# Deployment Checklist

Use this checklist to ensure you've completed all steps for deploying NICE Prompt Checker to Microsoft Teams.

## Prerequisites ✓

- [ ] Azure account created (free tier is fine for testing)
- [ ] Microsoft Teams access (organization or personal)
- [ ] Node.js 16+ installed locally
- [ ] Git installed (for cloning repository)

## Azure Bot Service Setup

- [ ] Created Azure Bot resource
- [ ] Noted down Microsoft App ID
- [ ] Created client secret
- [ ] Saved client secret value (it's only shown once!)
- [ ] Set bot pricing tier (F0 for free testing)

## Local Development Setup

- [ ] Cloned repository
- [ ] Ran `npm install`
- [ ] Created `.env` file from `.env.sample`
- [ ] Added MicrosoftAppId to `.env`
- [ ] Added MicrosoftAppPassword to `.env`
- [ ] Generated app icons (run `node src/createIcons.js` if needed)

## Bot Deployment

Choose one option:

### Option A: Azure App Service (Production)
- [ ] Created Azure App Service
- [ ] Selected Node.js runtime
- [ ] Configured environment variables in App Service
- [ ] Deployed code to Azure (via CLI, VS Code, or GitHub Actions)
- [ ] Verified app is running (check /health endpoint)
- [ ] Updated bot messaging endpoint in Azure Bot Service
- [ ] Tested bot endpoint responds

### Option B: Local with ngrok (Testing)
- [ ] Downloaded and installed ngrok
- [ ] Started bot locally with `npm start`
- [ ] Started ngrok with `ngrok http 3978`
- [ ] Copied ngrok HTTPS URL
- [ ] Updated bot messaging endpoint to ngrok URL
- [ ] Tested bot responds (check console logs)

## Teams App Package

- [ ] Generated new GUID for Teams App ID (https://guidgenerator.com)
- [ ] Opened `appPackage/manifest.json`
- [ ] Replaced `{{TEAMS_APP_ID}}` with generated GUID
- [ ] Replaced `{{MICROSOFT_APP_ID}}` with Bot's Microsoft App ID
- [ ] Verified manifest.json is valid JSON
- [ ] Verified icons exist (color.png and outline.png)
- [ ] Created app package (run `./package-app.sh` or zip manually)
- [ ] Verified TeamsAppPackage.zip was created

## Teams Installation

Choose your distribution method:

### Sideload (Personal Testing)
- [ ] Opened Microsoft Teams
- [ ] Clicked Apps → Manage your apps
- [ ] Clicked Upload an app → Upload a custom app
- [ ] Selected TeamsAppPackage.zip
- [ ] Clicked Add
- [ ] Bot appears in chat list

### Organization Upload (Team Testing)
- [ ] Opened Teams Admin Center
- [ ] Navigated to Teams apps → Manage apps
- [ ] Clicked Upload
- [ ] Selected TeamsAppPackage.zip
- [ ] Configured permissions
- [ ] Published to organization
- [ ] Informed team members

### App Store Submission (Public)
- [ ] Prepared submission materials
- [ ] Created Partner Center account
- [ ] Submitted app for validation
- [ ] Addressed validation feedback
- [ ] App approved and published

## Testing

- [ ] Sent first message to bot
- [ ] Received welcome message
- [ ] Sent good survey prompt (high scores)
- [ ] Sent biased prompt (low bias score)
- [ ] Sent leading question (detected)
- [ ] Sent double-barreled question (detected)
- [ ] Sent long prompt (complexity warning)
- [ ] Sent prompt without question mark (clarity issue)
- [ ] Tested on desktop Teams
- [ ] Tested on web Teams
- [ ] Tested on mobile Teams (if available)
- [ ] Verified cards display correctly
- [ ] Checked response times (< 3 seconds)

## Documentation

- [ ] Updated README.md with any custom instructions
- [ ] Shared TESTING.md with testers
- [ ] Shared DEPLOYMENT.md with admin/deployer
- [ ] Created internal documentation (if needed)
- [ ] Added bot to team documentation/wiki

## Security & Compliance

- [ ] Reviewed SECURITY.md
- [ ] Stored credentials securely (not in code)
- [ ] Set up Azure Key Vault (for production)
- [ ] Enabled HTTPS only
- [ ] Reviewed bot permissions
- [ ] Checked data handling compliance
- [ ] Set up monitoring/logging (Azure Application Insights)

## Maintenance

- [ ] Set up automated dependency updates (Dependabot)
- [ ] Created backup of configuration
- [ ] Documented rollback procedure
- [ ] Set calendar reminder to check for updates
- [ ] Identified support contact person

## Optional Enhancements

- [ ] Integrated Azure OpenAI for advanced analysis
- [ ] Set up CI/CD pipeline
- [ ] Added conversation history
- [ ] Implemented batch analysis
- [ ] Created analytics dashboard
- [ ] Added multi-language support
- [ ] Integrated with survey platforms

## Troubleshooting Completed

If you encountered issues, check these:

- [ ] Bot endpoint is accessible (test with curl)
- [ ] Environment variables are set correctly
- [ ] App ID and password match
- [ ] Manifest JSON is valid
- [ ] Icons are correct size (192x192 and 32x32)
- [ ] Bot is started and running
- [ ] Firewall allows connections
- [ ] HTTPS is used (not HTTP)

## Success Criteria

Your deployment is successful when:

- ✅ Bot responds to messages in Teams within 3 seconds
- ✅ Analysis cards display correctly
- ✅ All test scenarios pass
- ✅ No errors in bot logs
- ✅ Multiple users can use the bot simultaneously
- ✅ Bot is available 24/7 (if production)

## Next Steps

After successful deployment:

1. Share bot with initial user group
2. Collect feedback
3. Monitor usage and errors
4. Plan feature enhancements
5. Regular maintenance checks

---

**Deployment Date**: ___________

**Deployed By**: ___________

**Environment**: [ ] Production [ ] Staging [ ] Testing

**Notes**:
