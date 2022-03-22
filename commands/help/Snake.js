module.exports = {
    name: "snake",
    async execute(client, message, args, discord) {
        
    const { Snake } = require('leaf-utils');
    
    new Snake({
        message: message,
        slash_command: false,
        snake: {
            head: '🟢',
            body: '🟩',
            tail: '🟢',
            over: '💀'
        },
        emojis: {
            board: '⬛',
            food: '🍎',
            up: '⬆️',
            right: '➡️',
            down: '⬇️',
            left: '⬅️',
        },
        foods: ['🍎', '🍇', '🍊', '🍕', '🥕', '🥞'],
        stopButton: {
            stopLabel: 'Stop',
            stopStyle: 'DANGER',
            },
            authorOnly: 'Only {{author}} can use these buttons',
        }).startGame();
    }
}