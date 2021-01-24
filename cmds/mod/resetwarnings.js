const { userInfo } = require('os');

module.exports.run = async (bot, msg, args) => {
	const Discord = require('discord.js');
	const db = require('quick.db');
	var warn = new db.table('warn');
	let mentioned = msg.mentions.members.first();
	let text = msg.content;

	if (!msg.member.hasPermission('ADMINISTRATOR'))
		return msg.channel.send('You must have admin perms to use this command!');

	if (!mentioned) return msg.channel.send(`Who do you want to warn? (.warn <@>)`);

	if (mentioned.user.bot) return msg.channel.send("You can't unwarn bots");

	if (msg.author.id === mentioned.id) return msg.channel.send("You can't unwarn yourself.");

	if (warn.get(`warnings_${msg.guild.id}_${mentioned.id}`)) {
		warn.delete(`warnings_${msg.guild.id}_${mentioned.id}`);
	}

	msg.channel.send('Done');
};

module.exports.help = {
	name: 'resetwarnings',
	description: 'Reset someones warnings',
};
