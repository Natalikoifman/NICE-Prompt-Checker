# Visual Guide - NICE Prompt Checker in Teams

This guide shows what the bot looks like when deployed in Microsoft Teams.

## Installation Process

### 1. Upload App Package
When you upload the TeamsAppPackage.zip file to Teams:
- Go to Apps → Manage your apps
- Click "Upload an app"
- Select TeamsAppPackage.zip
- Click "Add"

### 2. Bot Appears in Chat List
The bot will appear with:
- **Icon**: Blue background with checkmark (✓) and "NICE" text
- **Name**: "Prompt Checker"
- **Status**: Available

## Using the Bot

### 3. Welcome Message
When you first open the bot, you'll see:

```
Welcome to NICE Prompt Checker! 👋

I can help you analyze, validate, and improve survey prompts.

**How to use:**
- Send me any survey prompt or question
- I'll analyze it for clarity, bias, and effectiveness
- Get suggestions for improvement

Try it now by sending me a survey prompt!
```

### 4. Sending a Prompt
Type or paste any survey question, for example:
```
How satisfied are you with your work environment?
```

### 5. Analysis Response
The bot responds with an **Adaptive Card** containing:

---
**Prompt Analysis Results**

**Your Prompt:**
> How satisfied are you with your work environment?

**Analysis:**
- **Clarity Score:** 10/10 ✅
- **Bias Score:** 10/10 ✅
- **Word Count:** 8 words
- **Complexity:** Simple

**Issues Found:**
No major issues detected! ✓

**Suggestions:**
- ✓ Keep the neutral, clear language
- ✓ Consider testing with a small group first

---

### 6. Detecting Problems

When you send a problematic prompt:
```
Don't you agree that employees should always work overtime?
```

The bot responds with warnings:

---
**Prompt Analysis Results**

**Your Prompt:**
> Don't you agree that employees should always work overtime?

**Analysis:**
- **Clarity Score:** 10/10 ✅
- **Bias Score:** 1/10 ❌
- **Word Count:** 9 words
- **Complexity:** Simple

**Issues Found:**
⚠️ Biased language detected - May influence responses

⚠️ Leading question detected - Suggests desired answer

**Suggestions:**
- Remove absolute terms like "always", "never", or "obviously"
- Rephrase to neutral language without suggesting an answer
- ✓ Review the issues above and revise accordingly

---

## Example Conversations

### Example 1: Double-Barreled Question

**User:** How satisfied are you with the salary and benefits?

**Bot Response:**
- Clarity: 7/10 ⚠️
- Bias: 10/10 ✅
- Issues: Double-barreled question detected
- Suggestion: Split into separate questions

### Example 2: Too Long

**User:** Considering all the various factors including but not limited to compensation, work environment, team dynamics, management style, career growth opportunities, and work-life balance, how would you rate your overall satisfaction?

**Bot Response:**
- Clarity: 8/10 ⚠️
- Bias: 10/10 ✅
- Complexity: Complex
- Issues: Question is too long
- Suggestion: Break into shorter questions

### Example 3: Missing Punctuation

**User:** What is your preferred work location

**Bot Response:**
- Clarity: 7/10 ⚠️
- Bias: 10/10 ✅
- Issues: Missing question mark
- Suggestion: Add a question mark (?) at the end

## Card Features

The response cards include:
- **Color-coded scores**: Green (✅) for good, Yellow (⚠️) for warning, Red (❌) for poor
- **Clear sections**: Organized with bold headers
- **Fact set**: Key metrics at a glance
- **Actionable suggestions**: Specific improvements to make
- **Professional formatting**: Easy to read and understand

## Multi-User Support

The bot can:
- Handle multiple users simultaneously
- Work in personal chats, group chats, and channels
- Provide consistent analysis for all users
- Operate 24/7 once deployed

## Mobile Experience

On mobile Teams:
- Cards are responsive and scroll-friendly
- All information is accessible
- Icons and colors are visible
- Easy to use on any device

## Performance

Typical response times:
- Simple prompts: < 1 second
- Complex prompts: < 2 seconds
- With network latency: < 3 seconds

---

## Customization Options

You can customize:
- **Icon colors**: Change hex color in manifest.json
- **Card colors**: Modify Adaptive Card styling in bot.js
- **Analysis logic**: Update rules in analyzePrompt() function
- **Response format**: Change card layout and content
- **Welcome message**: Edit in bot constructor

## Tips for Best Experience

1. **Be specific**: Send complete questions, not fragments
2. **One at a time**: Analyze one prompt per message
3. **Review suggestions**: Bot provides actionable advice
4. **Iterate**: Refine based on feedback and re-check
5. **Test variations**: Try different phrasings

---

This visual guide helps you understand how the bot works in Microsoft Teams. For deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).
