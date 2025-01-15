# Database Integration

## Supported Databases

- MongoDB
- SQLite
- MySQL

## Configuration

### MongoDB
```javascript
const client = new EnyzClient({
    database: {
        type: 'mongodb',
        url: 'mongodb://localhost/mybot',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    }
});
```

### SQLite
```javascript
const client = new EnyzClient({
    database: {
        type: 'sqlite',
        path: './database.sqlite'
    }
});
```

### MySQL
```javascript
const client = new EnyzClient({
    database: {
        type: 'mysql',
        host: 'localhost',
        user: 'user',
        password: 'password',
        database: 'mybot'
    }
});
```

## Usage

### In Commands
```javascript
module.exports = new Command({
    name: 'points',
    async execute(message) {
        const db = message.client.database;
        const points = await db.get('points', message.author.id);
        message.reply(`You have ${points} points!`);
    }
});
```

### In Plugins
```javascript
class MyPlugin extends Plugin {
    async onLoad() {
        const db = this.client.database;
        await db.init('pluginData');
    }

    async saveData(key, value) {
        await this.client.database.set('pluginData', key, value);
    }
}
``` 