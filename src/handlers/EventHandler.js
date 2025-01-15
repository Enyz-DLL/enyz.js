class EventHandler {
    constructor(client) {
        this.client = client;
        this.events = new Map();
    }
    
    register(event) {
        if (event.once) {
            this.client.client.once(event.name, (...args) => event.execute(...args));
        } else {
            this.client.client.on(event.name, (...args) => event.execute(...args));
        }
        
        this.events.set(event.name, event);
    }
}

module.exports = EventHandler; 