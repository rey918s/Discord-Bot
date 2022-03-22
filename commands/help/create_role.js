const Discord = require("discord.js");

module.exports = {
    name: "rol",
    permissions: ["BAN_MEMBERS"],
    
    async execute(client, message, args, discord) {

        if (!message.member.permissions.has("BAN_MEMBERS")) return message.channel.send("No tienes permiso para usar este comando.")

        const msgcontent = args.join(" ");
        const msgsplit = msgcontent.split(' - ');
        const name = msgsplit[0]
        const color = msgsplit[1]

        if(!name) return message.channel.send('Selecciona un nombre para tu rol!');
        if(!color) return message.channel.send("Selecciona un hexadecimal para el color de tu rol!");

        const role = message.guild.roles.create({
            name: `${name}`,
            color: `${color}`
        })

        const embed = new Discord.MessageEmbed()
        .setTitle(`El rol ¨${name}¨ ha sido creado`)
        .setColor("#17227e")

        message.channel.send({ embeds: [embed] })
    }
}