class CommandHandler {
    constructor(client) {
        this.client = client;
        this.commands = new Map();
        
        this.init();
    }
    
    init() {
        this.client.client.on('messageCreate', (message) => {
            this.handleCommand(message);
        });
    }
    
    async handleCommand(message) {
        const prefix = this.client.options.prefix;
        
        if (!message.content.startsWith(prefix)) return;
        
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        
        const command = this.commands.get(commandName) ||
            this.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
            
        if (!command) return;
        
        try {
            await command.execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply('There was an error executing that command!');
        }
    }
}

module.exports = CommandHandler; 