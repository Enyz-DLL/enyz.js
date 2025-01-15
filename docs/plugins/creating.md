# Creating Plugins

## Plugin Structure

```javascript
const { Plugin, Command, Event } = require('enyz.js');

class MyPlugin extends Plugin {
    constructor(options) {
        super({
            name: 'myplugin',
            description: 'My awesome plugin'
        });
        
        // Initialize settings
        this.setSetting('option1', options.option1);
        this.setSetting('option2', options.option2);
        
        // Initialize data storage
        this.setData('users', new Map());
    }

    onLoad() {
        // Register commands
        this.registerCommand(new Command({
            name: 'mycommand',
            execute: this.handleCommand.bind(this)
        }));

        // Register events
        this.registerEvent(new Event({
            name: 'messageCreate',
            execute: this.handleMessage.bind(this)
        }));
    }

    onUnload() {
        // Cleanup resources
        this.getData('users').clear();
    }

    // Plugin methods
    async handleCommand(message, args) {
        // Command logic
    }

    async handleMessage(message) {
        // Event logic
    }
}
```

## Plugin Features

### Settings Management
```javascript
// In constructor
this.setSetting('welcomeChannel', options.channelId);

// Later usage
const channelId = this.getSetting('welcomeChannel');
```

### Data Storage
```javascript
// Store data
this.setData('userPoints', new Map());

// Access data
const points = this.getData('userPoints');
```

### Command Registration
```javascript
this.registerCommand(new Command({
    name: 'command',
    execute: (message) => {
        // Command logic
    }
}));
```

### Event Handling
```javascript
this.registerEvent(new Event({
    name: 'eventName',
    execute: (...args) => {
        // Event logic
    }
})); 