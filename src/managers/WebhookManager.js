class WebhookManager {
    constructor(client) {
        this.client = client;
        this.webhooks = new Map();
    }

    async create(channel, options) {
        const webhook = await channel.createWebhook(options.name, {
            avatar: options.avatar,
            reason: options.reason
        });
        this.webhooks.set(webhook.id, webhook);
        return webhook;
    }

    async send(webhookId, content) {
        const webhook = this.webhooks.get(webhookId);
        if (!webhook) throw new Error('Webhook not found');
        return await webhook.send(content);
    }
}

module.exports = WebhookManager; 