module.exports.run = async (bot, msg, args) => {
	const Discord = require('discord.js');
	const db = require('quick.db');
	const ms = require('parse-ms');
	let timeout = 86400000;
	let economy = new db.table('economy');
	let lc = economy.get(`${msg.author.id}.lc`);

	if (!economy.has(msg.author.id)) {
		let SuccessEmbed = new Discord.MessageEmbed()
			.setTitle('**ERORR**')
			.setColor(0x0099ff)
			.setThumbnail(msg.author.avatarURL())
			.setDescription('You are not in the economy, try .newbal');
		msg.channel.send(SuccessEmbed);
		return;
	}

	if (timeout - (Date.now() - lc) > 0) {
		let time = ms(timeout - (Date.now() - lc));

		let WarningEmbed = new Discord.MessageEmbed()
      .setTitle("**Daily**")
      .setColor(0xff0000)
      .setThumbnail(msg.author.avatarURL())
      .setDescription(`You have claimed this today already.\n**${time.hours}h ${time.minutes}m ${time.seconds}s**!`); // prettier-ignore
		msg.channel.send(WarningEmbed);
	} else {
		economy.add(`${msg.author.id}.bal`, 50);
		economy.set(`${msg.author.id}.lc`, new Date().getTime());
		let SuccessEmbed = new Discord.MessageEmbed()
      .setTitle("**SUCCESS**")
      .setColor(0x32cd32)
      .setThumbnail(msg.author.avatarURL())
      .setDescription("You have claimed your daily reward of 50 💰!"); // prettier-ignore
		msg.channel.send(SuccessEmbed);
	}
};

module.exports.help = {
	name: 'daily',
};
