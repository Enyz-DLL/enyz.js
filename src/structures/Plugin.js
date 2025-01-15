class Plugin {
    constructor(options = {}) {
        this.name = options.name;
        this.description = options.description || 'No description provided';
        this.version = options.version || '1.0.0';
        this.author = options.author;
        
        this.commands = new Map();
        this.slashCommands = new Map();
        this.events = new Map();
        this.client = null;
        
        // Plugin-specific settings
        this.settings = new Map();
        this.data = new Map();
    }

    init(client) {
        this.client = client;
        this.onLoad();
    }

    onLoad() {
        // Override this method in your plugin
    }

    onUnload() {
        // Override this method in your plugin
    }

    registerCommand(command) {
        this.commands.set(command.name, command);
        this.client.registerCommand(command);
        return this;
    }

    registerSlashCommand(command) {
        this.slashCommands.set(command.name, command);
        this.client.registerSlashCommand(command);
        return this;
    }

    registerEvent(event) {
        this.events.set(event.name, event);
        this.client.registerEvent(event);
        return this;
    }

    // Plugin settings management
    setSetting(key, value) {
        this.settings.set(key, value);
        return this;
    }

    getSetting(key) {
        return this.settings.get(key);
    }

    // Plugin data storage
    setData(key, value) {
        this.data.set(key, value);
        return this;
    }

    getData(key) {
        return this.data.get(key);
    }
}

module.exports = Plugin; 