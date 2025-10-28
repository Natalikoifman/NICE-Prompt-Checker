const restify = require('restify');
const { BotFrameworkAdapter } = require('botbuilder');
const { PromptCheckerBot } = require('./bot');
require('dotenv').config();

// Create HTTP server
const server = restify.createServer();
server.use(restify.plugins.bodyParser());

const PORT = process.env.PORT || 3978;

// Create adapter
const adapter = new BotFrameworkAdapter({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword,
    appType: process.env.MicrosoftAppType || 'MultiTenant',
    appTenantId: process.env.MicrosoftAppTenantId
});

// Error handler
adapter.onTurnError = async (context, error) => {
    console.error(`\n [onTurnError] unhandled error: ${error}`);
    console.error(error);

    await context.sendTraceActivity(
        'OnTurnError Trace',
        `${error}`,
        'https://www.botframework.com/schemas/error',
        'TurnError'
    );

    await context.sendActivity('The bot encountered an error or bug.');
    await context.sendActivity('To continue to run this bot, please fix the bot source code.');
};

// Create the bot
const bot = new PromptCheckerBot();

// Listen for incoming requests
server.post('/api/messages', async (req, res) => {
    await adapter.process(req, res, (context) => bot.run(context));
});

// Health check endpoint
server.get('/health', (req, res, next) => {
    res.send(200, { status: 'healthy', service: 'NICE Prompt Checker Bot' });
    return next();
});

// Start server
server.listen(PORT, () => {
    console.log(`\n${server.name} listening on ${server.url}`);
    console.log('\nBot is ready!');
    console.log('To test in Teams:');
    console.log('1. Configure your Azure Bot Service with this endpoint');
    console.log('2. Upload the app package to Teams');
    console.log('3. Start chatting with the bot!\n');
});
