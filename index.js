const Client = require("./structures/client");
const client = new Client();

client.start(); // We turn on the client

require("./util/command.js")(client); // We require handlers

module.exports = client;