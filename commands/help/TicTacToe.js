module.exports = {
    name: "tct",
    async execute(client, message, args, discord) {
        let opponent = message.mentions.members.first()
        if (!opponent) return message.channel.send("**⛔ Please provide the user to challenge**")
        
        const { TicTacToe } = require('leaf-utils');
        
        await TicTacToe({
            message: message,
            slash_command: false,
            time: 300000,
            opponent: message.mentions.users.first(),
            embed: {
                title: 'Tic Tac Toe',
                color: '#8b33a3'
            },
            challenge: {
                acceptButton: 'Accept',
                denyButton: 'Deny',
            },
            emojis: {
                xEmoji: '❌',
                oEmoji: '🔵',
            },
            colors: {
                xEmoji: 'DANGER',
                oEmoji: 'PRIMARY',
            },
            noUser: 'You must mention someone',
            acceptMessage: '{{player}} has challenged you {{opponent}}',
            cancelMessage: '{{opponent}} refused to have a fight with you!',
            endMessage: 'Challenge not accepted in time',
            authorOnly: 'You can\'t use these buttons',
        })
    }
}