const { userInfo } = require("os");

module.exports.run = async (bot, msg, args) => {
	const Discord = require("discord.js");
	const db = require("quick.db");
	var warn = new db.table("warn");
	let mentioned = msg.mentions.members.first();
	let text = msg.content;
	let reason = text.slice(28);

	if (
		!msg.member.hasPermission("ADMINISTRATOR") &&
		msg.member.roles.find((r) => r.name !== "Moderators")
	) {
		msg.channel.send("You must have admin perms to use this command!");
		return;
	}

	if (!mentioned) {
		msg.channel.send(`Who do you want to warn? (.warn <@> <reason>)`);
		return;
	}

	if (mentioned.user.bot) {
		msg.channel.send("You can not warn bots");
		return;
	}

	if (msg.author.id === mentioned.id) {
		msg.channel.send("You can not warn yourself.");
		return;
	}

	if (!reason) {
		msg.channel.send(`Who do you want to warn? (.warn <@> <reason>)`);
		return;
	}

	var warnings = warn.get(`warnings_${msg.guild.id}_${mentioned.id}`);

	let warningEmbed = new Discord.MessageEmbed()
		.setTitle("**warn**")
		.setColor(0x32cd32)
		.setThumbnail(msg.author.avatarURL())
		.setDescription(`You warned **${mentioned}** for ${reason} by: <@${msg.author.id}>`);

	if (warnings === null) {
		warn.set(`warnings_${msg.guild.id}_${mentioned.id}`,`${reason} by <@${msg.author.id}>`); // prettier-ignore
		mentioned
			.send(`You have been warned in **${msg.guild.name}** for ${reason}`)
			.catch(() => msg.reply("Can't send DM to that user!"));
		await msg.channel.send(warningEmbed);
	} else if (warnings != null) {
		await warn.delete(`warnings_${msg.guild.id}_${mentioned.id}`);
		warnings = warnings.concat(`\n${reason} by <@${msg.author.id}>\n`);
		warn.set(`warnings_${msg.guild.id}_${mentioned.id}`, warnings);
		mentioned
			.send(`You have been warned in **${msg.guild.name}** for ${reason}`)
			.catch(() => msg.reply("Can't send DM to that user!"));
		await msg.channel.send(warningEmbed);
	}
};

module.exports.help = {
	name: "warn",
};
