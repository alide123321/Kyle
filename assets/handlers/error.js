const { bot } = require('../../index');

bot.on('error', (error) => {
	console.log(`client's WebSocket encountered a connection error: ${error}`);
});
