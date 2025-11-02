# NICE Prompt Checker

AI-powered Microsoft Teams bot for analyzing, validating, and generating survey prompts. Helps create effective, unbiased, and clear survey questions.

## Features

- **Clarity Analysis**: Checks if questions are clear and easy to understand
- **Bias Detection**: Identifies potentially biased or leading language
- **Double-Barreled Detection**: Catches questions asking multiple things at once
- **Length Assessment**: Flags questions that are too long or complex
- **File Upload Support**: Upload and analyze Excel (.xlsx, .xls), Word (.docx, .doc), and PDF files
- **Instant Feedback**: Get actionable suggestions in real-time

## Quick Start

### For Testing (Local Development)

1. **Prerequisites**:
   - Node.js 16+ installed
   - Microsoft Azure account
   - ngrok for local testing

2. **Setup**:
   ```bash
   # Clone the repository
   git clone https://github.com/Natalikoifman/NICE-Prompt-Checker.git
   cd NICE-Prompt-Checker
   
   # Install dependencies
   npm install
   
   # Configure environment
   cp .env.sample .env
   # Edit .env with your Azure Bot credentials
   
   # Start the bot
   npm start
   ```

3. **Deploy to Teams**:
   - Follow the detailed instructions in [DEPLOYMENT.md](DEPLOYMENT.md)

### For End Users

1. Open Microsoft Teams
2. Click on "Apps" in the sidebar
3. Search for "NICE Prompt Checker" (if published) or upload the app package
4. Click "Add" to install
5. Start chatting with the bot!

## How It Works

Send your survey prompt to the bot as text or upload a file, and it will analyze:

**Example - Text Input:**
```
Don't you agree that employees should always work overtime?
```

**Example - File Upload:**
- Upload Excel files (.xlsx, .xls) containing survey questions
- Upload Word documents (.docx, .doc) with survey content
- Upload PDF files (.pdf) with survey questions

**Bot Response:**
- Clarity Score: 7/10 ⚠️
- Bias Score: 3/10 ❌
- Issues: Leading question detected, biased language
- Suggestions: Remove "Don't you agree", replace "always" with neutral language

## Documentation

- **[Deployment Guide](DEPLOYMENT.md)** - Complete setup and deployment instructions
- **[Architecture](#architecture)** - How the bot works
- **[Contributing](#contributing)** - How to contribute

## Architecture

The bot is built with:
- **Bot Framework SDK**: Microsoft Bot Framework for Teams integration
- **Node.js**: Runtime environment
- **Restify**: HTTP server
- **Adaptive Cards**: Rich, interactive responses in Teams
- **File Parsing Libraries**: xlsx, mammoth, pdf-parse for document processing

### Project Structure

```
NICE-Prompt-Checker/
├── src/
│   ├── index.js          # Bot server entry point
│   ├── bot.js            # Bot logic and prompt analysis
│   ├── fileParser.js     # File parsing for Excel, Word, PDF
│   └── createIcons.js    # Icon generation utility
├── appPackage/
│   ├── manifest.json     # Teams app manifest
│   ├── color.png         # App icon (192x192)
│   └── outline.png       # App icon (32x32)
├── .env.sample           # Environment variables template
├── package.json          # Node.js dependencies
├── DEPLOYMENT.md         # Deployment guide
└── README.md            # This file
```

## Analysis Features

### Clarity Checks
- Question mark presence
- Sentence length and complexity
- Word count analysis
- Readability assessment

### Bias Detection
- Absolute terms (always, never, obviously)
- Leading language (don't you, wouldn't you)
- Loaded questions
- Suggestive phrasing

### Best Practices
- Single-topic questions
- Neutral language
- Appropriate length
- Clear intent

## Configuration

Environment variables (in `.env`):

```bash
# Required
MicrosoftAppId=<your-bot-app-id>
MicrosoftAppPassword=<your-bot-app-password>
MicrosoftAppType=MultiTenant

# Optional
PORT=3978
AZURE_OPENAI_API_KEY=<for-advanced-ai-features>
```

## Extending the Bot

To add more analysis features:

1. Edit `src/bot.js`
2. Add new checks in the `analyzePrompt()` method
3. Update the response card format as needed
4. Test locally, then redeploy

Example - Adding sentiment analysis:
```javascript
analyzeSentiment(prompt) {
    // Your sentiment analysis logic
    return score;
}
```

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Using File Upload

The bot can analyze survey questions from uploaded files:

**Supported File Types:**
- Excel files: `.xlsx`, `.xls`
- Word documents: `.docx`, `.doc`
- PDF files: `.pdf`

**How to Upload:**
1. In Teams, click the paperclip icon in the chat
2. Select your file (Excel, Word, or PDF)
3. Send the file to the bot
4. The bot will extract text content and analyze it

**What Gets Analyzed:**
- Excel: All text from all sheets
- Word: All document text content
- PDF: All extracted text from the document

## Testing

Test the bot with these sample prompts:

**Good Examples:**
- "How satisfied are you with your current workspace?"
- "On a scale of 1-10, how would you rate the training program?"

**Bad Examples:**
- "Don't you think management should listen more?" (Leading)
- "How are the salary and benefits?" (Double-barreled)
- "Obviously the new policy is better, right?" (Biased)

## License

MIT License - See LICENSE file for details

## Support

- **Issues**: [GitHub Issues](https://github.com/Natalikoifman/NICE-Prompt-Checker/issues)
- **Documentation**: See [DEPLOYMENT.md](DEPLOYMENT.md)
- **Teams Platform**: [Microsoft Teams Platform Docs](https://docs.microsoft.com/microsoftteams/platform)

## Acknowledgments

Built with Microsoft Bot Framework and Teams Platform APIs.

---

**Ready to improve your survey questions? [Get Started with Deployment →](DEPLOYMENT.md)**
