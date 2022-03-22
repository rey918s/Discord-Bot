module.exports = {
    name: "flood",
    async execute(client, message, args, discord) {

        const { Flood } = require('leaf-utils');
        
        await Flood({
            message: message,
            slash_command: false,
            time: 300000,
            difficulty: 13,
            embed: {
                title: 'Flood',
                color: '#8b33a3'
            },
            emojis: {
                redsquare: '🟥',
                bluesquare: '🟦',
                yellowsquare: '🟨',
                greensquare: '🟩',
                purplesquare: '🟪',
                style: 'SECONDARY',
            },
            authorOnly: 'Only <@{{author}}> can use these buttons!',
        })
    }
}