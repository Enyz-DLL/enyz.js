class AnalyticsManager {
    constructor() {
        this.stats = {
            commands: new Map(),
            events: new Map(),
            performance: new Map()
        };
    }

    trackCommand(command) {
        const stats = this.stats.commands.get(command.name) || {
            uses: 0,
            success: 0,
            failures: 0,
            avgExecutionTime: 0
        };
        this.stats.commands.set(command.name, stats);
    }

    trackPerformance(key, duration) {
        const stats = this.stats.performance.get(key) || {
            calls: 0,
            totalTime: 0,
            avgTime: 0
        };
        stats.calls++;
        stats.totalTime += duration;
        stats.avgTime = stats.totalTime / stats.calls;
        this.stats.performance.set(key, stats);
    }

    getStats() {
        return this.stats;
    }
}

module.exports = AnalyticsManager; 