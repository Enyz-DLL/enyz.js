const Eris = require('eris');
const CommandHandler = require('../handlers/CommandHandler');
const EventHandler = require('../handlers/EventHandler');

class ErisClient {
    constructor(options) {
        this.client = new Eris(options.token, {
            intents: options.intents || [
                'guilds',
                'guildMessages'
            ]
        });
        
        this.commandHandler = new CommandHandler(this);
        this.eventHandler = new EventHandler(this);
    }
    
    login() {
        return this.client.connect();
    }
}

module.exports = ErisClient; 