module.exports.run = async (bot, msg, args) => {
	const dmmsg = require('../../assets/functions/dmmsg.js').dmmsg;
	let mentioned = msg.mentions.members.first();

	if (dmmsg.has(msg.author.id) && msg.author.id !== '698051518754062387') {
		return msg.channel.send('Cooldown for 1 hour (.gm, .gn, .sry)');
	}

	dmmsg.add(msg.author.id);
	setTimeout(() => {
		dmmsg.delete(msg.author.id);
	}, 3600000);

	if (!mentioned)
		msg.channel.send(
			'https://cdn.discordapp.com/attachments/599061991281131531/767378167408885810/video0.mov'
		);
	else {
		mentioned
			.send(
				'**' +
					msg.author.username +
					' Says Sorry**\n' +
					'https://cdn.discordapp.com/attachments/599061991281131531/767378167408885810/video0.mov'
			)
			.catch(() => {
				return msg.reply("Can't send DM to that user!");
			});
		msg.channel.send('Sent ' + mentioned.user.username + ' a sorry msg');
	}
};

module.exports.help = {
	name: 'sorry',
	Alias: 'sry',
};
