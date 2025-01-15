const { Event } = require('enyz.js');

module.exports = new Event({
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Logged in as ${client.user.tag}`);
    }
}); 