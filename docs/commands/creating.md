# Creating Commands

## Basic Command Structure

```javascript
const { Command } = require('enyz.js');

module.exports = new Command({
    name: 'ping',
    description: 'Check bot latency',
    category: 'Utility',
    usage: 'ping',
    aliases: ['latency'],
    cooldown: 3,
    permissions: ['SendMessages'],
    async execute(message, args) {
        // Command logic here
    }
});
```

## Command Options

| Option | Type | Description | Required |
|--------|------|-------------|----------|
| name | string | Command name | Yes |
| description | string | Command description | No |
| category | string | Command category | No |
| usage | string | Command usage | No |
| aliases | array | Command aliases | No |
| cooldown | number | Command cooldown in seconds | No |
| permissions | array | Required permissions | No |
| execute | function | Command execution function | Yes |

## Examples

### Basic Command
```javascript
module.exports = new Command({
    name: 'say',
    description: 'Make the bot say something',
    usage: 'say <message>',
    execute(message, args) {
        const text = args.join(' ');
        message.channel.send(text);
    }
});
```

### Advanced Command
```javascript
module.exports = new Command({
    name: 'ban',
    description: 'Ban a member',
    category: 'Moderation',
    usage: 'ban <user> [reason]',
    permissions: ['BanMembers'],
    async execute(message, args) {
        const user = message.mentions.users.first();
        const reason = args.slice(1).join(' ') || 'No reason provided';

        if (!user) {
            throw new Error('Please mention a user to ban');
        }

        await message.guild.members.ban(user, { reason });
        message.reply(`Successfully banned ${user.tag}`);
    }
});
``` 