const { Client, Collection } = require("discord.js");

module.exports = class CustomClient extends Client {
    constructor() {
        super({intents: 131071, partials: []});
        this.devCommands = [], this.publicCommands = [];
        this.commands = new Collection();
        this.events = new Collection();
        this.config = require(`${process.cwd()}/data/config.json`);
        this.handlers = new (require("./handlers"))(this);
        this.cooldowns = new Collection();
    }

    init() {
        this.loadHandlers();
        this.login(this.config.token)
        .catch((err) => console.log(err))
    }

    loadHandlers() {
        this.handlers.loadCommands();
        this.handlers.loadEvents();
    }

    reload() {
        console.log(`\nReloading...`)
        this.commands.clear();
        this.devCommands = [], this.publicCommands = [];
        for(const [key, value] of this.events) this.removeListener(key, value);
        this.loadHandlers();
    }
}