module.exports.run = async (bot, msg, args) => {
	const Discord = require('discord.js');
	msg.channel.send('Pinging...').then((m) => {
		var ping = m.createdTimestamp - msg.createdTimestamp;
		var botPing = Math.round(bot.ws.ping);

		var embed = new Discord.MessageEmbed()
			.setAuthor(`Your ping is ${ping}ms\nBot\'s ping is ${botPing}ms`)
			.setColor('Your Color');

		m.delete();
		msg.channel.send(embed);
	});
};

module.exports.help = {
	name: 'ping',
	description: 'Pong',
};
