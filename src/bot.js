const { ActivityHandler, MessageFactory, CardFactory } = require('botbuilder');

class PromptCheckerBot extends ActivityHandler {
    constructor() {
        super();
        
        // Welcome message when bot is added
        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            const welcomeText = 'Welcome to NICE Prompt Checker! 👋\n\n' +
                'I can help you analyze, validate, and improve survey prompts.\n\n' +
                '**How to use:**\n' +
                '- Send me any survey prompt or question\n' +
                '- I\'ll analyze it for clarity, bias, and effectiveness\n' +
                '- Get suggestions for improvement\n\n' +
                'Try it now by sending me a survey prompt!';
            
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    await context.sendActivity(MessageFactory.text(welcomeText));
                }
            }
            await next();
        });

        // Handle messages
        this.onMessage(async (context, next) => {
            const userMessage = context.activity.text;
            
            console.log('Received message:', userMessage);
            
            // Analyze the prompt
            const analysis = this.analyzePrompt(userMessage);
            
            // Create an adaptive card with the analysis
            const card = CardFactory.adaptiveCard({
                type: 'AdaptiveCard',
                version: '1.4',
                body: [
                    {
                        type: 'TextBlock',
                        text: 'Prompt Analysis Results',
                        weight: 'Bolder',
                        size: 'Large',
                        wrap: true
                    },
                    {
                        type: 'TextBlock',
                        text: '**Your Prompt:**',
                        weight: 'Bolder',
                        wrap: true,
                        separator: true
                    },
                    {
                        type: 'TextBlock',
                        text: userMessage,
                        wrap: true,
                        isSubtle: true
                    },
                    {
                        type: 'TextBlock',
                        text: '**Analysis:**',
                        weight: 'Bolder',
                        wrap: true,
                        separator: true
                    },
                    {
                        type: 'FactSet',
                        facts: [
                            {
                                title: 'Clarity Score:',
                                value: `${analysis.clarity}/10 ${this.getEmoji(analysis.clarity)}`
                            },
                            {
                                title: 'Bias Score:',
                                value: `${analysis.bias}/10 ${this.getEmoji(analysis.bias)}`
                            },
                            {
                                title: 'Word Count:',
                                value: `${analysis.wordCount} words`
                            },
                            {
                                title: 'Complexity:',
                                value: analysis.complexity
                            }
                        ]
                    },
                    {
                        type: 'TextBlock',
                        text: '**Issues Found:**',
                        weight: 'Bolder',
                        wrap: true,
                        separator: true
                    },
                    {
                        type: 'TextBlock',
                        text: analysis.issues.length > 0 ? analysis.issues.join('\n\n') : 'No major issues detected! ✓',
                        wrap: true,
                        color: analysis.issues.length > 0 ? 'Warning' : 'Good'
                    },
                    {
                        type: 'TextBlock',
                        text: '**Suggestions:**',
                        weight: 'Bolder',
                        wrap: true,
                        separator: true
                    },
                    {
                        type: 'TextBlock',
                        text: analysis.suggestions.join('\n\n'),
                        wrap: true,
                        color: 'Accent'
                    }
                ]
            });
            
            await context.sendActivity({ attachments: [card] });
            await next();
        });
    }

    analyzePrompt(prompt) {
        const wordCount = prompt.split(/\s+/).length;
        const hasQuestionMark = prompt.includes('?');
        const upperCaseWords = (prompt.match(/\b[A-Z]{2,}\b/g) || []).length;
        const sentenceCount = (prompt.match(/[.!?]+/g) || []).length + (hasQuestionMark ? 0 : 1);
        
        // Bias detection keywords
        const biasKeywords = ['always', 'never', 'obviously', 'clearly', 'everyone knows', 'should', 'must'];
        const hasBias = biasKeywords.some(keyword => prompt.toLowerCase().includes(keyword));
        
        // Leading/loaded language
        const loadedWords = ['don\'t you', 'wouldn\'t you', 'agree that', 'isn\'t it true'];
        const hasLoadedLanguage = loadedWords.some(phrase => prompt.toLowerCase().includes(phrase));
        
        // Double-barreled (multiple questions)
        const hasAnd = prompt.toLowerCase().includes(' and ') && hasQuestionMark;
        const hasOr = prompt.toLowerCase().includes(' or ') && hasQuestionMark;
        
        // Complexity assessment
        let complexity = 'Simple';
        if (wordCount > 25) complexity = 'Complex';
        else if (wordCount > 15) complexity = 'Moderate';
        
        // Calculate scores
        let clarityScore = 10;
        let biasScore = 10;
        
        const issues = [];
        const suggestions = [];
        
        // Clarity checks
        if (!hasQuestionMark && sentenceCount === 1) {
            clarityScore -= 3;
            issues.push('⚠️ Missing question mark - Add "?" to make it clear this is a question');
            suggestions.push('Add a question mark (?) at the end');
        }
        
        if (wordCount > 25) {
            clarityScore -= 2;
            issues.push('⚠️ Question is too long - May confuse respondents');
            suggestions.push('Break into shorter questions or simplify language');
        }
        
        if (hasAnd || hasOr) {
            clarityScore -= 3;
            issues.push('⚠️ Double-barreled question - Asking multiple things at once');
            suggestions.push('Split into separate questions for each topic');
        }
        
        if (upperCaseWords > 1) {
            clarityScore -= 1;
            issues.push('ℹ️ Excessive capitalization detected');
        }
        
        // Bias checks
        if (hasBias) {
            biasScore -= 4;
            issues.push('⚠️ Biased language detected - May influence responses');
            suggestions.push('Remove absolute terms like "always", "never", or "obviously"');
        }
        
        if (hasLoadedLanguage) {
            biasScore -= 5;
            issues.push('⚠️ Leading question detected - Suggests desired answer');
            suggestions.push('Rephrase to neutral language without suggesting an answer');
        }
        
        // Add positive suggestions
        if (issues.length === 0) {
            suggestions.push('✓ Keep the neutral, clear language');
            suggestions.push('✓ Consider testing with a small group first');
        } else {
            suggestions.push('✓ Review the issues above and revise accordingly');
        }
        
        return {
            clarity: Math.max(1, clarityScore),
            bias: Math.max(1, biasScore),
            wordCount,
            complexity,
            issues,
            suggestions
        };
    }

    getEmoji(score) {
        if (score >= 8) return '✅';
        if (score >= 6) return '⚠️';
        return '❌';
    }
}

module.exports.PromptCheckerBot = PromptCheckerBot;
