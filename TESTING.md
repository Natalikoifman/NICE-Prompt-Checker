# Quick Testing Guide - NICE Prompt Checker

This guide helps you quickly test the NICE Prompt Checker bot in Microsoft Teams.

## For Testers

### Getting Started

1. **Install the bot** in Teams:
   - Your admin will share the app package or app link
   - Click "Add" when prompted
   - The bot will appear in your chat list

2. **Start a conversation**:
   - Click on "Prompt Checker" in your chat list
   - You'll see a welcome message

### How to Use

Simply type or paste any survey question/prompt into the chat. The bot will analyze it and respond with:

- **Clarity Score**: How clear and understandable your question is
- **Bias Score**: Whether the question has biased or leading language  
- **Issues Found**: Specific problems detected
- **Suggestions**: How to improve the question

### Test Scenarios

Try these examples to see the bot in action:

#### ✅ Good Prompt
```
How satisfied are you with your current work environment?
```
**Expected**: High scores, minimal issues

#### ❌ Biased Language
```
Obviously, working from home is better. Don't you agree?
```
**Expected**: Low bias score, bias warning

#### ❌ Leading Question
```
Don't you think the new policy is unfair?
```
**Expected**: Leading question warning

#### ❌ Double-Barreled
```
How satisfied are you with the salary and benefits?
```
**Expected**: Warning about asking multiple things

#### ❌ Too Long
```
Considering all factors including but not limited to your compensation, work environment, team relationships, management style, career development opportunities, and work-life balance, how would you rate your overall job satisfaction?
```
**Expected**: Complexity warning

#### ❌ Missing Question Mark
```
What is your favorite feature of the product
```
**Expected**: Clarity issue about missing punctuation

### What to Test

1. **Basic Functionality**:
   - [ ] Bot responds to messages
   - [ ] Analysis cards display correctly
   - [ ] Scores are calculated
   - [ ] Suggestions are provided

2. **Different Question Types**:
   - [ ] Yes/No questions
   - [ ] Rating scale questions
   - [ ] Open-ended questions
   - [ ] Multiple choice preambles

3. **Edge Cases**:
   - [ ] Very short prompts (1-2 words)
   - [ ] Very long prompts (100+ words)
   - [ ] Questions with special characters
   - [ ] Questions in different formats

4. **User Experience**:
   - [ ] Response time is acceptable
   - [ ] Cards are readable
   - [ ] Suggestions are helpful
   - [ ] Bot handles errors gracefully

### Reporting Issues

If you find a problem, please report:

1. **What you did**: The exact prompt you sent
2. **What happened**: The bot's response or error
3. **What you expected**: What should have happened
4. **Screenshot**: If applicable

Send feedback to the development team or create a GitHub issue.

### Tips for Better Testing

- **Test edge cases**: Empty messages, very long text, special characters
- **Try different devices**: Desktop app, web app, mobile
- **Test in different contexts**: Personal chat, group chat, team channel
- **Vary your language**: Different tones, formal/informal
- **Check persistence**: Does the bot remember context?

### Known Limitations

Current version:
- Analyzes prompts in English only
- Basic bias detection (not comprehensive)
- No context/conversation memory
- Limited to text-based analysis

### Performance Expectations

- **Response time**: < 2 seconds for typical prompts
- **Uptime**: Should be available 24/7
- **Accuracy**: Catches most common issues, but not perfect

### Success Criteria

The bot test is successful if:
- ✅ Responds to all prompts within 3 seconds
- ✅ Provides relevant analysis for each prompt type
- ✅ Detects obvious bias and leading language
- ✅ Gives actionable suggestions
- ✅ Cards display correctly on all devices

### Getting Help

- Check the [full deployment guide](DEPLOYMENT.md)
- Review the [README](README.md) for more details
- Contact the development team
- Open an issue on GitHub

---

**Happy Testing! 🧪**

Your feedback helps make NICE Prompt Checker better for everyone.
