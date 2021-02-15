const { bot } = require('../../index');

bot.on('shardError', (error) => {
	console.log(`client's WebSocket encountered a connection error: ${error}`);
});

process.on('unhandledRejection', (error) => {
	console.error('Unhandled promise rejection:', error);
});
