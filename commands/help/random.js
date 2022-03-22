const Discord = require("discord.js");

module.exports = {
    name: "random",
    permissions: ["BAN_MEMBERS"],
    
    async execute(client, message, args, discord) {

        const randomUser = message.guild.members.cache.random();

        const embed = new Discord.MessageEmbed()

        embed
           .setTitle(`${randomUser.user.username}#${randomUser.user.discriminator}`)
           .setColor(`#8b33a3`)
            
        message.channel.send({ embeds: [embed] })
    }
}
