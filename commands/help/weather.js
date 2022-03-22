const weather = require('weather-js')

const discord = require('discord.js')

module.exports = {
  name: "clima",
    async execute (client, message, args) {

      if(!args.length) {
          return;
        }

        weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result) {
            try {
                let embed = new discord.MessageEmbed()
                .setTitle(`Clima en ${result[0].location.name}`).setColor("8b33a3")
                .setDescription(result[0].current.skytext)
                .addField("Temperatura", `${result[0].current.temperature}°C`, true)
                .addField('Se siente como', `${result[0].current.feelslike}°C`, true)
                .addField("Viento", result[0].current.winddisplay, true)
                .addField('Zona horaria', `UTC ${result[0].location.timezone}`, true)
                .addField('Escala de medición', 'Celcius', true)
                .addField("Humedad", `${result[0].current.humidity}%`, true)
                .setThumbnail(result[0].current.imageUrl)
                .setTimestamp();
                
                message.channel.send({ embeds: [embed] })

            } catch(err) {
                return message.channel.send("no hay datos sobre el pronóstico meteorologico de esa ubicación :c")
            }
        });
    }
}