module.exports.run = async (bot, msg, args) => {
	const Discord = require('discord.js');
	const db = require('quick.db');
	var economy = new db.table('economy');

	if (economy.has(`${msg.author.id}.bal`)) {
		let SuccessEmbed = new Discord.MessageEmbed()
			.setTitle('**ERORR**')
			.setColor(0x0099ff)
			.setThumbnail(msg.author.avatarURL())
			.setDescription('You are already in the economy!');
		msg.channel.send(SuccessEmbed);
		return;
	}

	economy.set(`${msg.author.id}.bal`, 100);
	economy.add(`${msg.author.id}.lc`, 0);
	economy.set(`${msg.author.id}.lrobed`, 0);
	economy.set(`${msg.author.id}.lgrobed`, 0);

	let SuccessEmbed = new Discord.MessageEmbed()
		.setTitle('**WELCOME**')
		.setColor(0x32cd32)
		.setThumbnail(msg.author.avatarURL())
		.setDescription('You have joined the economy!');
	msg.channel.send(SuccessEmbed);
};

module.exports.help = {
	name: 'newbal',
};
