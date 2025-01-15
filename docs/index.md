# Enyz.js Documentation

Welcome to the Enyz.js documentation! This framework provides a powerful and flexible way to create Discord bots using multiple Discord libraries.

## Table of Contents

- [Getting Started](getting-started.md)
- [Client](client/setup.md)
- [Commands](commands/creating.md)
- [Plugins](plugins/creating.md)
- [Voice](voice/setup.md)
- [Advanced Features](advanced/database.md)

## Quick Links

- [GitHub Repository](https://github.com/Enyz-DLL/enyz.js)
- [NPM Package](https://www.npmjs.com/package/enyz.js)
- [Discord Support Server](https://discord.gg/your-server)

## Installation

```bash
npm install enyz.js
```

## Basic Usage

```javascript
const { EnyzClient } = require('enyz.js');

const client = new EnyzClient({
    library: 'discord.js',
    prefix: '!',
    intents: ['Guilds', 'GuildMessages', 'MessageContent']
});

client.loadCommands('./commands');
client.loadEvents('./events');

client.login('YOUR_BOT_TOKEN');
```

## Features Overview

### Multiple Library Support
Choose between discord.js and eris:
```javascript
const client = new EnyzClient({
    library: 'discord.js' // or 'eris'
});
```

### Plugin System
Create and load plugins easily:
```javascript
const MyPlugin = require('./plugins/MyPlugin');
const plugin = new MyPlugin();
client.plugins.load(plugin);
```

### Command Handler
Organize commands by category:
```
commands/
├── moderation/
│   ├── ban.js
│   └── kick.js
├── utility/
│   └── ping.js
└── fun/
    └── 8ball.js
```

### Voice Support
Built-in voice channel management:
```javascript
const voice = new Voice({
    guild,
    client,
    selfDeaf: true
});

await voice.connect(channel);
```

### Database Integration
Support for multiple databases:
```javascript
const client = new EnyzClient({
    database: {
        type: 'mongodb',
        url: 'mongodb://localhost/mybot'
    }
});
```

## API Reference

### Client Options
| Option | Type | Description | Default |
|--------|------|-------------|---------|
| library | string | Discord library to use | 'discord.js' |
| prefix | string | Command prefix | '!' |
| intents | array | Gateway intents | [] |
| commandsDir | string | Commands directory | './commands' |
| database | object | Database configuration | null |
| cache | object | Cache configuration | { ttl: 300000 } |

### Plugin Methods
| Method | Description |
|--------|-------------|
| onLoad() | Called when plugin is loaded |
| onUnload() | Called when plugin is unloaded |
| setSetting() | Set plugin setting |
| getSetting() | Get plugin setting |
| registerCommand() | Register a command |
| registerEvent() | Register an event |

### Voice Methods
| Method | Description |
|--------|-------------|
| connect() | Connect to voice channel |
| disconnect() | Disconnect from voice channel |
| setDeaf() | Set deafen state |
| setMute() | Set mute state |

## Examples

### Creating a Command
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

### Creating a Plugin
```javascript
const { Plugin, Event } = require('enyz.js');

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
}
```

## Best Practices

1. **Command Organization**
   - Keep commands organized by category
   - Use descriptive names and descriptions
   - Include usage examples

2. **Plugin Development**
   - Keep plugins modular and focused
   - Use settings for configuration
   - Clean up resources in onUnload()

3. **Error Handling**
   - Always catch and handle errors
   - Provide meaningful error messages
   - Use the built-in error handling system

4. **Performance**
   - Use the caching system for frequently accessed data
   - Clean up unused resources
   - Monitor performance using the analytics system

## Support

Need help? Here are some resources:

- [Discord Support Server](https://discord.gg/your-server)
- [GitHub Issues](https://github.com/Enyz-DLL/enyz.js/issues)
- [Examples Directory](https://github.com/Enyz-DLL/enyz.js/tree/main/examples)

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details. 