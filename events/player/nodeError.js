const client = require("../../index.js");

client.player.on("nodeError", (node, error) => {
    console.log("Node " + node.options.identifier + " has an error: " + error.message + ".");

    setTimeout(() => {
        node.connect();
    }, 15000);
});