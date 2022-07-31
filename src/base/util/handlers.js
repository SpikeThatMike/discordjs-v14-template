const CustomClient = require("./client");
const glob = require("glob");

module.exports = class Handlers {
    /**
     * @param {CustomClient} client 
     */
    constructor(client) {
        this.client = client;
    }

    loadCommands() {
        glob(`${process.cwd()}/src/commands/**/*.js`, (err, files) => {
            files.forEach((file) => {
                const command = new (require(file))(this.client);
                if(!command.name) return delete require.cache[require.resolve(file)] &&
                    console.log(`${file.split("/").pop()} does not have a command name! Removing the command.`);

                if(command.dev) this.client.devCommands.push(command);
                else this.client.publicCommands.push(command);
                this.client.commands.set(command.name, command);
                
                return delete require.cache[require.resolve(file)];
            });
        });
    }

    loadEvents() {
        glob(`${process.cwd()}/src/events/**/*.js`, (err, files) => {
            files.forEach((file) => {
                const event = new (require(file))(this.client);
                if(!event.name) return delete require.cache[require.resolve(file)] &&
                    console.log(`${file.split("/").pop()} does not have a event name! Removing the event.`);

                const execute = (...args) => event.execute(...args);
                if(event.once) this.client.once(event.name, execute);
                else this.client.on(event.name, execute)
                this.client.events.set(event.name, execute);

                console.log(`Loaded ${event.name.toUpperCase()} from ${file.split("/").pop()}`);
                return delete require.cache[require.resolve(file)];
            });
        });
    }
}