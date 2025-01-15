const { Plugin, Event } = require('../../src');

class WelcomePlugin extends Plugin {
    constructor(options) {
        super({
            name: 'welcome',
            description: 'Welcome system'
        });
        
        this.setSetting('message', options.message);
        this.setSetting('channel', options.channel);
    }

    onLoad() {
        this.registerEvent(new Event({
            name: 'guildMemberAdd',
            execute: this.handleWelcome.bind(this)
        }));
    }

    async handleWelcome(member) {
        const channel = member.guild.channels.cache.find(ch => 
            ch.name === this.getSetting('channel') || 
            ch.id === this.getSetting('channel')
        );

        if (channel) {
            const message = this.getSetting('message')
                .replace('{user}', member)
                .replace('{server}', member.guild.name);
            
            await channel.send(message);
        }
    }
}

module.exports = WelcomePlugin; 