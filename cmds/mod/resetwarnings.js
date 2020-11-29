const { userInfo } = require("os");

module.exports.run = async (bot, msg, args) => {
	const Discord = require("discord.js");
	const db = require("quick.db");
	var warn = new db.table("warn");
	let mentioned = msg.mentions.members.first();
	let text = msg.content;

	if (!msg.member.hasPermission("ADMINISTRATOR")) {
		msg.channel.send("You must have admin perms to use this command!");
		return;
	}

	if (!mentioned) {
		msg.channel.send(`Who do you want to warn? (.warn <@>)`);
		return;
	}

	if (mentioned.user.bot) {
		msg.channel.send("You can't unwarn bots");
		return;
	}

	if (msg.author.id === mentioned.id) {
		msg.channel.send("You can not warn yourself.");
		return;
	}

	var warnings = warn.get(`warnings_${msg.guild.id}_${mentioned.id}`);

	if (warnings !== null) {
		warn.delete(`warnings_${msg.guild.id}_${mentioned.id}`);
	}
};

module.exports.help = {
	name: "resetwarnings",
};
