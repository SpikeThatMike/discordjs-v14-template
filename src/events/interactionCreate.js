const CustomClient = require("../base/util/client");
const EventInterface = require("../base/templates/event");
const { CommandInteraction, InteractionType, Collection, EmbedBuilder } = require("discord.js");

module.exports = class InteractionCreate extends EventInterface {
    /**
     * @param {CustomClient} client 
     * @param {CommandInteraction} interaction
     */
    constructor(client) {
        super()
        this.client = client;
        this.name = "interactionCreate"
    };

    /**
     * @param {CommandInteraction} interaction
     */
    execute(interaction) {
        if(interaction.type != InteractionType.ApplicationCommand) return;

        const command = this.client.commands.get(interaction.commandName);
        if(!command) return interaction.reply({context: "This command no longer exists", ephemeral: true}) && this.client.commands.delete(interaction.commandName);

        const { cooldowns } = this.client;
        if(!cooldowns.has(command.name)) cooldowns.set(command.name, new Collection());

        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 3) * 1000;
        
        if(timestamps.has(interaction.member.id) && (now < timestamps.get(interaction.member.id) + cooldownAmount)) 
            return interaction.reply({embeds: [new EmbedBuilder()
                .setColor("Red")
                .setDescription(`❌ Please wait another \`${(((timestamps.get(interaction.member.id) + cooldownAmount) - now) / 1000).toFixed(1)}\` seconds to run this command`)
            ], ephemeral: true})
        timestamps.set(interaction.member.id, now);
        setTimeout(() => timestamps.delete(interaction.member.id), cooldownAmount);
            
        try {
            command.execute(interaction);
        } catch (error) {
            console.log(error);
            return interaction.reply({embed: [new EmbedBuilder()
              .setColor("Red")
              .setDescription("❌ An error has occured while running this command, check console for more detail")
            ], ephemeral: true})
        }
    }
}