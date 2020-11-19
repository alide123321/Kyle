module.exports.run = async (bot, msg, args) => {
	const Discord = require("discord.js");
	let mention = msg.mentions.users.first();
	let text = msg.content;

	if (text.includes("@here") || text.includes("@everyone")) {
		msg.channel.send("NO!").then((smsg) => {
			msg.delete();
			smsg.delete({ timeout: 5000 });
		});
		return;
	}

	if (!args[1]) {
		msg.channel.send("Who would you like to anonymously DM?").then((smsg) => {
			msg.delete();
			smsg.delete({ timeout: 5000 });
		});
		return;
	}

	if (!mention) {
		msg.channel.send("Who would you like to anonymously DM?").then((smsg) => {
			msg.delete();
			smsg.delete({ timeout: 5000 });
		});
		return;
	}

	msg.delete();

	const embed = new Discord.MessageEmbed()
		.setColor(0xb33076)
		.setTitle("Anonymous Message")
		.setDescription(text.slice(6));

	mention.send(embed).catch(() =>
		msg.reply("Can't send DM to that user!").then((smsg) => {
			smsg.delete({ timeout: 5000 });
		})
	);
};

module.exports.help = {
	name: "shhdm",
};
