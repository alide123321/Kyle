module.exports.run = async (bot, msg, args) => {
	const db = require('quick.db');
	var shop = new db.table('shop');
	const dmmsg = require('../../assets/functions/dmmsg.js').dmmsg;
	let mentioned = msg.mentions.members.first();

	if (dmmsg.has(msg.author.id) && msg.author.id !== '698051518754062387') {
		return msg.channel.send(
			'Cooldown for 1 hour (.gm, .gn, .sry) \n Unless you purchased a cooldown reduction from `.shop`'
		);
	}

	dmmsg.add(msg.author.id);
	if (shop.get(`${msg.author.id}.gn5mincooldown`) === 1) {
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
		}, 3600000);
	}

	if (!mentioned)
		msg.channel.send(
			'https://cdn.discordapp.com/attachments/599061991281131531/751735078203293726/118375543_164947441915565_6934644620562947858_n.mp4'
		);
	else {
		mentioned
			.send(
				'**' +
					msg.author.username +
					' Says Good Night**\n' +
					'https://cdn.discordapp.com/attachments/599061991281131531/751735078203293726/118375543_164947441915565_6934644620562947858_n.mp4'
			)
			.catch(() => {
				return msg.reply("Can't send DM to that user!");
			});
		msg.channel.send('Sent ' + mentioned.user.username + ' a Good Night msg');
	}
};

module.exports.help = {
	name: 'gn',
	Alias: 'goodnight',
};
