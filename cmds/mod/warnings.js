module.exports.run = async (bot, msg, args) => {
	const Discord = require('discord.js');
	const db = require('quick.db');
	var warn = new db.table('warn');
	let mentioned = msg.mentions.members.first();

	if (!msg.member.hasPermission('ADMINISTRATOR'))
		return msg.channel.send('You must have admin perms to use this command!');

	if (!mentioned) return msg.channel.send(`Who do you want to warm? (.warnings <@>)`);

	if (mentioned.bot) return msg.channel.send('You can not warn bots.');

	let warnings = warn.get(`warnings_${msg.guild.id}_${mentioned.id}`);

	let warningEmbed = new Discord.MessageEmbed()
		.setTitle('**warnings**')
		.setColor(0x32cd32)
		.setThumbnail(mentioned.user.avatarURL())
		.setDescription(`**${mentioned}** was warned for ${warnings}`);

	if (warnings === null) {
		let noneEm = new Discord.MessageEmbed()
			.setTitle('**warnings**')
			.setColor(0x32cd32)
			.setThumbnail(mentioned.user.avatarURL())
			.setDescription(`**${mentioned}** has no warnings`);
		msg.channel.send(noneEm);
	} else if (warnings != null) {
		msg.channel.send(warningEmbed);
	}
};

module.exports.help = {
	name: 'warnings',
	description: 'Check warnings',
	AllowModest: true,
};
