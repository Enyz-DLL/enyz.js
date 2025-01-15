# Getting Started with Enyz.js

## Installation

```bash
npm install enyz.js
```

## Basic Setup

1. Create a new project:
```bash
mkdir my-discord-bot
cd my-discord-bot
npm init -y
```

2. Install Enyz.js:
```bash
npm install enyz.js
```

3. Create your main bot file (index.js):
```javascript
const { EnyzClient } = require('enyz.js');

const client = new EnyzClient({
    library: 'discord.js',
    prefix: '!',
    intents: [
        'Guilds',
        'GuildMessages',
        'MessageContent'
    ]
});

client.login('YOUR_BOT_TOKEN');
```

## Project Structure

Recommended project structure:
```
my-discord-bot/
├── commands/
│   ├── moderation/
│   │   ├── ban.js
│   │   └── kick.js
│   ├── utility/
│   │   └── ping.js
│   └── fun/
│       └── 8ball.js
├── events/
│   ├── ready.js
│   └── messageCreate.js
├── plugins/
│   ├── WelcomePlugin.js
│   └── MusicPlugin.js
└── index.js
``` 