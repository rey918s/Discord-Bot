const Discord = require("discord.js");

module.exports = {
name: "help-rol",
permissions: ["BAN_MEMBERS"],
async execute(client, message, args, discord)  {

    if (!message.member.permissions.has("BAN_MEMBERS")) return message.channel.send("No tienes permiso para usar este comando.")

    const embed = new Discord.MessageEmbed();

    embed
        .setTitle("Como usar **d!rol**")
        .setAuthor({ name: `${message.author.username}`, iconURL: `${message.author.avatarURL({ dynamic: true })}`})
        .setColor("#8b33a3")
		.addFields(
            { name: '**Uso**', value: '`d!rol [Nombre del rol] - [HEX]`'},
            { name: '**Ejemplo**', value: 'd!rol cool role! - #FF0000', inline: true },
        )

    message.channel.send({ embeds: [embed] });
}
}