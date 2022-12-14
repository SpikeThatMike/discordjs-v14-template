const CustomClient = require("../base/util/client");
const CommandInterface = require("../base/templates/command");
const { PermissionFlagsBits, CommandInteraction } = require("discord.js");

module.exports = class Reload extends CommandInterface {
    /**
     * @param {CustomClient} client 
     * @param {CommandInteraction} interaction 
     */
    constructor(client) {
        super();
        this.client = client;
        this.name = "reload",
        this.defaultMemberPermissions = PermissionFlagsBits.Administrator,
        this.category = "Developer",
        this.description = "this is a test command",
        this.options = [],
        this.cooldown = 1;
        this.dev = true;
    };

    /**
     * @param {CommandInteraction} interaction 
     */
    execute(interaction) {
        this.client.reload()
        return interaction.reply({ content: "Reloaded!"})
    }
}