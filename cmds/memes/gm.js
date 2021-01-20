module.exports.run = async (bot, msg, args) => {
	const db = require('quick.db');
	var shop = new db.table('shop');
	const dmmsg = require('../../assets/functions/dmmsg.js').dmmsg;
	let mentioned = msg.mentions.members.first();

	if (dmmsg.has(msg.author.id) && msg.author.id !== '698051518754062387') {
		return msg.channel.send(
			'Cooldown for 12 hour (.gm, .gn, .sry) \n Unless you purchased a cooldown reduction from `.shop`'
		);
	}

	dmmsg.add(msg.author.id);
	if (shop.get(`${msg.author.id}.gn30scooldown`) === 1) {
		setTimeout(() => {
			dmmsg.delete(msg.author.id);
		}, 30000);
	} else if (shop.get(`${msg.author.id}.gn5mincooldown`) === 1) {
		setTimeout(() => {
			dmmsg.delete(msg.author.id);
		}, 300000);
	} else if (shop.get(`${msg.author.id}.gn15mincooldown`) === 1) {
		setTimeout(() => {
			dmmsg.delete(msg.author.id);
		}, 900000);
	} else if (shop.get(`${msg.author.id}.gn30mincooldown`) === 1) {
		setTimeout(() => {
			dmmsg.delete(msg.author.id);
		}, 1800000);
	} else if (shop.get(`${msg.author.id}.gn45mincooldown`) === 1) {
		setTimeout(() => {
			dmmsg.delete(msg.author.id);
		}, 2700000);
	} else {
		setTimeout(() => {
			dmmsg.delete(msg.author.id);
		}, 43200000);
	}

	if (!mentioned)
		msg.channel.send(
			'https://cdn.discordapp.com/attachments/599061991281131531/757130408251883571/videoplayback.mp4'
		);
	else {
		mentioned
			.send(
				'**' +
					msg.author.username +
					' Says Good Morning**\n' +
					'https://cdn.discordapp.com/attachments/599061991281131531/757130408251883571/videoplayback.mp4'
			)
			.catch(() => {
				return msg.reply("Can't send DM to that user!");
			});
		msg.channel.send('Sent ' + mentioned.user.username + ' a Good Morning msg');
	}
};

module.exports.help = {
	name: 'gm',
	Alias: 'goodmorning',
};
