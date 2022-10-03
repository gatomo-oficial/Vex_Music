const client = require("../../index.js");
require("dotenv").config();

client.on("messageCreate", async (message) => {
    const prefix = process.env.Prefix;

    if (message.author.bot) return;

    if (!message.content.toLowerCase().startsWith(prefix)) return;

    const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = client.commands.get(cmd.toLowerCase());

    if (command) {
        if (command.voiceChannel && !message.member.voice.channel) {
            return message.reply({
                content: "You have to be on a voice channel."
            });
        }

        if (command.sameVoiceChannel && message.guild.members.me.voice.channelId && message.member.voice.channelId !== message.guild.members.me.voice.channelId) {
            return message.reply({
                content: "You have to be on the same voice channel."
            });
        }

        if (command.player && !client.player.get(message.guild.id)) {
            return message.reply({
                content: "The player is not active."
            });
        }

        command.run(client, message, args);
    }
});