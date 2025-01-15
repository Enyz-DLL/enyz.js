const { Command } = require('enyz.js');

module.exports = new Command({
    name: 'ping',
    description: 'Check bot latency',
    category: 'Utility',
    async execute(message) {
        const sent = await message.reply('Pinging...');
        const latency = sent.createdTimestamp - message.createdTimestamp;
        sent.edit(`Pong! Latency is ${latency}ms`);
    }
}); 