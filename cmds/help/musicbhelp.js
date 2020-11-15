module.exports.run = async (bot, msg, args) => {
	const Discord = require("discord.js");
	const Fs = require("fs");
	const prefix = process.env.PREFIX;

	let musichelp = new Discord.MessageEmbed()
		.setColor("#0099ff")
		.setTitle("**Music commands**")
		.setURL("https://sites.google.com/view/kyle-bot/home")
		.setThumbnail(
			"https://cdn.discordapp.com/attachments/739019780576641096/739022260857470981/Discord_Rose.png"
		)
		.addFields(
			{ name: "Check out the commands on our website", value: helplink },
			{ name: "**Music commands**" }
		);

	Fs.readdir("./cmds/music/", (err, files) => {
		if (err) console.error(err);

		let jsfiles = files.filter((f) => f.split(".").pop() === "js");

		jsfiles.forEach((f, i) => {
			f = f.slice(0, f.length - 3);
			musichelp.addFields({ name: `**${prefix}${f}**`, inline: true });
		});

		msg.channel.send(musichelp);
	});
};

module.exports.help = {
	name: "musichelp",
};
