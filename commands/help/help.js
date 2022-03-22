const Discord = require("discord.js");

module.exports = {
name: "help",
description: "Comandos disponibles",
permission: "SEND_MESSAGES",
async execute(client, message, args, discord)  {
    const embed = new Discord.MessageEmbed();

    embed
        .setTitle("Lista de comandos | prefijo: **d!**")
        .setDescription(
            "**Comandos de música**\nReproducir una canción = **play** | **p**\nPausar la canción en curso = **pause**\nReanudar la canción en pausa = **resume**\nPoner una canción en bucle = **loop** \nDetener la música = **stop** | **leave**\nSaltar la canción en curso = **skip** | **s**\nVer la lista de canciones en cola = **queue** | **q**\nReproducir canciónes similares automáticamente = **autoplay**\nAjustar el volumen del 1 al 100 = **volume**"
        )
        .setColor("#8b33a3")
        .setThumbnail('https://pa1.narvii.com/6621/b2de03db0bb936fbcd2c30d9df0b9a52dd259cd5_hq.gif')
        .setTimestamp()
        .addFields(
            { name: '**Filtros para la música**', value: '`3d`\n`bassboost`\n`echo`\n`karaoke`\n`nightcore`\n`vaporwave`' },
            { name: '**Comandos de utilidades**', value: 'Ver el ping del bot = **ping**\nMuestra un usuario al azar del servidor **random**', inline: true },
            { name: '**Comandos de gestión**\n`se requieren permisos de administrador para usarlos`', value: 'Crear un rol **rol**\nCrear un embed **embed**\nSi tienes alguna duda usa **help-embed** o **help-rol**', inline: false },
            { name: '**Minigames**', value: 'Snake = **snake**\nRock Paper Scissors = **rps**\nCoin Flip = **coinflip**\nTic Tac Toe = **tct**\nFast Click = **fastclick**\nFind Couples = **findcouples**\nFlood = **flood**\nGuess The Pokemon = **gtp**\nSlots = **slots**', inline: false }
        )
        embed.setFooter({text: "Pacific Ocean"})

        message.author.send({ embeds: [embed] }).catch(error => {
            message.channel.send(`Algo salió mal mientras intentaba enviarte un DM, verifica que tengas abiertos los mensajes directos.`)
        })
        message.react('☑')
    }
}