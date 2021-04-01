module.exports.run = async (bot, msg, args) => {
	const Discord = require('discord.js');
	let mentioned = msg.mentions.members.first();
	let Username = mentioned
		? `${mentioned.user.username}#${mentioned.user.discriminator}`
		: `${msg.author.username}#${msg.author.discriminator}`;
	let AvatarUrl = mentioned ? mentioned.user.avatarURL() : msg.author.avatarURL();

	let avatarEmbed = new Discord.MessageEmbed()
		.setAuthor(Username, AvatarUrl)
		.setTitle('**Avatar**')
		.setImage(AvatarUrl);
	msg.channel.send(avatarEmbed);
};

module.exports.help = {
	name: 'avatar',
	Alias: 'av',
	description: 'Show you avatar',
};
