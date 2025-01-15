const { Plugin, Voice, Event } = require('enyz.js');

class MusicPlugin extends Plugin {
    constructor() {
        super({
            name: 'music',
            description: 'Voice channel management',
            version: '1.0.0',
            author: 'Your Name'
        });

        this.voices = new Map();
    }

    async joinVoice(guild, channel) {
        let voice = this.voices.get(guild.id);
        
        if (!voice) {
            voice = new Voice({
                guild,
                client: this.client,
                selfDeaf: true // Usually true for music bots
            });
            this.voices.set(guild.id, voice);
        }

        await voice.connect(channel);
        return voice;
    }

    leaveVoice(guildId) {
        const voice = this.voices.get(guildId);
        if (voice) {
            voice.disconnect();
            this.voices.delete(guildId);
        }
    }

    onLoad() {
        // Handle voice state updates
        this.registerEvent(new Event({
            name: 'voiceStateUpdate',
            execute: (oldState, newState) => {
                // Handle voice state changes
            }
        }));
    }

    onUnload() {
        // Cleanup all voice connections when plugin unloads
        for (const [guildId, voice] of this.voices) {
            voice.disconnect();
        }
        this.voices.clear();
    }
}

module.exports = MusicPlugin; 