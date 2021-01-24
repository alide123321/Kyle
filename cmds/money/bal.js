module.exports.run = async (bot, msg, args) => {
	const Discord = require('discord.js');
	const db = require('quick.db');
	var economy = new db.table('economy');
	let mentioned = msg.mentions.members.first();

	if (mentioned) {
		if (!economy.has(`${mentioned.id}.bal`)) {
			let ErrorEmbed = new Discord.MessageEmbed()
				.setTitle('**ERROR**')
				.setColor(0xff0000)
				.setThumbnail(msg.author.avatarURL())
				.setDescription("That person isn't in the system, tell them to use the .newbal command.");
			msg.channel.send(ErrorEmbed);
			return;
		}

		let SuccessEmbed = new Discord.MessageEmbed()
			.setTitle('**' + mentioned.user.username + "'S BALANCE**")
			.setColor(0x32cd32)
			.setThumbnail(mentioned.user.avatarURL())
			.addField('Balance', economy.get(`${mentioned.id}.bal`), '💰');
		msg.channel.send(SuccessEmbed);
		return;
	} else {
		if (!economy.has(`${msg.author.id}.bal`)) {
			let ErrorEmbed = new Discord.MessageEmbed()
				.setTitle('**ERROR**')
				.setColor(0xff0000)
				.setThumbnail(msg.author.avatarURL())
				.setDescription('You are not in the system, use the .newbal command.');
			msg.channel.send(ErrorEmbed);
			return;
		}

		let SuccessEmbed = new Discord.MessageEmbed()
			.setTitle('**YOUR BALANCE**')
			.setColor(0x32cd32)
			.setThumbnail(msg.author.avatarURL())
			.addField('Balance', economy.get(`${msg.author.id}.bal`), '💰');
		msg.channel.send(SuccessEmbed);
	}
};

module.exports.help = {
	name: 'bal',
	description: 'Check your ballance',
};
