module.exports.run = async (bot, msg, args) => {
	const Discord = require('discord.js');
	const db = require('quick.db');
	var economy = new db.table('economy');

	let bet = args[2];
	let drand = Math.floor(Math.random() * 3);

	if (!economy.has(`${msg.author.id}.bal`)) {
		let ErrorEmbed = new Discord.MessageEmbed()
			.setTitle('**ERROR**')
			.setColor(0xff0000)
			.setThumbnail(msg.author.avatarURL())
			.setDescription('You are not in the system try .newbal');
		return msg.channel.send(ErrorEmbed);
	}

	if (!args[2] || isNaN(bet)) {
		let ErrorEmbed = new Discord.MessageEmbed()
			.setTitle('**ERROR**')
			.setColor(0xff0000)
			.setThumbnail(msg.author.avatarURL())
			.setDescription('How much do you want to bet? <0/1/2> <bet> \n0-Rock\n1-Paper\n2-scissors');
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
		return msg.channel.send(ErrorEmbed);
	}

	if (!args[1]) {
		let ErrorEmbed = new Discord.MessageEmbed()
			.setTitle('**ERROR**')
			.setColor(0xff0000)
			.setThumbnail(msg.author.avatarURL())
			.setDescription('What do you want? <0/1/2> <bet> \n0-Rock\n1-Paper\n2-scissors');
		return msg.channel.send(ErrorEmbed);
	}

	let player = args[1];
	if (player != 0 && player != 1 && player != 2) {
		let ErrorEmbed = new Discord.MessageEmbed()
			.setTitle('**ERROR**')
			.setColor(0xff0000)
			.setThumbnail(msg.author.avatarURL())
			.setDescription('What do you want? \n0-Rock\n1-Paper\n2-scissors');
		return msg.channel.send(ErrorEmbed);
	}

	// 0 = rock
	// 1 = paper
	// 2 = sis

	if (player == 0) {
		if (drand === 0) {
			//if u get rock and dealer gets rock
			let SuccessEmbed = new Discord.MessageEmbed()
				.setTitle('**ew**')
				.setColor(0xffa500)
				.setThumbnail(msg.author.avatarURL())
				.setDescription('You both got rock');
			msg.channel.send(SuccessEmbed);
		} else if (drand === 1) {
			//if u get rock and dealer gets paper
			let dealer = 'paper';
			economy.subtract(`${msg.author.id}.bal`, bet);
			economy.add(`Prizepool`, bet);
			let SuccessEmbed = new Discord.MessageEmbed()
				.setTitle('**LOSS**')
				.setColor(0xff0000)
				.setThumbnail(msg.author.avatarURL())
				.setDescription('You lost: ' + bet + ' 💰 :(\nBot got: ' + dealer);
			msg.channel.send(SuccessEmbed);
		} else if (drand === 2) {
			//if u get rock and dealer gets sis
			let dealer = 'scissors';
			bet *= 4;
			bet = Math.floor(bet / 5);
			economy.add(`${msg.author.id}.bal`, bet);
			let SuccessEmbed = new Discord.MessageEmbed()
				.setTitle('**Win**')
				.setColor(0x32cd32)
				.setThumbnail(msg.author.avatarURL())
				.setDescription('You Win: ' + bet + '💰\nBot got: ' + dealer)
				.setFooter('You win %80 of your bet');
			msg.channel.send(SuccessEmbed);
		}
		return;
	} else if (player == 1) {
		if (drand === 1) {
			//if u get paper and dealer gets paper
			let SuccessEmbed = new Discord.MessageEmbed()
				.setTitle('**ew**')
				.setColor(0xffa500)
				.setThumbnail(msg.author.avatarURL())
				.setDescription('You both got paper');
			msg.channel.send(SuccessEmbed);
		} else if (drand === 2) {
			//if u get paper and dealer gets sis
			let dealer = 'scissors';
			economy.subtract(`${msg.author.id}.bal`, bet);
			economy.add(`Prizepool`, bet);
			let SuccessEmbed = new Discord.MessageEmbed()
				.setTitle('**LOSS**')
				.setColor(0xff0000)
				.setThumbnail(msg.author.avatarURL())
				.setDescription('You lost: ' + bet + ' 💰 :(\nBot got: ' + dealer);
			msg.channel.send(SuccessEmbed);
		} else if (drand === 0) {
			//if u get paper and dealer gets rock
			let dealer = 'rock';
			bet *= 4;
			bet = Math.floor(bet / 5);
			economy.add(`${msg.author.id}.bal`, bet);
			let SuccessEmbed = new Discord.MessageEmbed()
				.setTitle('**Win**')
				.setColor(0x32cd32)
				.setThumbnail(msg.author.avatarURL())
				.setDescription('You Win: ' + bet + '💰 \nBot got: ' + dealer)
				.setFooter('You win %80 of your bet');
			msg.channel.send(SuccessEmbed);
		}
		return;
	} else if (player == 2) {
		if (drand === 2) {
			//if u get sis and dealer gets sis
			let SuccessEmbed = new Discord.MessageEmbed()
				.setTitle('**ew**')
				.setColor(0xffa500)
				.setThumbnail(msg.author.avatarURL())
				.setDescription('You both got scissors');
			msg.channel.send(SuccessEmbed);
		} else if (drand === 0) {
			//if u get sis and dealer gets rock
			let dealer = 'rock';
			economy.subtract(`${msg.author.id}.bal`, bet);
			economy.add(`Prizepool`, bet);
			let SuccessEmbed = new Discord.MessageEmbed()
        .setTitle("**LOSS**")
        .setColor(0xff0000)
        .setThumbnail(msg.author.avatarURL())
        .setDescription("You lost: " +bet +" 💰 :(\nBot got: " +dealer); // prettier-ignore
			msg.channel.send(SuccessEmbed);
		} else if (drand === 1) {
			//if u get sis and dealer gets paper
			let dealer = 'paper';
			bet *= 4;
			bet = Math.floor(bet / 5);
			economy.add(`${msg.author.id}.bal`, bet);
			let SuccessEmbed = new Discord.MessageEmbed()
				.setTitle('**Win**')
				.setColor(0x32cd32)
				.setThumbnail(msg.author.avatarURL())
				.setDescription('You Win: ' + bet + ' 💰\nBot got: ' + dealer)
				.setFooter('You win %80 of your bet');
			msg.channel.send(SuccessEmbed);
		}
		return;
	}
};

module.exports.help = {
	name: 'rps',
};
