const Discord = require("discord.js");

module.exports = {
name: "help-embed",
permissions: ["BAN_MEMBERS"],
async execute(client, message, args, discord)  {

    if (!message.member.permissions.has("BAN_MEMBERS")) return message.channel.send("No tienes permiso para usar este comando.")

    const embed = new Discord.MessageEmbed();

    embed
        .setTitle("Como usar **d!embed**")
        .setAuthor({ name: `${message.author.username}`, iconURL: `${message.author.avatarURL({ dynamic: true })}`})
        .setDescription('**Nota**, las imagenes son opcionales')
        .setColor("#8b33a3")
		.addFields(
            { name: '**Uso**', value: '`d!embed [HEX] - [Titulo] - [Descripción] - [URL de una imagen]`'},
            { name: '**Ejemplo**', value: 'd!embed #FF0000 - Hello - World! ', inline: true },
        )

    message.channel.send({ embeds: [embed] });
}
}
