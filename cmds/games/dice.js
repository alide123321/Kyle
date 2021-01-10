module.exports.run = async (bot, msg, args) => {
	const Discord = require('discord.js');
	const db = require('quick.db');
	var economy = new db.table('economy');

	var dice = parseInt(args[1]);
	let bet = args[2];
	let rand = Math.floor(Math.random() * 6) + 1;

	if (!economy.get(`${msg.author.id}.bal`)) {
		let ErrorEmbed = new Discord.MessageEmbed()
			.setTitle('**ERROR**')
			.setColor(0xff0000)
			.setThumbnail(msg.author.avatarURL())
			.setDescription('You are not in the system try .newbal');
		msg.channel.send(ErrorEmbed);
		return;
	}

	if (!args[1] || isNaN(dice)) {
		let ErrorEmbed = new Discord.MessageEmbed()
			.setTitle('**ERROR**')
			.setColor(0xff0000)
			.setThumbnail(msg.author.avatarURL())
			.setDescription('What number are you betting on? \n.dice <1/2/3/4/5/6> <Bet>');
		msg.channel.send(ErrorEmbed);
		return;
	}

	if (dice > 6 || dice < 1) {
		let ErrorEmbed = new Discord.MessageEmbed()
			.setTitle('**ERROR**')
			.setColor(0xff0000)
			.setThumbnail(msg.author.avatarURL())
			.setDescription('What number are you betting on? \n.dice <1/2/3/4/5/6> <Bet>');
		msg.channel.send(ErrorEmbed);
		return;
	}

	if (!args[2] || isNaN(bet)) {
		let ErrorEmbed = new Discord.MessageEmbed()
			.setTitle('**ERROR**')
			.setColor(0xff0000)
			.setThumbnail(msg.author.avatarURL())
			.setDescription('How much do you want to bet? .dice <1/2/3/4/5/6> <Bet>');
		msg.channel.send(ErrorEmbed);
		return;
	}

	bet = Math.floor(bet);

	if (bet < 0) {
		let ErrorEmbed = new Discord.MessageEmbed()
			.setTitle('**ERROR**')
			.setColor(0xff0000)
			.setThumbnail(msg.author.avatarURL())
			.setDescription('You must bet 0 or more.');
		msg.channel.send(ErrorEmbed);
		return;
	}

	if (bet > 1000) {
		let ErrorEmbed = new Discord.MessageEmbed()
			.setTitle('**ERROR**')
			.setColor(0xff0000)
			.setDescription('Max bet is 1000💰 ')
			.setFooter(`Your bet was chaned from ${bet}💰 to 1000💰`);
		msg.channel.send(ErrorEmbed);

		bet = 1000;
	}

	if (economy.get(`${msg.author.id}.bal`) < bet) {
		let ErrorEmbed = new Discord.MessageEmbed()
			.setTitle('**ERROR**')
			.setColor(0xff0000)
			.setThumbnail(msg.author.avatarURL())
			.setDescription('You do not have enough money.');
		msg.channel.send(ErrorEmbed);
		return;
	}

	if (dice === rand) {
		bet *= 5;

		economy.add(`${msg.author.id}.bal`, bet);
		let SuccessEmbed = new Discord.MessageEmbed()
			.setTitle('**WIN**')
			.setColor(0x32cd32)
			.setThumbnail(msg.author.avatarURL())
			.setDescription('You won: ' + bet + ' :) 💰');
		msg.channel.send(SuccessEmbed);
		return;
	} else {
		economy.subtract(`${msg.author.id}.bal`, bet);
		economy.add(`Prizepool`, bet);
		let SuccessEmbed = new Discord.MessageEmbed()
			.setTitle("**LOSS**")
			.setColor(0xff0000)
			.setThumbnail(msg.author.avatarURL())
			.setDescription("You lost: " +bet +" 💰 :(\n The dice was: " +rand); // prettier-ignore
		msg.channel.send(SuccessEmbed);
		return;
	}
};

module.exports.help = {
	name: 'dice',
};
