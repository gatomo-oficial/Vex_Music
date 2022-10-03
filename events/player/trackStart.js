const client = require("../../index.js");

client.player.on("trackStart", async (player, track) => {
    const channel = client.channels.cache.get(player.textChannel);

    const embed = {
        description: "Now playing `" + track.title + "`.",
        image: {
            url: track.displayThumbnail("maxresdefault")
        },
        timestamp: new Date()
    };

    if (channel) {
        channel.send({
            embeds: [embed]
        });
    }
});