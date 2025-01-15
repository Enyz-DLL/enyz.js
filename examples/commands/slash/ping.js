const { SlashCommand } = require('enyz.js');

module.exports = new SlashCommand({
    name: 'ping',
    description: 'Check bot latency',
    async execute(interaction) {
        await interaction.deferReply();
        const latency = Date.now() - interaction.createdTimestamp;
        await interaction.editReply(`Pong! Latency is ${latency}ms`);
    }
}); 