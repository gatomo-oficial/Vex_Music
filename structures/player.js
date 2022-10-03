const {
    Client,
    Message
} = require("discord.js");
const {
    Structure,
    Manager
} = require("erela.js");
const Spotify = require("erela.js-spotify");
const Deezer = require("erela.js-deezer");
const Tidal = require("erela.js-tidal");
const Apple = require("better-erela.js-apple").default;

/**
 * 
 * @param {Client} client
 */

class Lavalink extends Manager {
    constructor(client) {
        super({
            nodes: [ // Our nodes to be able to play music (You can put others)
                {
                    identifier: "Main", // Lavalink hosted by DeathVGX 🖤死#8647
                    host: "138.201.254.94", // Lavalink host
                    password: "vexlavalink", // Lavalink password
                    port: 23719 // Lavalink port
                }
            ],
            // Plugins for support more plataform
            plugins: [
                new Spotify({
                    clientID: "2c99f0112ae54d2f854eac9761f54fc5",
                    clientSecret: "fbb818bec35241148728b45615f72176"
                }),
                new Deezer(),
                new Tidal(),
                new Apple()
            ],
            // defaultSearchPlataform: Options: "youtube", "soundcloud", "youtube music"
            send: (id, payload) => {
                const guild = client.guilds.cache.get(id);

                if (guild) {
                    guild.shard.send(payload);
                }
            }
        });

        this.client = client;

        console.log("Lavalink connected.");
    }
}

module.exports = Lavalink;