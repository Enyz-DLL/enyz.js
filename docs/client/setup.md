# Client Setup

## Creating a Client

```javascript
const { EnyzClient } = require('enyz.js');

const client = new EnyzClient({
    library: 'discord.js', // or 'eris'
    prefix: '!',
    intents: ['Guilds', 'GuildMessages', 'MessageContent'],
    database: {
        type: 'mongodb',
        url: 'mongodb://localhost/mybot'
    },
    cache: {
        ttl: 300000 // 5 minutes
    }
});
```

## Client Options

| Option | Type | Description | Required | Default |
|--------|------|-------------|----------|---------|
| library | string | Discord library to use | No | 'discord.js' |
| prefix | string | Command prefix | No | '!' |
| intents | array | Gateway intents | Yes | [] |
| commandsDir | string | Commands directory | No | './commands' |
| eventsDir | string | Events directory | No | './events' |
| database | object | Database configuration | No | null |
| cache | object | Cache configuration | No | { ttl: 300000 } |

## Methods

### Command Loading
```javascript
// Load all commands from directory
client.loadCommands('./commands');

// Register single command
client.registerCommand(command);
```

### Event Handling
```javascript
// Load all events from directory
client.loadEvents('./events');

// Register single event
client.registerEvent(event);
```

### Plugin Management
```javascript
// Load plugin
client.plugins.load(plugin);

// Unload plugin
client.plugins.unload('pluginName');

// Reload plugin
client.plugins.reload('pluginName');
``` 