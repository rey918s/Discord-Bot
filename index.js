require("dotenv").config();

const discord = require("discord.js");
const client = new discord.Client({
  intents: ["GUILDS", "GUILD_VOICE_STATES", "GUILD_MESSAGES", "GUILD_MEMBERS"],
});

const Discord = require('discord.js')
const { DisTube } = require('distube')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { SpotifyPlugin } = require('@distube/spotify')

// DisTube
client.commands = new discord.Collection();
client.events = new discord.Collection();

["commandHandler", "eventHandler"].forEach((file) => {
  require(`./handlers/${file}`)(client, discord);
});

const config = {
	prefix: 'd!',
	token: process.env.TOKEN,
}

// DisTubeOptions
const distube = new DisTube(client, {
	searchSongs: 5,
	searchCooldown: 30,
	leaveOnEmpty: true,
	emptyCooldown: 0,
	leaveOnFinish: true,
	leaveOnStop: true,
	plugins: [new SoundCloudPlugin(), new SpotifyPlugin()],
})

// DisTubeCommands
client.on('messageCreate', message => {
	if (message.author.bot) return
	if (!message.content.startsWith(config.prefix)) return
	const args = message.content
		.slice(config.prefix.length)
		.trim()
		.split(/ +/g)
	const command = args.shift()

	const embed = new Discord.MessageEmbed();

	if (['play', 'p'].includes(command)) { 
		distube.play(message, args.join(' '))
	}

	if (command === 'loop') {
		const mode = distube.setRepeatMode(message)
				
		embed
		.setTitle(`Modo de repetición establecido en \`${mode ? mode === 2 ? 'Toda la cola' : 'Esta canción' : 'Apagado'}\``)
		.setColor("#8b33a3")
		message.channel.send({ embeds: [embed] });
	}

	if (['stop', 'leave'].includes(command)) { distube.stop(message)
		embed
        .setTitle('¡La música se ha detenido!')
        .setColor("#8b33a3")
        message.channel.send({ embeds: [embed] });
    }

	if (command === 'resume') { distube.resume(message)

		embed
		.setTitle('¡La música se ha reanudado!')
		.setColor("#8b33a3")
		message.channel.send({ embeds: [embed] });
	}


	if (command === 'pause') { distube.pause(message)
		
		embed
		.setTitle('¡La música ahora está en pausa!')
		.setColor("#8b33a3")
		message.channel.send({ embeds: [embed] });
	}
	
	if (command == "volume") {
		distube.setVolume(message, Number(args[0]))
		const volume = parseInt(args[0])

		embed
		.setTitle(`Volumen establecido en \`${volume}\``)
		.setColor("#8b33a3")
		message.channel.send({ embeds: [embed] });
	}
	
	if (['skip', 's'].includes(command)) { distube.skip(message).catch(error => {

		embed
		.setTitle(`Probablemente la cola esté vacía o no exista.`)
		.setColor("#8b33a3")
		message.channel.send({ embeds: [embed] });
	})}

	if (['queue', 'q'].includes(command)) {
		const queue = distube.getQueue(message)
		if (!queue) {

			embed
			.setTitle(`¡No hay ninguna canción en cola ahora mismo!`)
			.setColor("#8b33a3")
			message.channel.send({ embeds: [embed] });
		} else {

			embed
			.setDescription(
				`**Cola actual:**\n${queue.songs
					.map(
						(song, id) =>
						`**${id ? id : 'Reproduciendo'}** ${song.name} - \`${
							song.formattedDuration
						}\``,
						)
						.slice(0, 10)
						.join('\n')}`)
			.setColor("#8b33a3")
			message.channel.send({ embeds: [embed] });
			
		}
	}

	if (
		[
			`3d`,
			`bassboost`,
			`echo`,
			`karaoke`,
			`nightcore`,
			`vaporwave`,
		].includes(command)
	) {
		const filter = distube.setFilter(message, command)
		embed
		.setTitle(`Filtro de la cola actual: ${filter.join(', ') || 'Apagado'}`)
		.setColor("#8b33a3")
		message.channel.send({ embeds: [embed] });
	}

	if (command == "autoplay") {
		const mode = distube.toggleAutoplay(message);
		embed
		.setTitle("Reproducir automáticamente canciones similares en `" + (mode ? "Encendido" : "Apagado") + "`")
		.setColor("#8b33a3")
		message.channel.send({ embeds: [embed] });
	}
})

// DisTubeQueue
const status = queue =>
	`Volumen: \`${queue.volume}%\` | Filtro: \`${queue.filters.join(', ')
		|| 'Apagado'}\` | Loop: \`${
		queue.repeatMode
			? queue.repeatMode === 2
				? 'Toda la cola'
				: 'Esta canción'
			: 'Apagado'
	}\` | Autoplay: \`${queue.autoplay ? 'Encendido' : 'Apagado'}\``

// DisTubeQueueEvents
distube
	.on('playSong', (queue, song) =>
		queue.textChannel.send(
			`Reproduciendo \`${song.name}\` - \`${
				song.formattedDuration
			}\`\nSolicitado por: ${song.user.username}\n${status(queue)}`,
		))
	.on('addSong', (queue, song) =>
		queue.textChannel.send(
			`Se ha agregado ${song.name} - \`${song.formattedDuration}\` a la cola por ${song.user.username}`,
		))
	.on('addList', (queue, playlist) =>
		queue.textChannel.send(
			`Se ha agregado el álbum/playlist \`${playlist.name}\` \n${status(queue)}`,
		))
	// DisTubeOptions.searchSongs = true
	.on('searchResult', (message, result) => {
		let i = 0
		message.channel.send(
			`**Elije un número de las siguientes opciones**\n${result
				.map(
					song =>
						`**${++i}**. ${song.name} - \`${
							song.formattedDuration
						}\``,
				)
				.join(
					'\n',
				)}\n*Elije cualquier numero o espere 30 segundos para cancelar*`,
		)
	})
	.on('searchCancel', message => message.channel.send(`Búsqueda cancelada`))
	.on('searchInvalidAnswer', message =>
		message.channel.send(`Respuesta de búsqueda no válida`))
	.on('searchNoResult', message => message.channel.send(`¡No se han encontrado resultados!`))
	.on('error', (textChannel, e) => {
		console.error(e)
		textChannel.send(`Se encontró un error: ${e.slice(0, 2000)}`)
	})
	.on('finish', () => {})
	.on('finishSong', () => {})
	.on('disconnect', () => {})
	.on('empty', () => {})
	.on("searchDone", () => {})

// DisTubeQueueEvents


// Nimu 
client.on('messageCreate', message => {
	if(message.author.bot || message.channel.type === `DM`) return;

	if(message.mentions.members.get(
		`169459343039791106`
		)){
		client.channels.cache.get(
			'797464506980630539'
			).send(`${message.author} ha mencionado a: ${message.mentions.members.get(
				`169459343039791106`
				).user.tag}`);
	}
});

// Esquizo
client.on('messageCreate', message => {
	if(message.author.bot || message.channel.type === `DM`) return;

	if(message.mentions.members.get(
		`288386770700337152`
		)){
		client.channels.cache.get(
			'797464506980630539'
			).send(`${message.author} ha mencionado a: ${message.mentions.members.get(
				`288386770700337152`
				).user.tag}`);
	}
});

// Dippo
client.on('messageCreate', message => {
	if(message.author.bot || message.channel.type === `DM`) return;

	if(message.mentions.members.get(
		`695117042033885202`
		)){
		client.channels.cache.get(
			'797464506980630539'
			).send(`${message.author} ha mencionado a: ${message.mentions.members.get(
				`695117042033885202`
				).user.tag}`);
	}
});

// Late
client.on('messageCreate', message => {
	if(message.author.bot || message.channel.type === `DM`) return;

	if(message.mentions.members.get(
		`322969753264324608`
	)){
		client.channels.cache.get(
			'797464506980630539'
			).send(`${message.author} ha mencionado a: ${message.mentions.members.get(
				`322969753264324608`
				).user.tag}`);
	}
});

// Atherion
client.on('messageCreate', message => {
	if(message.author.bot || message.channel.type === `DM`) return;

	if(message.mentions.members.get(
		`332599069027598336`
		)){
		client.channels.cache.get(
			'797464506980630539'
			).send(`${message.author} ha mencionado a: ${message.mentions.members.get(
				`332599069027598336`
				).user.tag}`);
	}
});

//!d bump
client.on('messageCreate', function(message) {
    if (message.content === "!d bump") {
		message.react('☑')
        let intervalFunc = setInterval(() => {
            message.channel.send("Hey, recuerda hacer `!d bump` :)")
			clearInterval(intervalFunc)
        }, 7800000);
    }
});

// Status
const arrayOfStatus = [
		'd!help for commands',
		'Connected on 3 servers'
	]
	
	client.on('ready', () => {
		setInterval(() => {
			client.user.setPresence({ activities: [{ name: arrayOfStatus[Math.floor(Math.random() * arrayOfStatus.length)] }], status: 'online', type: 'LISTENING' })
		}, 30000)
	})

client.login(process.env.TOKEN);