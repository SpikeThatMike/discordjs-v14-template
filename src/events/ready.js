const CustomClient = require("../base/util/client");
const eventInterface = require("../base/templates/event");

module.exports = class ready extends eventInterface {
    /**
     * @param {CustomClient} client 
     */
    constructor(client) {
        super()
        this.client = client;
        this.name = "ready",
        this.once = true,
        this.description = "ready event"
    };

    execute() {
        this.client.guilds.cache.get(this.client.config.devGuild)?.commands.set(this.client.devCommands);
        this.client.application.commands.set(this.client.publicCommands);
        console.log(`Loaded ${this.client.publicCommands.length || 0} commands & ${this.client.devCommands.length || 0} developer commands`)
        return console.log(`${this.client.user.tag} is now online`);
    }
}