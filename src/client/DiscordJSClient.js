const { Client, GatewayIntentBits } = require('discord.js');
const CommandHandler = require('../handlers/CommandHandler');
const EventHandler = require('../handlers/EventHandler');

class DiscordJSClient {
    constructor(options) {
        this.client = new Client({
            intents: options.intents || [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent
            ]
        });
        
        this.commandHandler = new CommandHandler(this);
        this.eventHandler = new EventHandler(this);
    }
    
    login(token) {
        return this.client.login(token);
    }
}

module.exports = DiscordJSClient; 