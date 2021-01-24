module.exports.run = async (bot, msg, args) => {
	const Discord = require('discord.js');
	const db = require('quick.db');
	var economy = new db.table('economy');
	let mentioned = msg.mentions.members.first();
	let Money = args[1];

	if (!economy.has(`${msg.author.id}.bal`)) {
		let SuccessEmbed = new Discord.MessageEmbed()
			.setTitle('**ERORR**')
			.setColor(0x0099ff)
			.setThumbnail(msg.author.avatarURL())
			.setDescription('You are not in the economy, try .newbal');
		return msg.channel.send(SuccessEmbed);
	}

	if (!Money || isNaN(Money) || !mentioned) {
		let ErrorEmbed = new Discord.MessageEmbed()
			.setTitle('**ERROR**')
			.setColor(0xff0000)
			.setThumbnail(msg.author.avatarURL())
			.setDescription('Please specify an amount/user to give. (.pay <#> <@>)');
		return msg.channel.send(ErrorEmbed);
	}

	if (!economy.has(`${mentioned.id}.bal`)) {
		let ErrorEmbed = new Discord.MessageEmbed()
			.setTitle('**ERROR**')
			.setColor(0xff0000)
			.setThumbnail(msg.author.avatarURL())
			.setDescription("That person isn't in the system, tell them to use the .newbal command.");
		return msg.channel.send(ErrorEmbed);
	}

	Money = Math.abs(Math.floor(Money));

	if (economy.get(`${msg.author.id}.bal`) < Money) {
		let ErrorEmbed = new Discord.MessageEmbed()
			.setTitle('**ERROR**')
			.setColor(0xff0000)
			.setThumbnail(msg.author.avatarURL())
			.setDescription('You do not have enough money.');
		return msg.channel.send(ErrorEmbed);
	}

	if (Money <= 0) {
		let ErrorEmbed = new Discord.MessageEmbed()
			.setTitle('**ERROR**')
			.setColor(0xff0000)
			.setThumbnail(msg.author.avatarURL())
			.setDescription('Please specify an integer value greater than 0. (.pay <#> <@>)');
		return msg.channel.send(ErrorEmbed);
	}

	if (msg.author.id === mentioned.id) return msg.channel.send('Sorry, you cant pay your self');

	economy.subtract(`${msg.author.id}.bal`, Money);
	economy.add(`${mentioned.id}.bal`, Money);

	let SuccessEmbed = new Discord.MessageEmbed()
    .setTitle("**SUCCESS**")
    .setColor(0x32cd32)
    .setThumbnail(mentioned.user.avatarURL())
    .setDescription("You have given $" + Money +"💰 to " +mentioned.user.username); // prettier-ignore
	msg.channel.send(SuccessEmbed);
};

module.exports.help = {
	name: 'pay',
	description: 'Give someone money',
};
