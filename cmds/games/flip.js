module.exports.run = async (bot, msg, args) => {
	const Discord = require('discord.js');
	const db = require('quick.db');
	var economy = new db.table('economy');

	let bet = args[1];
	let rand = Math.floor(Math.random() * 2);

	if (!economy.get(`${msg.author.id}.bal`)) {
		let ErrorEmbed = new Discord.MessageEmbed()
			.setTitle('**ERROR**')
			.setColor(0xff0000)
			.setThumbnail(msg.author.avatarURL())
			.setDescription('You are not in the system try .newbal');
		return msg.channel.send(ErrorEmbed);
	}

	if (!args[1] || isNaN(bet)) {
		let ErrorEmbed = new Discord.MessageEmbed()
			.setTitle('**ERROR**')
			.setColor(0xff0000)
			.setThumbnail(msg.author.avatarURL())
			.setDescription('How much do you want to bet?');
		return msg.channel.send(ErrorEmbed);
	}

	bet = Math.floor(bet);

	if (bet < 0) {
		let ErrorEmbed = new Discord.MessageEmbed()
			.setTitle('**ERROR**')
			.setColor(0xff0000)
			.setThumbnail(msg.author.avatarURL())
			.setDescription('You must bet 0 or more.');
		return msg.channel.send(ErrorEmbed);
	}

	if (economy.get(`${msg.author.id}.bal`) < bet) {
		let ErrorEmbed = new Discord.MessageEmbed()
			.setTitle('**ERROR**')
			.setColor(0xff0000)
			.setThumbnail(msg.author.avatarURL())
			.setDescription('You do not have enough money.');
		return msg.channel.send(ErrorEmbed);
	}

	if (rand === 0) {
		economy.subtract(`${msg.author.id}.bal`, bet);
		economy.add(`Prizepool`, bet);
		let SuccessEmbed = new Discord.MessageEmbed()
			.setTitle('**LOSS**')
			.setColor(0xff0000)
			.setThumbnail(msg.author.avatarURL())
			.setDescription('You lost: ' + bet + ' :( 💰');
		msg.channel.send(SuccessEmbed);
	} else {
		economy.add(`${msg.author.id}.bal`, bet);
		let SuccessEmbed = new Discord.MessageEmbed()
			.setTitle('**WIN**')
			.setColor(0x32cd32)
			.setThumbnail(msg.author.avatarURL())
			.setDescription('You won: ' + bet + ' :) 💰');
		msg.channel.send(SuccessEmbed);
	}
};

module.exports.help = {
	name: 'flip',
};
