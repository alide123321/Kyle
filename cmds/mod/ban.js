module.exports.run = async (bot, msg, args) => {
	let mention = msg.mentions.members.first();

	if (msg.author.id !== '413323768954355712' && msg.author.id !== '698051518754062387') {
		// Cosmic and me
		return msg.channel.send('I told you. You cant use this command');
	}

	if (!mention) {
		return msg.channel.send('Who do u want to ban (its rly just a kick)');
	}

	if (
		mention.id === '698051518754062387' ||
		mention.id === '713878109509779516' ||
		mention.id === '799041797568725033'
	) {
		return msg.channel.send('Come on bruh');
	}

	if (mention.kickable) {
		let roles = mention.roles.cache.map((r) => r.name).slice(0, -1);

		try {
			await msg.author.send(`He had these roles \`${roles}\``);
			await mention.send(`U had these roles \`${roles}\` \nhttps://discord.gg/z4FpxSJ`);
		} catch (error) {
			msg.channel.send('Hes not letting me send him a invite link so hes not getting one');
		}

		msg.channel.send(`Done he had these roles \`${roles}\``);
		mention.kick();
	} else {
		return msg.channel.send('Cant kick them sry');
	}
};

module.exports.help = {
	name: 'ban',
	description: 'No U cant use this command',
	AllowModest: true,
};
