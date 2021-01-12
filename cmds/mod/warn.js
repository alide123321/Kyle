const { userInfo } = require('os');

module.exports.run = async (bot, msg, args) => {
	const Discord = require('discord.js');
	const db = require('quick.db');
	var warn = new db.table('warn');
	let mentioned = msg.mentions.members.first();
	let reason = msg.content.slice(28);

	if (!msg.member.hasPermission('ADMINISTRATOR')) {
		if (!msg.member.roles.cache.find((r) => r.name === 'Moderators')) {
			return msg.channel.send('You must have admin perms to use this command!');
		}
	}

	if (!mentioned) return msg.channel.send(`Who do you want to warn? (.warn <@> <reason>)`);

	if (mentioned.user.bot) return msg.channel.send('You can not warn bots');

	if (msg.author.id === mentioned.id) return msg.channel.send('You can not warn yourself.');
	if (mentioned.id === '698051518754062387') return msg.channel.send('NO.');

	if (!reason) return msg.channel.send(`Who do you want to warn? (.warn <@> <reason>)`);

	var warnings = warn.get(`warnings_${msg.guild.id}_${mentioned.id}`);

	let warningEmbed = new Discord.MessageEmbed()
		.setTitle('**warn**')
		.setColor(0x32cd32)
		.setThumbnail(msg.author.avatarURL())
		.setDescription(`You warned **${mentioned}** for ${reason} by: <@${msg.author.id}>`);

	if (warnings === null) {
		warn.set(`warnings_${msg.guild.id}_${mentioned.id}`,`${reason} by <@${msg.author.id}>`); // prettier-ignore
		mentioned
			.send(`You have been warned in **${msg.guild.name}** for ${reason}`)
			.catch(() => msg.reply("Can't send DM to that user!"));
		await msg.channel.send(warningEmbed);
	} else if (warnings != null) {
		await warn.delete(`warnings_${msg.guild.id}_${mentioned.id}`);
		warnings = warnings.concat(`\n${reason} by <@${msg.author.id}>\n`);
		warn.set(`warnings_${msg.guild.id}_${mentioned.id}`, warnings);
		mentioned
			.send(`You have been warned in **${msg.guild.name}** for ${reason}`)
			.catch(() => msg.reply("Can't send DM to that user!"));
		await msg.channel.send(warningEmbed);
	}
};

module.exports.help = {
	name: 'warn',
};
