module.exports.run = async (bot, msg, args) => {
	const Discord = require('discord.js');
	const db = require('quick.db');
	var economy = new db.table('economy');
	let author = msg.author.id;
	let mentioned = msg.mentions.members.first();
	let useracc = economy.get(`${author}.bal`);
	let Money = args[1];

	if (economy.has(author) === false) {
		let SuccessEmbed = new Discord.MessageEmbed()
			.setTitle('**ERORR**')
			.setColor(0x0099ff)
			.setThumbnail(msg.author.avatarURL())
			.setDescription('You are not in the economy, try .newbal');
		msg.channel.send(SuccessEmbed);
		return;
	}

	if (!Money || isNaN(Money) || !mentioned) {
		let ErrorEmbed = new Discord.MessageEmbed()
			.setTitle('**ERROR**')
			.setColor(0xff0000)
			.setThumbnail(msg.author.avatarURL())
			.setDescription('Please specify an amount/user to give. (.pay <#> <@>)');
		msg.channel.send(ErrorEmbed);
		return;
	}

	if (useracc < Money) {
		let ErrorEmbed = new Discord.MessageEmbed()
			.setTitle('**ERROR**')
			.setColor(0xff0000)
			.setThumbnail(msg.author.avatarURL())
			.setDescription('You do not have enough money.');
		msg.channel.send(ErrorEmbed);
		return;
	}

	if (Money.indexOf('.') != -1 || Money.indexOf('-') != -1 || Money == 0) {
		let ErrorEmbed = new Discord.MessageEmbed()
			.setTitle('**ERROR**')
			.setColor(0xff0000)
			.setThumbnail(msg.author.avatarURL())
			.setDescription('Please specify an integer value greater than 0. (.pay <#> <@>)');
		msg.channel.send(ErrorEmbed);
		return;
	}

	let menacc = economy.get(mentioned.id);

	if (!menacc) {
		let ErrorEmbed = new Discord.MessageEmbed()
			.setTitle('**ERROR**')
			.setColor(0xff0000)
			.setThumbnail(msg.author.avatarURL())
			.setDescription("That person isn't in the system, tell them to use the .newbal command.");
		msg.channel.send(ErrorEmbed);
		return;
	}

	economy.subtract(`${author}.bal`, Money);
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
};
