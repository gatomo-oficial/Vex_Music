const client = require("../../index.js");

client.on("voiceStateUpdate", async (oldVoice, newVoice) => {
    const player = client.player.players.get(oldVoice.guild.id);

    if (!oldVoice || !oldVoice.guild || !oldVoice.guild.id) return;

    if (!player) return;

    if (!client || !client.user || !client.user.id) return;

    if (player.twentyFourSeven) return;

    if (newVoice.guild && !newVoice.guild.members.cache.get(client.user.id).voice.channelId) {
        player.destroy();
    }

    if (oldVoice.id === client.user.id) return;

    if (!oldVoice.channelId) return;

    if (oldVoice.guild && !oldVoice.guild.members.cache.get(client.user.id).voice.channelId) return;

    if (oldVoice.guild && oldVoice.guild.members.cache.get(client.user.id).voice.channel && oldVoice.guild.members.cache.get(client.user.id).voice.channel.id == oldVoice.channelId) {
        if (oldVoice.guild.members.me.voice.channel && oldVoice.guild.members.me.voice.channel.members && oldVoice.guild.members.me.voice.channel.members.size === 1) {
            const channel = await client.channels.cache.get(player.textChannel);

            if (!channel) return;

            const delay = (ms) => new Promise((res) => setTimeout(res, ms));

            await delay(60000);

            if (!oldVoice.guild.members.me.voice.channel) return;

            const vcMembers = oldVoice.guild.members.me.voice.channel.members.size;

            if (!vcMembers || vcMembers === 1) {
                const newPlayer = client.player.players.get(newVoice.guild.id);

                if (newPlayer) {
                    player.destroy();
                } else {
                    oldVoice.guild.members.me.voice.channel.leave();
                }
            }
        }
    }
});