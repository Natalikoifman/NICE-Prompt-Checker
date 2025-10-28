# Getting Started - NICE Prompt Checker

**Quick 5-minute guide to get the bot running in Microsoft Teams**

## What You'll Need

- ⏱️ **Time**: 15-20 minutes
- 💳 **Azure Account**: Free tier works fine ([Sign up](https://azure.microsoft.com/free/))
- 💬 **Microsoft Teams**: Any Teams account
- 💻 **For local testing**: Node.js 16+ and ngrok

## Choose Your Path

### Path A: I Want to Test Locally First (Recommended)

**Best for**: Developers who want to try it before deploying

1. **Clone and setup**:
   ```bash
   git clone https://github.com/Natalikoifman/NICE-Prompt-Checker.git
   cd NICE-Prompt-Checker
   ./setup.sh
   ```

2. **Create Azure Bot** (5 min):
   - Go to [Azure Portal](https://portal.azure.com)
   - Create "Azure Bot" resource
   - Save the App ID and create a client secret
   - Save the secret value immediately!

3. **Configure**:
   ```bash
   # Edit .env file
   MicrosoftAppId=<your-app-id>
   MicrosoftAppPassword=<your-secret>
   ```

4. **Run locally**:
   ```bash
   npm start
   # In another terminal:
   ngrok http 3978
   ```

5. **Update bot endpoint**:
   - In Azure Bot → Configuration
   - Set endpoint to: `https://your-ngrok-url.ngrok.io/api/messages`

6. **Create Teams package**:
   ```bash
   # Edit appPackage/manifest.json - replace GUIDs
   ./package-app.sh
   ```

7. **Install in Teams**:
   - Teams → Apps → Upload an app
   - Select TeamsAppPackage.zip
   - Click Add!

✅ **Done!** Start chatting with your bot.

---

### Path B: Deploy to Azure Directly

**Best for**: Those who want production deployment immediately

1. **Setup Azure** (10 min):
   - Create Azure Bot (get App ID and secret)
   - Create App Service (Node.js 18)
   - Configure environment variables in App Service

2. **Deploy code** (5 min):
   ```bash
   git clone https://github.com/Natalikoifman/NICE-Prompt-Checker.git
   cd NICE-Prompt-Checker
   az login
   az webapp up --name your-bot-name --resource-group your-rg
   ```

3. **Configure bot endpoint**:
   - Azure Bot → Configuration
   - Set to: `https://your-bot-name.azurewebsites.net/api/messages`

4. **Create and upload Teams package**:
   - Edit manifest.json with IDs
   - Run `./package-app.sh`
   - Upload to Teams

✅ **Done!** Bot is live and running.

---

### Path C: Just Want to See It Work

**Best for**: Quick evaluation without deploying

**Option 1**: Ask someone who already deployed it to add you

**Option 2**: Watch a demo:
1. Read [VISUAL_GUIDE.md](VISUAL_GUIDE.md) to see screenshots
2. Review example interactions
3. Decide if you want to deploy

---

## Quick Reference

| Task | Command/Action |
|------|----------------|
| Install dependencies | `npm install` |
| Start bot locally | `npm start` |
| Create icons | `node src/createIcons.js` |
| Package for Teams | `./package-app.sh` |
| Check syntax | `node -c src/bot.js` |
| View health | `curl http://localhost:3978/health` |

## Common First-Time Issues

### "Bot not responding"
- ✅ Check bot is running (`npm start`)
- ✅ Check endpoint URL is correct
- ✅ Verify App ID and Password match

### "Can't upload to Teams"
- ✅ Check manifest.json is valid JSON
- ✅ Replace all {{PLACEHOLDERS}}
- ✅ Verify icons are included in ZIP

### "Authentication error"
- ✅ Double-check App ID (from Azure Bot)
- ✅ Verify Password hasn't expired
- ✅ Check .env file is loaded

## Next Steps After Setup

1. ✅ Test with sample prompts (see [TESTING.md](TESTING.md))
2. ✅ Share with your team
3. ✅ Collect feedback
4. ✅ Customize analysis rules (edit `src/bot.js`)
5. ✅ Add more features

## Full Documentation

- 📖 [README.md](README.md) - Project overview
- 🚀 [DEPLOYMENT.md](DEPLOYMENT.md) - Complete deployment guide (detailed)
- ✅ [CHECKLIST.md](CHECKLIST.md) - Step-by-step checklist
- 🧪 [TESTING.md](TESTING.md) - Testing instructions
- 👁️ [VISUAL_GUIDE.md](VISUAL_GUIDE.md) - How it looks in Teams
- 🔒 [SECURITY.md](SECURITY.md) - Security considerations

## Getting Help

**Stuck?** Check these:
1. Is Node.js installed? `node --version`
2. Are dependencies installed? `npm install`
3. Is .env file configured?
4. Is ngrok running (for local)?
5. Is bot endpoint reachable?

**Still stuck?**
- Read [DEPLOYMENT.md](DEPLOYMENT.md) for detailed steps
- Check Azure Bot logs
- Review console output
- Open GitHub issue

## Pro Tips

💡 **Use ngrok for testing** - Deploy to Azure only when ready

💡 **Test locally first** - Catch issues before deploying

💡 **Keep secrets safe** - Never commit .env file

💡 **Start simple** - Deploy basic version, then enhance

💡 **Monitor logs** - Use Azure Log Stream or console

## Success Checklist

You know it's working when:
- ✅ Bot responds in Teams
- ✅ Cards display correctly
- ✅ Analysis makes sense
- ✅ No errors in logs
- ✅ Response time < 3 seconds

## Time Estimates

| Task | Time |
|------|------|
| Azure setup | 5-10 min |
| Local setup | 5 min |
| First deployment | 10-15 min |
| Testing | 5-10 min |
| **Total first time** | **25-40 min** |
| **Subsequent deploys** | **5 min** |

---

**Ready? Let's go! 🚀**

Choose your path above and start deploying. You'll have a working bot in Teams within 30 minutes!

For questions: Open an issue or check the full [DEPLOYMENT.md](DEPLOYMENT.md) guide.
