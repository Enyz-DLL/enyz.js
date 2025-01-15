// Clients
const EnyzClient = require('./client/EnyzClient');
const DiscordJSClient = require('./client/DiscordJSClient');
const ErisClient = require('./client/ErisClient');

// Structures
const Command = require('./structures/Command');
const SlashCommand = require('./structures/SlashCommand');
const Event = require('./structures/Event');
const Plugin = require('./structures/Plugin');
const Voice = require('./structures/Voice');

// Managers
const PluginManager = require('./managers/PluginManager');
const CacheManager = require('./managers/CacheManager');
const RateLimiter = require('./managers/RateLimiter');
const WebhookManager = require('./managers/WebhookManager');
const AnalyticsManager = require('./managers/AnalyticsManager');

// Handlers
const CommandHandler = require('./handlers/CommandHandler');
const EventHandler = require('./handlers/EventHandler');
const SlashCommandHandler = require('./handlers/SlashCommandHandler');

// Utils
const Util = require('./utils');

// Export everything
module.exports = {
    // Clients
    EnyzClient,
    DiscordJSClient,
    ErisClient,

    // Structures
    Command,
    SlashCommand,
    Event,
    Plugin,
    Voice,

    // Managers
    PluginManager,
    CacheManager,
    RateLimiter,
    WebhookManager,
    AnalyticsManager,

    // Handlers
    CommandHandler,
    EventHandler,
    SlashCommandHandler,

    // Utils
    Util,

    // Version
    version: require('../package.json').version
}; 