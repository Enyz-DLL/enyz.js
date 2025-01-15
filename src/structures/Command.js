class Command {
    constructor(options = {}) {
        if (!options.name) throw new Error('Command name is required');
        
        this.name = options.name;
        this.description = options.description || 'No description provided';
        this.aliases = options.aliases || [];
        this.usage = options.usage || '';
        this.category = options.category || 'Miscellaneous';
        this.permissions = options.permissions || [];
        this.cooldown = options.cooldown || 3;
        this.execute = options.execute;
        
        // New properties
        this.guildOnly = options.guildOnly || false;
        this.ownerOnly = options.ownerOnly || false;
        this.args = options.args || [];
        this.examples = options.examples || [];
        this.subcommands = new Map();
    }

    setSubcommand(name, handler) {
        this.subcommands.set(name, handler);
        return this;
    }

    async validatePermissions(message) {
        if (this.ownerOnly && message.author.id !== message.client.owner) {
            throw new Error('This command can only be used by the bot owner');
        }

        if (this.guildOnly && !message.guild) {
            throw new Error('This command can only be used in a server');
        }

        for (const permission of this.permissions) {
            if (!message.member.permissions.has(permission)) {
                throw new Error(`You need the ${permission} permission to use this command`);
            }
        }
    }
}

module.exports = Command; 