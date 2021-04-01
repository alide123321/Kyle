module.exports.run = async (bot, msg, args) => {
	const Discord = require('discord.js');
	let avatarEmbed = new Discord.MessageEmbed()
		.setAuthor(`${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL())
		.setTitle('**Avatar**')
		.setImage(msg.author.avatarURL());
	msg.channel.send(avatarEmbed);
};

module.exports.help = {
	name: 'avatar',
	Alias: 'av',
	description: 'Show you avatar',
};
