<<<<<<< HEAD
const CustomClient = require("../base/util/client");
const commandInterface = require("../base/templates/command");
const { PermissionFlagsBits, CommandInteraction } = require("discord.js");

module.exports = class test extends commandInterface {
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
=======
const CustomClient = require("../base/util/client");
const commandInterface = require("../base/templates/command");
const { PermissionFlagsBits, CommandInteraction } = require("discord.js");

module.exports = class test extends commandInterface {
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
>>>>>>> dd90dc0d69e846f42dad0ceda6948d23eaaf0cd3
}