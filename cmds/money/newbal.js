module.exports.run = async (bot, msg, args) => {
	const Discord = require('discord.js');
	const db = require('quick.db');
	var economy = new db.table('economy');
	let author = msg.author.id;

	if (economy.has(`${author}.bal`)) {
		let SuccessEmbed = new Discord.MessageEmbed()
			.setTitle('**ERORR**')
			.setColor(0x0099ff)
			.setThumbnail(msg.author.avatarURL())
			.setDescription('You are already in the economy!');
		msg.channel.send(SuccessEmbed);
		return;
	}

	economy.set(`${author}.bal`, 100);
	economy.add(`${author}.lc`, 0);

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
