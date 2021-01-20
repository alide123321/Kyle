module.exports.run = async (bot, msg, args) => {
	const Discord = require('discord.js');
	const db = require('quick.db');
	const ms = require('parse-ms');
	let timeout = 604800000;
	let economy = new db.table('economy');
	let lcW = economy.get(`${msg.author.id}.lcW`);

	if (msg.author.id === '579052473600442370' || msg.author.id === '792865251922018314')
		return msg.channel.send('no nigga');

	if (!economy.has(msg.author.id)) {
		let SuccessEmbed = new Discord.MessageEmbed()
			.setTitle('**ERORR**')
			.setColor(0x0099ff)
			.setThumbnail(msg.author.avatarURL())
			.setDescription('You are not in the economy, try .newbal');
		return msg.channel.send(SuccessEmbed);
	}

	if (!economy.get(`${msg.author.id}.lcW`)) economy.set(`${msg.author.id}.lcW`, Date.now() + 5);

	if (timeout - (Date.now() - lcW) > 0) {
		let time = ms(timeout - (Date.now() - lcW));

		let WarningEmbed = new Discord.MessageEmbed()
      .setTitle("**weekly**")
      .setColor(0xff0000)
      .setThumbnail(msg.author.avatarURL())
      .setDescription(`You have claimed the rewared this week already already.\n**${time.days}D ${time.hours}H ${time.minutes}M ${time.seconds}S**!`); // prettier-ignore
		msg.channel.send(WarningEmbed);
	} else {
		economy.add(`${msg.author.id}.bal`, 80);
		economy.set(`${msg.author.id}.lcW`, new Date().getTime());
		let SuccessEmbed = new Discord.MessageEmbed()
      .setTitle("**SUCCESS**")
      .setColor(0x32cd32)
      .setThumbnail(msg.author.avatarURL())
      .setDescription("You have claimed your weekly reward of 80 💰!"); // prettier-ignore
		msg.channel.send(SuccessEmbed);
	}
};

module.exports.help = {
	name: 'weekly',
};
