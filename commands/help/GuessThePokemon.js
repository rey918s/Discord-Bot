module.exports = {
    name: "gtp",
    async execute(client, message, args, discord) {
        const { GuessThePokemon } = require('leaf-utils');

await GuessThePokemon({
            message: message,
            slash_command: false,
            time: 300000,
            embed: {
              title: 'Guess The Pokemon',
              description: 'Type in chat what you think the pokemon is',
              color: '#8b33a3',
              stopcolor: '#D52000',
            },
            button: {
              label: 'Stop',
              style: 'DANGER',
              emoji: '⏹️' // optional
            },
            correctMessage: 'GG! You guessed the correct pokemon. It was {{pokemon}}',
            wrongMessage: 'Wrong. It was {{pokemon}}',
            stopMessage: 'You have ended the game, the correct pokemon was {{pokemon}}',
            authorOnly: 'Only <@{{author}}> can use this button!',
        })
    }
}