class Util {
    static formatDuration(ms) {
        const seconds = Math.floor((ms / 1000) % 60);
        const minutes = Math.floor((ms / (1000 * 60)) % 60);
        const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
        const days = Math.floor(ms / (1000 * 60 * 60 * 24));

        return {
            days,
            hours,
            minutes,
            seconds,
            toString() {
                return `${days}d ${hours}h ${minutes}m ${seconds}s`;
            }
        };
    }

    static chunk(array, size) {
        const chunks = [];
        for (let i = 0; i < array.length; i += size) {
            chunks.push(array.slice(i, i + size));
        }
        return chunks;
    }

    static randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static escapeMarkdown(text) {
        return text.replace(/([*_`~\\])/g, '\\$1');
    }

    static async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    static parseMS(ms) {
        const times = {
            year: 31536000000,
            month: 2628000000,
            week: 604800000,
            day: 86400000,
            hour: 3600000,
            minute: 60000,
            second: 1000
        };
        
        const result = {};
        
        for (const [key, value] of Object.entries(times)) {
            if (ms >= value) {
                result[key] = Math.floor(ms / value);
                ms %= value;
            }
        }
        
        return result;
    }

    static capitalizeFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    static generateProgressBar(current, total, size = 20) {
        const percentage = current / total;
        const progress = Math.round(size * percentage);
        const emptyProgress = size - progress;
        
        const progressText = '▇'.repeat(progress);
        const emptyProgressText = '—'.repeat(emptyProgress);
        
        return `[${progressText}${emptyProgressText}] ${Math.round(percentage * 100)}%`;
    }

    static truncate(str, length) {
        if (str.length > length) {
            return str.slice(0, length) + '...';
        }
        return str;
    }

    static shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    static isValidURL(string) {
        try {
            new URL(string);
            return true;
        } catch {
            return false;
        }
    }

    static formatNumber(number) {
        return new Intl.NumberFormat().format(number);
    }

    static getRandomColor() {
        return '#' + Math.floor(Math.random()*16777215).toString(16);
    }

    static removeDuplicates(array) {
        return [...new Set(array)];
    }
}

module.exports = Util; 