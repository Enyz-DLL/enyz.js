class RateLimiter {
    constructor() {
        this.limits = new Map();
    }

    check(key, limit, time) {
        const now = Date.now();
        const userData = this.limits.get(key) || { count: 0, reset: now + time };

        if (now > userData.reset) {
            userData.count = 0;
            userData.reset = now + time;
        }

        userData.count++;
        this.limits.set(key, userData);

        return userData.count <= limit;
    }

    getRemainingTime(key) {
        const userData = this.limits.get(key);
        if (!userData) return 0;
        return Math.max(0, userData.reset - Date.now());
    }
}

module.exports = RateLimiter; 