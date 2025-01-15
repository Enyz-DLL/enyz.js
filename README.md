# Enyz.js

A powerful and flexible Discord bot framework that supports multiple Discord libraries.

## Features

- 🔧 Support for multiple Discord libraries (discord.js and eris)
- 🔌 Plugin system for modular functionality
- ⚡ Built-in command and event handling
- 🎵 Voice support for music bots
- 💾 Database integration (MongoDB, SQLite, MySQL)
- 🚀 Slash command support
- 📊 Analytics and performance tracking
- ⚙️ Caching system
- 🛡️ Rate limiting
- 🎨 Customizable and extensible

## Installation

```bash
npm install enyz.js
```

## Quick Start

```javascript
const { EnyzClient } = require('enyz.js');
const client = EnyzClient({
    library: 'discord.js', // or 'eris'
    token: 'YOUR_BOT_TOKEN',
    prefix: '!',
    commandsDir: path.join(__dirname, 'commands'),
    eventsDir: path.join(__dirname, 'events'),
    intents: ['Guilds', 'GuildMessages', 'GuildVoiceStates']
});

client.loadCommands();
client.loadEvents();
client.login('YOUR_BOT_TOKEN');
```

## Command Example

```javascript
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
```

## Plugin Example

```javascript
const { Plugin, Command, Event } = require('enyz.js');

class WelcomePlugin extends Plugin {
    constructor(options) {
        super({
            name: 'Welcome',
            description: 'Welcome System
        });
        this.setSetting('message', options.message);
        this.setSetting('channel', options.channel);
    }
    onload() {
        this.registerEvent(new Event({
            name: 'guildMemberAdd',
            execute: this.handleWelcome.bind(this)
        }))
    }
}
```

## Documentation

### Client Options

```javascript
{
    library: 'discord.js' | 'eris',
    prefix: 'string',
    intents: ['string'],
    commandsDir: 'string',
    database: {
        type: 'mongodb' | 'sqlite' | 'mysql',
        uri: 'string',
        options: 'object',
        path?: 'string'
    },
    cache: {
        ttl: 'number'
    }
}
```

### Features

- **Command Handling**: Automatic command loading and handling
- **Event System**: Easy event management
- **Plugin System**: Create modular and reusable features
- **Voice Support**: Built-in voice channel management
- **Database Integration**: Support for multiple databases
- **Caching**: Efficient data caching system
- **Analytics**: Track command usage and performance
- **Rate Limiting**: Prevent spam and abuse

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details