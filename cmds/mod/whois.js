module.exports.run = async (bot, msg, args) => {
	const Discord = require('discord.js');
	let Mentioned = msg.mentions.members.first();
	const db = require('quick.db');
	var economy = new db.table('economy');
	var warn = new db.table('warn');

	if (!msg.member.hasPermission('ADMINISTRATOR'))
		return msg.channel.send("Dumb, dumb, you're not an admin.");

	if (!Mentioned) {
		let ErrorEmbed = new Discord.MessageEmbed()
			.setTitle('**ERROR**')
			.setColor(0xff0000)
			.setDescription('Please mention a user.');
		return msg.channel.send(ErrorEmbed);
	}

	let bal = economy.get(`${Mentioned.id}.bal`);
	let warnings = warn.get(`warnings_${msg.guild.id}_${Mentioned.id}`);

	let whois = new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setTitle('**' + Mentioned.user.username + "'s info**")
		.addFields(
			{
				name: 'User ID: ',
				value: (await msg.guild.members.fetch(Mentioned.id)).id,
				inline: true,
			},
			{
				name: 'Joined at: ',
				value: (await msg.guild.members.fetch(Mentioned.id)).joinedAt,
				inline: true,
			},
			{
				name: 'Nickname: ',
				value: (await msg.guild.members.fetch(Mentioned.id)).nickname,
				inline: true,
			},
			{
				name: 'Username: ',
				value: (await msg.guild.members.fetch(Mentioned.id)).user.username,
				inline: true,
			},
			{
				name: 'Last message in channel: ',
				value: '<#' + (await msg.guild.members.fetch(Mentioned.id)).lastMessageChannelID + '>',
				inline: true,
			},
			{ name: 'Money: ', value: bal, inline: true },
			{ name: 'warnings: ', value: `warnings: \n${warnings}`, inline: true }
		)
		.setImage(Mentioned.user.avatarURL);
	msg.channel.send(whois);
};

module.exports.help = {
	name: 'whois',
	description: 'View information about a user',
	AllowModest: true,
};
