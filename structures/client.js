const {
    Client,
    GatewayIntentBits,
    Partials,
    Collection
} = require("discord.js");
const Lavalink = require("./player.js");
require("dotenv").config();

class Vex extends Client {
    constructor() {
        super({
            shards: "auto",
            restTimeOffSet: 0,
            allowedMentions: {
                repliedUser: false
            },
            intents: [
                GatewayIntentBits.DirectMessageReactions,
                GatewayIntentBits.DirectMessageTyping,
                GatewayIntentBits.DirectMessages,
                GatewayIntentBits.GuildBans,
                GatewayIntentBits.GuildEmojisAndStickers,
                GatewayIntentBits.GuildIntegrations,
                GatewayIntentBits.GuildInvites,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildMessageReactions,
                GatewayIntentBits.GuildMessageTyping,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildPresences,
                GatewayIntentBits.GuildScheduledEvents,
                GatewayIntentBits.GuildVoiceStates,
                GatewayIntentBits.GuildWebhooks,
                GatewayIntentBits.Guilds,
                GatewayIntentBits.MessageContent
            ],
            partials: [
                Partials.Channel,
                Partials.GuildMember,
                Partials.GuildScheduledEvent,
                Partials.Message,
                Partials.Reaction,
                Partials.ThreadMember,
                Partials.User
            ]
        });

        this.commands = new Collection();
        this.slashcommands = new Collection();
        this.player = new Lavalink(this);
    }

    start() {
        this.login(process.env.Token);
    }
}

module.exports = Vex;