class SlashCommand {
    constructor(options = {}) {
        this.name = options.name;
        this.description = options.description;
        this.options = options.options || [];
        this.defaultPermission = options.defaultPermission;
        this.guildOnly = options.guildOnly || false;
        this.cooldown = options.cooldown || 3;
        this.execute = options.execute;
    }

    toJSON() {
        return {
            name: this.name,
            description: this.description,
            options: this.options,
            default_permission: this.defaultPermission,
            dm_permission: !this.guildOnly
        };
    }
}

module.exports = SlashCommand; 