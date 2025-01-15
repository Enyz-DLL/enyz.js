class SlashCommandHandler {
    constructor(client) {
        this.client = client;
        this.commands = new Map();
    }

    async registerSlashCommands(guildId = null) {
        const commands = [...this.commands.values()].map(cmd => cmd.toJSON());
        
        try {
            if (guildId) {
                // Register commands for a specific guild (instant update, good for testing)
                const guild = await this.client.client.guilds.fetch(guildId);
                await guild.commands.set(commands);
            } else {
                // Register global commands (can take up to 1 hour to update)
                await this.client.client.application.commands.set(commands);
            }
        } catch (error) {
            console.error('Error registering slash commands:', error);
        }
    }

    async handleInteraction(interaction) {
        if (!interaction.isCommand()) return;

        const command = this.commands.get(interaction.commandName);
        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({
                content: 'There was an error executing this command!',
                ephemeral: true
            });
        }
    }
}

module.exports = SlashCommandHandler; 