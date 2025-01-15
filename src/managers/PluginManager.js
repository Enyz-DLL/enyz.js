class PluginManager {
    constructor(client) {
        this.client = client;
        this.plugins = new Map();
    }

    load(plugin) {
        if (this.plugins.has(plugin.name)) {
            throw new Error(`Plugin ${plugin.name} is already loaded`);
        }

        plugin.init(this.client);
        this.plugins.set(plugin.name, plugin);
        return this;
    }

    unload(pluginName) {
        const plugin = this.plugins.get(pluginName);
        if (!plugin) {
            throw new Error(`Plugin ${pluginName} is not loaded`);
        }

        plugin.onUnload();
        this.plugins.delete(pluginName);
        return this;
    }

    reload(pluginName) {
        this.unload(pluginName);
        this.load(pluginName);
        return this;
    }
}

module.exports = PluginManager; 