const client = require("../../index.js");

client.player.on("playerMove", async (player, oldChannel, newChannel) => {
    player.voiceChannel = client.channels.cache.get(newChannel);
});