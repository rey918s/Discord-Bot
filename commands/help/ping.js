const Discord = require("discord.js");

module.exports = {
    name: "ping",
    description: "Shows the ping of the bot!",
    roles: ["admin", "coder"],
    async execute(client, message, args, discord) {
    const embed = new Discord.MessageEmbed();

    embed
        .setTitle(`Ping: ${client.ws.ping} ms.`)
        .setColor("#8b33a3")
        .setURL("https://github.com/Rey-918")

    message.reply({ embeds: [embed] })
}}