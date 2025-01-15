class CacheManager {
    constructor(options = {}) {
        this.cache = new Map();
        this.ttl = options.ttl || 300000; // 5 minutes default
    }

    set(key, value, ttl = this.ttl) {
        const expiresAt = Date.now() + ttl;
        this.cache.set(key, {
            value,
            expiresAt
        });
        return this;
    }

    get(key) {
        const data = this.cache.get(key);
        if (!data) return null;

        if (Date.now() > data.expiresAt) {
            this.cache.delete(key);
            return null;
        }

        return data.value;
    }

    has(key) {
        return this.get(key) !== null;
    }

    delete(key) {
        return this.cache.delete(key);
    }

    clear() {
        this.cache.clear();
        return this;
    }
}

module.exports = CacheManager; 