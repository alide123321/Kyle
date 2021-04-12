const Discord = require('discord.js');
const bot = new Discord.Client({
	restTimeOffset: 0,
});

module.exports = {
	bot: bot,
};

require('dotenv').config();
bot.queue = new Map();
bot.commands = new Discord.Collection();

bot.on('ready', () => {
	const OnReady = require('./assets/handlers/ready').OnReady;
	OnReady(bot);
	delete require.cache[require.resolve('./assets/handlers/ready')];
});

bot.on('message', async (msg) => {
	const OnMsg = require('./assets/handlers/msg').OnMsg;
	OnMsg(msg);
	delete require.cache[require.resolve('./assets/handlers/msg')];
});

bot.on('guildMemberAdd', (member) => {
	const OnGuildMemberAdd = require('./assets/handlers/guildMemberAdd').OnGuildMemberAdd;
	OnGuildMemberAdd(member);
	delete require.cache[require.resolve('./assets/handlers/guildMemberAdd')];
});

bot.on('guildMemberRemove', (member) => {
	const OnGuildMemberRemove = require('./assets/handlers/guildMemberRemove').OnGuildMemberRemove;
	OnGuildMemberRemove(member);
	delete require.cache[require.resolve('./assets/handlers/guildMemberRemove')];
});

require('./handler')(bot);

bot.login(process.env.TOKEN); // turn bot online
