module.exports.run = async (bot, msg, args) => {
	const { MessageEmbed } = require("discord.js");
	const YouTubeAPI = require("simple-youtube-api");
	const youtube = new YouTubeAPI(process.env.YOUTUBE_API_KEY);

	if (!args.length)
		return msg
			.reply(`Usage: ${process.env.PREFIX}${module.exports.name} <Video Name>`)
			.catch(console.error);
	if (msg.channel.activeCollector)
		return msg.reply("A message collector is already active in this channel.");
	if (!msg.member.voice.channel)
		return msg.reply("You need to join a voice channel first!").catch(console.error);

	const search = args.join(" ");

	let resultsEmbed = new MessageEmbed()
		.setTitle(`**Reply with the song number you want to play**`)
		.setDescription(`Results for: ${search}`)
		.setColor("#F8AA2A");

	try {
		const results = await youtube.searchVideos(search, 10);
		results.map((video, index) =>
			resultsEmbed.addField(video.shortURL, `${index + 1}. ${video.title}`)
		);

		var resultsMessage = await msg.channel.send(resultsEmbed);

		function filter(msg) {
			const pattern = /^[0-9]{1,2}(\s*,\s*[0-9]{1,2})*$/g;
			return pattern.test(msg.content);
		}

		msg.channel.activeCollector = true;
		const response = await msg.channel.awaitMessages(filter, {
			max: 1,
			time: 30000,
			errors: ["time"],
		});
		const reply = response.first().content;

		if (reply.includes(",")) {
			let songs = reply.split(",").map((str) => str.trim());

			for (let song of songs) {
				await msg.client.commands
					.get("play")
					.execute(msg, [resultsEmbed.fields[parseInt(song) - 1].name]);
			}
		} else {
			const choice = resultsEmbed.fields[parseInt(response.first()) - 1].name;
			msg.client.commands.get("play").execute(msg, [choice]);
		}

		msg.channel.activeCollector = false;
		resultsMessage.delete().catch(console.error);
		response.first().delete().catch(console.error);
	} catch (error) {
		console.error(error);
		msg.channel.activeCollector = false;
		msg.reply(error.message).catch(console.error);
	}
};

module.exports.help = {
	name: "search",
};
