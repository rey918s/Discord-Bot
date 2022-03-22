require("dotenv").config();

const prefix = process.env.PREFIX

const Discord = require("discord.js");

module.exports = {
    name: "embed",
    description: "Genera un embed en base a un imput",
    permissions: ["BAN_MEMBERS"],
    
    async execute(client, message, args, discord) {

        if (!message.member.permissions.has("BAN_MEMBERS")) return message.channel.send("No tienes permiso para usar este comando.")

        const msgcontent = args.join(" ");
        const msgsplit = msgcontent.split(' - ');
        const color = msgsplit[0]
        const title = msgsplit[1]
        const description = msgsplit[2]
        const image = msgsplit[3]

        if(!color) return message.channel.send('¡Ingresa el codigo HEX que quieres en tu embed!');
        if(!title) return message.channel.send("¡Ingresa el título que quieres en tu embed!");
        if(!description) return message.channel.send("Ingresa la descripción que quieres en tu embed!");

        const embed = new Discord.MessageEmbed()
        .setColor(`${color}`)
        .setTitle(`${title}`)
        .setDescription(`${description}`)
        .setImage(`${image}`)

        message.channel.send({ embeds: [embed] }).catch(error => {
            return;
        })
        
        if(image === undefined){
            
            const embed = new Discord.MessageEmbed()
            .setColor(`${color}`)
            .setTitle(`${title}`)
            .setDescription(`${description}`)
            
            message.channel.send({ embeds: [embed] });

            if (message.content.startsWith(prefix)) {
                message.delete(1000)
            }
        }
    }
}