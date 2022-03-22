module.exports = {
    name: "findcouples",
    async execute(client, message, args, discord) {

        const { FindCouples } = require('leaf-utils');
        
        await FindCouples({
            message: message,
            slash_command: false,
            time: 300000,
            embed: {
                title: 'Match the Couples',
                color: '#8b33a3',
            },
            colors: {
                correct: 'SUCCESS',
                middle: 'PRIMARY',
                wrong: 'DANGER',
            },
            winMessage: 'Congrats {{user}}! You win.',
            endMessage: 'Time is up! Game stopped due to inactivity.',
            authorOnly: 'Only <@{{author}}> can use these buttons!',
        })
    }
}