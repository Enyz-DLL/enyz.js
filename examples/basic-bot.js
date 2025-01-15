const { EnyzClient } = require('enyz.js');
const ModerationPlugin = require('./plugins/ModerationPlugin');
const WelcomePlugin = require('./plugins/WelcomePlugin');
const MusicPlugin = require('./plugins/MusicPlugin');

const client = new EnyzClient({
    library: 'discord.js',
    prefix: '!',
    intents: [
        'Guilds',
        'GuildMessages',
        'GuildVoiceStates',
        'MessageContent',
        'GuildMembers'
    ],
    // Database configuration (optional)
    database: {
        type: 'mongodb',
        url: 'mongodb://localhost/mybot'
    },
    // Cache configuration (optional)
    cache: {
        ttl: 300000 // 5 minutes
    }
});

// Initialize plugins
const moderation = new ModerationPlugin({
    logChannel: '123456789', // Channel ID for mod logs
    automod: true // Enable automod features
});

const welcome = new WelcomePlugin({
    message: 'Welcome {user} to {server}!',
    channel: 'welcome' // Channel name or ID
});

const music = new MusicPlugin({
    defaultVolume: 50,
    maxQueueSize: 100
});

// Load plugins
client.plugins.load(moderation);
client.plugins.load(welcome);
client.plugins.load(music);

// Example of using plugin features
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);

    // Configure plugins after bot is ready
    const logChannel = client.channels.cache.get('123456789');
    moderation.setupLogChannel(logChannel);
});

// Example command using plugin features
client.on('messageCreate', async (message) => {
    if (message.content === '!join') {
        const voiceChannel = message.member.voice.channel;
        if (voiceChannel) {
            const voice = await music.joinVoice(message.guild, voiceChannel);
            message.reply('Joined your voice channel!');
        }
    }
});

client.login('YOUR_BOT_TOKEN'); 