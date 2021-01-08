module.exports.run = async (bot, msg, args) => {
	let mention = msg.mentions.members.first();

	if (!mention) {
		return msg.channel.send('He not in the server');
	}

	if (mention.id === '326895102708547585') {
		if (mention.kickable) {
			let roles = mention.roles.cache.map((r) => r.name).slice(0, -1);

			try {
				await mention.send(`U had these roles \`${roles}\` \nhttps://discord.gg/z4FpxSJ`);
			} catch (error) {
				msg.channel.send('Hes not letting me send him a invite link so hes not getting one');
			}

			msg.channel.send(`Done he had these roles \`${roles}\``);
			mention.kick();
		}
	} else {
		msg.channel.send('I think you mean `.kick <@326895102708547585>`');
	}
};

module.exports.help = {
	name: 'kick',
};
