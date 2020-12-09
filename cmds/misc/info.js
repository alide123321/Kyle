module.exports.run = async (bot, msg, args) => {
	const Discord = require('discord.js');

	let helpLink = 'https://sites.google.com/view/kyle-bot/home';
	let codeLink = 'https://github.com/alide123321/discordbot';
	let version = process.env.VERSION;
	let prefix = process.env.PREFIX;
	let author = process.env.ALIDE;

	let seconds = Math.floor(msg.client.uptime / 1000);
	let minutes = Math.floor(seconds / 60);
	let hours = Math.floor(minutes / 60);
	let days = Math.floor(hours / 24);
	seconds %= 60;
	minutes %= 60;
	hours %= 24;
	let time = `Uptime: \`${days} day(s),${hours} hours, ${minutes} minutes, ${seconds} seconds\``;

	let info = new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setTitle('**Help commands**')
		.setURL(helpLink)
		.setThumbnail(
			'https://cdn.discordapp.com/attachments/739019780576641096/739022260857470981/Discord_Rose.png'
		)
		.addFields(
			{ name: 'Version: ', value: version, inline: true },
			{ name: 'Prefix: ', value: prefix, inline: true },
			{ name: 'Author: ', value: author, inline: true },
			{ name: 'Code: ', value: codeLink, inline: true },
			{ name: 'Uptime: ', value: time, inline: true }
		);
	msg.channel.send(info);
};

module.exports.help = {
	name: 'info',
};
