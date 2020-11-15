const { MessageEmbed } = require("discord.js");
const { play } = require("../../assets/functions/play.js");
const MAX_PLAYLIST_SIZE = process.env.MAX_PLAYLIST_SIZE;
const YouTubeAPI = require("simple-youtube-api");
const youtube = new YouTubeAPI(process.env.YOUTUBE_API_KEY);
const scdl = require("soundcloud-downloader");

module.exports.run = async (bot, msg, args) => {
	const { channel } = msg.member.voice;
	const serverQueue = msg.client.queue.get(msg.guild.id);

	if (!args.length)
		return msg
			.reply(`Usage: ${msg.client.prefix}playlist <YouTube Playlist URL | Playlist Name>`)
			.catch(console.error);
	if (!channel) return msg.reply("You need to join a voice channel first!").catch(console.error);

	const permissions = channel.permissionsFor(msg.client.user);
	if (!permissions.has("CONNECT")) return msg.reply("Give me perms to join the vc!");
	if (!permissions.has("SPEAK")) return msg.reply("Give me speaking perms!");

	if (serverQueue && channel !== msg.guild.me.voice.channel)
		return msg
			.reply(`You must be in the same channel as ${msg.client.user}`)
			.catch(console.error);

	const search = args.join(" ");
	const pattern = /^.*(youtu.be\/|list=)([^#\&\?]*).*/gi;
	const url = args[0];
	const urlValid = pattern.test(args[0]);

	const queueConstruct = {
		textChannel: msg.channel,
		channel,
		connection: null,
		songs: [],
		loop: false,
		volume: 100,
		playing: true,
	};

	let song = null;
	let playlist = null;
	let videos = [];

	if (urlValid) {
		try {
			playlist = await youtube.getPlaylist(url, { part: "snippet" });
			videos = await playlist.getVideos(MAX_PLAYLIST_SIZE || 10, { part: "snippet" });
		} catch (error) {
			console.error(error);
			return msg.reply("Playlist not found :(").catch(console.error);
		}
	} else if (scdl.isValidUrl(args[0])) {
		if (args[0].includes("/sets/")) {
			msg.channel.send("⌛ fetching the playlist...");
			playlist = await scdl.getSetInfo(args[0], process.env.SOUNDCLOUD_CLIENT_ID);
			videos = playlist.tracks.map((track) => ({
				title: track.title,
				url: track.permalink_url,
				duration: track.duration / 1000,
			}));
		}
	} else {
		try {
			const results = await youtube.searchPlaylists(search, 1, { part: "snippet" });
			playlist = results[0];
			videos = await playlist.getVideos(MAX_PLAYLIST_SIZE || 10, { part: "snippet" });
		} catch (error) {
			console.error(error);
			return msg.reply(`*Error: ${error}`).catch(console.error);
		}
	}

	const newSongs = videos.map((video) => {
		return (song = {
			title: video.title,
			url: video.url,
			duration: video.durationSeconds,
		});
	});

	serverQueue ? serverQueue.songs.push(...newSongs) : queueConstruct.songs.push(...newSongs);

	const songs = serverQueue ? serverQueue.songs : queueConstruct.songs;

	let playlistEmbed = new MessageEmbed()
		.setTitle(`${playlist.title}`)
		.setDescription(songs.map((song, index) => `${index + 1}. ${song.title}`))
		.setURL(playlist.url)
		.setColor("#F8AA2A")
		.setTimestamp();

	if (playlistEmbed.description.length >= 2048)
		playlistEmbed.description =
			playlistEmbed.description.substr(0, 2007) + "\nPlaylist larger than character limit...";

	msg.channel.send(`${msg.author} Started a playlist`, playlistEmbed);

	if (!serverQueue) {
		msg.client.queue.set(msg.guild.id, queueConstruct);

		try {
			queueConstruct.connection = await channel.join();
			await queueConstruct.connection.voice.setSelfDeaf(true);
			play(queueConstruct.songs[0], msg);
		} catch (error) {
			console.error(error);
			msg.client.queue.delete(msg.guild.id);
			await channel.leave();
			return msg.channel
				.send(`Could not join the channel: ${error.message}`)
				.catch(console.error);
		}
	}
};

module.exports.help = {
	name: "playlist",
};
