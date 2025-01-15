class Voice {
    constructor(options = {}) {
        this.channel = null;
        this.connection = null;
        this.player = null;
        this.guild = options.guild;
        this.client = options.client;
        
        // Voice states
        this.speaking = false;
        this.deaf = options.deaf || false;
        this.mute = options.mute || false;
        
        // Voice options
        this.selfDeaf = options.selfDeaf || false;
        this.selfMute = options.selfMute || false;
        this.timeout = options.timeout || 60000; // 1 minute default
    }

    async connect(channel) {
        if (!channel) throw new Error('No voice channel provided');
        
        try {
            this.channel = channel;
            
            // Handle different libraries
            if (this.client.options.library === 'discord.js') {
                this.connection = await channel.join({
                    deaf: this.selfDeaf,
                    mute: this.selfMute
                });
            } else if (this.client.options.library === 'eris') {
                await this.client.client.joinVoiceChannel(channel.id);
                this.connection = this.client.client.voiceConnections.get(channel.guild.id);
            }

            this._handleVoiceEvents();
            return this.connection;
        } catch (error) {
            throw new Error(`Failed to connect to voice channel: ${error.message}`);
        }
    }

    disconnect() {
        if (!this.connection) return;
        
        if (this.client.options.library === 'discord.js') {
            this.connection.disconnect();
        } else if (this.client.options.library === 'eris') {
            this.client.client.leaveVoiceChannel(this.channel.id);
        }

        this.cleanup();
    }

    cleanup() {
        this.channel = null;
        this.connection = null;
        this.player = null;
        this.speaking = false;
    }

    _handleVoiceEvents() {
        if (!this.connection) return;

        // Handle disconnection
        this.connection.on('disconnect', () => {
            this.cleanup();
        });

        // Handle errors
        this.connection.on('error', (error) => {
            console.error('Voice connection error:', error);
            this.cleanup();
        });

        // Handle state changes
        this.connection.on('stateChange', (oldState, newState) => {
            // Handle state changes if needed
        });
    }

    // Utility methods
    setDeaf(deaf) {
        this.deaf = deaf;
        if (this.connection) {
            this.connection.setDeaf(deaf);
        }
        return this;
    }

    setMute(mute) {
        this.mute = mute;
        if (this.connection) {
            this.connection.setMute(mute);
        }
        return this;
    }

    // Voice state getters
    isConnected() {
        return !!this.connection;
    }

    isSpeaking() {
        return this.speaking;
    }

    getChannel() {
        return this.channel;
    }
}

module.exports = Voice; 