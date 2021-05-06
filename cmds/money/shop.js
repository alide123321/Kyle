module.exports.run = async (bot, msg, args) => {
	const Discord = require('discord.js');
	const fs = require('fs');
	const db = require('quick.db');
	var shop = new db.table('shop');
	var economy = new db.table('economy');
	const shopObj = JSON.parse(fs.readFileSync('assets/util/shop.json'));

	var shopArr = [
		`Gn45MinCoolDown --- ${shopObj.gn45mincooldown}💰`,
		`Gn30MinCoolDown --- ${shopObj.gn30mincooldown}💰`,
		`Gn15MinCoolDown --- ${shopObj.gn15mincooldown}💰`,
		`Gn5MinCoolDown --- ${shopObj.gn5mincooldown}💰`,
		`Gn30sCoolDown --- ${shopObj.gn30scooldown}💰`,
		'These include .gm, .gn, and .sry',
	];

	if (!args[1]) {
		let ShopEmbed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('**Kyle Shop**')
			.setURL('https://sites.google.com/view/kyle-bot/home')
			.setThumbnail(
				'https://cdn.discordapp.com/attachments/739019780576641096/739022260857470981/Discord_Rose.png'
			)
			.setDescription(shopArr)
			.setFooter('To buy something use the command `.shop <name>` \ni.e. `.shop Gn45MinCoolDown`');

		return msg.channel.send(ShopEmbed);
	}

	if (!economy.get(`${msg.author.id}.bal`)) {
		let ErrorEmbed = new Discord.MessageEmbed()
			.setTitle('**ERROR**')
			.setColor(0xff0000)
			.setThumbnail(msg.author.avatarURL())
			.setDescription('You are not in the system try .newbal');
		return msg.channel.send(ErrorEmbed);
	}

	if (shopObj[args[1]] === undefined) {
		let ShopEmbed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('**Kyle Shop**')
			.setURL('https://sites.google.com/view/kyle-bot/home')
			.setThumbnail(
				'https://cdn.discordapp.com/attachments/739019780576641096/739022260857470981/Discord_Rose.png'
			)
			.setDescription(shopArr)
			.setFooter('To buy something use the command `.shop <name>` \ni.e. `.shop Gn45MinCoolDown`');

		return msg.channel.send(ShopEmbed);
	}

	if (economy.get(`${msg.author.id}.bal`) < shopObj[args[1]]) {
		let ErrorEmbed = new Discord.MessageEmbed()
			.setTitle('**ERROR**')
			.setColor(0xff0000)
			.setThumbnail(msg.author.avatarURL())
			.setDescription(
				`You do not have enough money you need ${
					shopObj[args[1]] - economy.get(`${msg.author.id}.bal`)
				} 💰`
			);
		return msg.channel.send(ErrorEmbed);
	}

	if (shop.get(`${msg.author.id}.${args[1]}`) === 1) {
		let ErrorEmbed = new Discord.MessageEmbed()
			.setTitle('**ERROR**')
			.setColor(0xff0000)
			.setThumbnail(msg.author.avatarURL())
			.setDescription(`You already Have ${shopObj[args[1]]}`);
		return msg.channel.send(ErrorEmbed);
	}

	economy.subtract(`${msg.author.id}.bal`, shopObj[args[1]]);

	shop.set(`${msg.author.id}.${args[1]}`, 1);

	let SuccessEmbed = new Discord.MessageEmbed()
		.setTitle('**Done!**')
		.setColor(0x32cd32)
		.setThumbnail(msg.author.avatarURL())
		.setDescription(`You Purchased ${args[1]} 👍`);
	msg.channel.send(SuccessEmbed);
};

module.exports.help = {
	name: 'shop',
	description: 'Buy something',
};
