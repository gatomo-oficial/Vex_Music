const client = require("../../index.js");
const { ActivityType } = require("discord.js");

client.on("ready", async () => {
    client.player.init(client.user.id); // We start the player

    client.user.setPresence({
        activities: [
            {
                name: "v!help",
                type: ActivityType.Listening
            }
        ],
        status: "idle"
    });

    console.log("User " + client.user.username + " connected.");
});