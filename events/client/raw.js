const client = require("../../index.js");

client.on("raw", (d) => {
    client.player.updateVoiceState(d); // IMPORTANT: We send raw events to Erelajs
});