const { play } = require('../../assets/functions/play.js');
const ytdl = require('ytdl-core');
const YouTubeAPI = require('simple-youtube-api');
const youtube = new YouTubeAPI(process.env.YOUTUBE_API_KEY);
const parseMilliseconds = require('parse-ms');

module.exports.run = async (bot, msg, args) => {
	args = msg.content.substring(process.env.PREFIX.length).split(/\s+/g);
	const { channel } = msg.member.voice;

	const serverQueue = msg.client.queue.get(msg.guild.id);
	if (!channel) return msg.reply('You need to join a voice channel first!').catch(console.error);
	if (serverQueue && channel !== msg.guild.me.voice.channel)
		return msg.reply(`You must be in the same channel as ${msg.client.user}`).catch(console.error);

	if (!args.length)
		return msg
			.reply(`Usage: ${msg.client.prefix}play <YouTube URL | Video Name | Soundcloud URL>`)
			.catch(console.error);

	const permissions = channel.permissionsFor(msg.client.user);
	if (!permissions.has('CONNECT')) return msg.reply('Give me perms to join the vc!');
	if (!permissions.has('SPEAK')) return msg.reply('Give me speaking perms!');

	if (args[0] === 'play') {
		var searchLength = 5;
	} else if (args[0] === 'p') {
		var searchLength = 2;
	}

	const search = msg.content.slice(searchLength);
	const videoPattern = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
	const playlistPattern = /^.*(list=)([^#\&\?]*).*/gi;
	const url = args[1];
	const urlValid = videoPattern.test(url);

	// Start the playlist if playlist url was provided
	if (!urlValid && playlistPattern.test(url)) {
		return msg.client.commands.get('playlist').execute(msg, args);
	}

	const queueConstruct = {
		textChannel: msg.channel,
		channel,
		connection: null,
		songs: [],
		loop: false,
		volume: 100,
		playing: true,
	};

	let songInfo = null;
	let song = null;

	if (urlValid) {
		try {
			songInfo = await ytdl.getInfo(url);
			song = {
				title: songInfo.videoDetails.title,
				url: songInfo.videoDetails.video_url,
				duration: songInfo.videoDetails.lengthSeconds,
			};
		} catch (error) {
			console.error(error);
			return msg.reply(error.message).catch(console.error);
		}
	} else {
		try {
			const results = await youtube.searchVideos(search, 2);
			songInfo = await ytdl.getInfo(results[0].url);
			song = {
				title: songInfo.videoDetails.title,
				url: songInfo.videoDetails.video_url,
				duration: songInfo.videoDetails.lengthSeconds,
			};
		} catch (error) {
			console.error(error);
			return msg.reply('No video was found with a matching title').catch(console.error);
		}
	}

	if (serverQueue) {
		serverQueue.songs.push(song);
		let time = parseMilliseconds(song.duration * 1000);
		let min = time.minutes;
		let sec = time.seconds;
		if (min < 10) min = `0${min}`;
		if (sec < 10) sec = `0${sec}`;

		return serverQueue.textChannel
			.send(
				`✅ **${song.title}** has been added to the queue by ${msg.author} song duration: [${min}:${sec}]`
			)
			.catch(console.error);
	}

	queueConstruct.songs.push(song);
	msg.client.queue.set(msg.guild.id, queueConstruct);

	try {
		queueConstruct.connection = await channel.join();
		await queueConstruct.connection.voice.setSelfDeaf(true);
		play(queueConstruct.songs[0], msg);
	} catch (error) {
		console.error(error);
		msg.client.queue.delete(msg.guild.id);
		await channel.leave();
		return msg.channel.send(`Could not join the channel: ${error}`).catch(console.error);
	}
};

module.exports.help = {
	name: 'play',
	Alias: 'p',
};
