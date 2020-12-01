module.exports.run = async (bot, msg, args) => {
	const Discord = require("discord.js");
	const ytdl = require("ytdl-core");

	let vidid = null;
	let url = msg.content.substring(process.env.PREFIX.length).split(/\s+/g);

	if (!url[1]) return msg.channel.send("I need a link .download <Youtube link>");

	if (ytdl.validateURL(url[1])) {
		try {
			vidid = ytdl.getVideoID(url[1]);
			if (vidid === null) return msg.channel.send("not a youtube valid link");
			msg.channel.send(vidid);
		} catch (error) {
			console.error(error);
			return msg.reply("Haram");
		}
	} else {
		return msg.channel.send("not a youtube valid link");
	}

	let embed = new Discord.MessageEmbed()
		.setColor("#0099ff")
		.setTitle("**React to one**")
		.setURL("https://discord.gg/hpcxUFy")
		.addFields(
			{
				name: "**MP3**",
				value: "mp3 link 3️⃣",
				inline: true,
			},
			{
				name: "**MP4**",
				value: "mp4 link 4️⃣",
				inline: true,
			}
		)
		.setThumbnail(
			"https://cdn.discordapp.com/attachments/739019780576641096/739022260857470981/Discord_Rose.png"
		);

	msg.channel.send(embed).then((sentmsg) => {
		sentmsg.react("3️⃣");
		sentmsg.react("4️⃣");

		let linkEmbed = new Discord.MessageEmbed()
			.setColor("#0099ff")
			.setURL("https://discord.gg/hpcxUFy")
			.setThumbnail(
				"https://cdn.discordapp.com/attachments/739019780576641096/739022260857470981/Discord_Rose.png"
			);

		const filter = (reaction, user) => {
			return ["3️⃣", "4️⃣"].includes(reaction.emoji.name) && user.id === msg.author.id;
		};

		sentmsg
			.awaitReactions(filter, { max: 1, time: 10000, errors: ["time"] })
			.then((collected) => {
				const reaction = collected.first();

				if (reaction.emoji.name === "3️⃣") {
					linkEmbed.setTitle("MP33️⃣");
					linkEmbed.setURL(`https://www.yt-download.org/api/widget/mp3/${vidid}`);
					linkEmbed.setDescription(`MP3: https://www.yt-download.org/api/widget/mp3/${vidid}`);
				} else if (reaction.emoji.name === "4️⃣") {
					linkEmbed.setTitle("MP44️⃣");
					linkEmbed.setURL(`https://www.yt-download.org/api/widget/videos/${vidid}`);
					linkEmbed.setDescription(
						`MP4: https://www.yt-download.org/api/widget/videos/${vidid}`
					);
				}

				msg.channel.send(linkEmbed);
			})
			.catch((error) => {
				msg.reply("Time out");
			});
	});
};

module.exports.help = {
	name: "download",
};
