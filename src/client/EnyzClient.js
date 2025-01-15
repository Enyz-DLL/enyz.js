const DiscordJSClient = require('./DiscordJSClient');
const ErisClient = require('./ErisClient');
const PluginManager = require('../managers/PluginManager');
const CacheManager = require('../managers/CacheManager');
const RateLimiter = require('../managers/RateLimiter');
const WebhookManager = require('../managers/WebhookManager');
const AnalyticsManager = require('../managers/AnalyticsManager');
const fs = require('fs').promises;
const path = require('path');

class EnyzClient {
    constructor(options = {}) {
        this.options = {
            library: 'discord.js',
            prefix: '!',
            commandsDir: 'commands', // Default commands directory
            ...options
        };
        
        this.commands = new Map();
        this.events = new Map();
        this.client = null;
        
        // Initialize managers
        this.plugins = new PluginManager(this);
        this.cache = new CacheManager(options.cache);
        this.rateLimiter = new RateLimiter();
        this.webhooks = new WebhookManager(this);
        this.analytics = new AnalyticsManager();
        
        this.init();
    }
    
    init() {
        switch(this.options.library.toLowerCase()) {
            case 'discord.js':
                const DiscordJSClient = require('./DiscordJSClient');
                this.client = new DiscordJSClient(this.options);
                break;
            case 'eris':
                const ErisClient = require('./ErisClient');
                this.client = new ErisClient(this.options);
                break;
            default:
                throw new Error('Invalid library specified. Supported libraries: discord.js, eris');
        }
    }
    
    login(token) {
        return this.client.login(token);
    }
    
    registerCommand(command) {
        this.commands.set(command.name, command);
        return this;
    }
    
    registerEvent(event) {
        this.events.set(event.name, event);
        return this;
    }
    
    async executeCommand(command, message, args) {
        const start = Date.now();
        try {
            // Rate limiting
            const key = `${command.name}-${message.author.id}`;
            if (!this.rateLimiter.check(key, command.rateLimit || 1, 3000)) {
                const remaining = this.rateLimiter.getRemainingTime(key);
                throw new Error(`Please wait ${remaining}ms before using this command again.`);
            }

            // Execute command
            await command.execute(message, args);
            
            // Track analytics
            this.analytics.trackCommand(command);
            this.analytics.trackPerformance(command.name, Date.now() - start);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async loadCommands(directory = this.options.commandsDir) {
        try {
            const commandsPath = path.join(process.cwd(), directory);
            const categories = await fs.readdir(commandsPath);

            for (const category of categories) {
                const categoryPath = path.join(commandsPath, category);
                const stat = await fs.stat(categoryPath);

                if (stat.isDirectory()) {
                    const commandFiles = await fs.readdir(categoryPath);
                    
                    for (const file of commandFiles) {
                        if (file.endsWith('.js')) {
                            const command = require(path.join(categoryPath, file));
                            if (command.name) {
                                command.category = command.category || category;
                                this.registerCommand(command);
                                console.log(`Loaded command: ${command.name} from ${category}`);
                            }
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Error loading commands:', error);
        }
    }

    async loadEvents(directory = 'events') {
        try {
            const eventsPath = path.join(process.cwd(), directory);
            const eventFiles = await fs.readdir(eventsPath);

            for (const file of eventFiles) {
                if (file.endsWith('.js')) {
                    const event = require(path.join(eventsPath, file));
                    if (event.name) {
                        this.registerEvent(event);
                        console.log(`Loaded event: ${event.name}`);
                    }
                }
            }
        } catch (error) {
            console.error('Error loading events:', error);
        }
    }
}

module.exports = EnyzClient; 