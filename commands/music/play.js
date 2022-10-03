const {
    Client,
    Message
} = require("discord.js");

module.exports = {
    name: "play",
    voiceChannel: true,
    sameVoiceChannel: true,

    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String} args
     */

    run: async (client, message, args) => {
        const search = args.join(" ");

        if (!search) {
            return message.reply({
                content: "You have to put a song."
            });
        }

        if (!client.player.leastUsedNodes.first()) {
            return message.reply({
                content: "No nodes are connected."
            });
        }

        const msg = await message.reply({
            content: "Loading... (This may take a few seconds)."
        });

        var player = client.player.players.get(message.guild.id);

        if (!player) {
            player = client.player.create({
                guild: message.guild.id,
                voiceChannel: message.member.voice.channelId,
                textChannel: message.channel.id,
                selfDeafen: true, // If the bot is deafened
                selfMute: true, // If the bot is muted
                volume: 80
            });
        }

        const res = await player.search(search, message.author);
        const errors = [];

        try {
            if (!player) {
                msg.edit({
                    content: "The player is not active."
                });
            }

            if (res.loadType === "LOAD_FAILED") {
                if (!player.queue.current) {
                    player.destroy();
                }

                throw res.exception;
            }
        } catch (err) {
            console.error(err);

            if (res.exception.message === "Request failed with status code 404" && res.exception.severity === "COMMON") {
                errors.push("Spotify responded with 404 code.");
            } else if (res.exception.message === "Unknown file format." && res.exception.severity === "COMMON") {
                errors.push("Unknown format.");
            } else if (res.exception.message === "Not a valid URL." && res.exception.severity === "COMMON") {
                errors.push("Invalid URL.");
            } else {
                errors.push("Unknown error.");
            }
        }

        if (res.loadType === "NO_MATCHES") {
            if (!player.queue.current) {
                player.destroy();
            }

            msg.edit({
                content: "The song was not found."
            });
        } else if (res.loadType === "LOAD_FAILED") {
            if (!player.queue.current) {
                player.destroy();
            }

            msg.edit({
                content: "The song could not be loaded.\nReason: " + errors
            });
        } else if (res.loadType === "PLAYLIST_LOADED") {
            if (player.state !== "CONNECTED") {
                player.connect();
                message.guild.members.me.voice.setDeaf(true); // Function if you want the bot to be deaf in the server
            }

            player.queue.add(res.tracks);

            msg.edit({
                content: "The playlist was added to the queue.\nAdded `" + res.tracks.length + "` songs to the queue."
            });

            if (!player.playing && !player.paused && player.queue.totalSize === res.tracks.length) {
                player.play();
            }
        } else {
            if (player.state !== "CONNECTED") {
                player.connect();
                message.guild.members.me.voice.setDeaf(true); // Function if you want the bot to be deaf in the server
            }

            player.queue.add(res.tracks[0]);

            msg.edit({
                content: "The song `" + res.tracks[0].title + "` was added to the queue."
            });

            if (!player.playing && !player.paused && !player.queue.size) {
                player.play();
            }
        }
    }
};