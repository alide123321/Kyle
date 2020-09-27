const { play } = require("../../functions/play.js");
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const SOUNDCLOUD_CLIENT_ID = process.env.SOUNDCLOUD_CLIENT_ID;
const ytdl = require("ytdl-core");
const YouTubeAPI = require("simple-youtube-api");
const youtube = new YouTubeAPI(YOUTUBE_API_KEY);
const scdl = require("soundcloud-downloader");
module.exports.run = async (bot, msg, args) => {
  const { channel } = msg.member.voice;

  const serverQueue = msg.client.queue.get(msg.guild.id);
  if (!channel)
    return msg
      .reply("You need to join a voice channel first!")
      .catch(console.error);
  if (serverQueue && channel !== msg.guild.me.voice.channel)
    return msg
      .reply(`You must be in the same channel as ${msg.client.user}`)
      .catch(console.error);

  if (!args[1])
    return msg
      .reply(
        `Usage: ${msg.client.prefix}play <YouTube URL | Video Name | Soundcloud URL>`
      )
      .catch(console.error);

  const permissions = channel.permissionsFor(msg.client.user);
  if (!permissions.has("CONNECT"))
    return msg.reply("Cannot connect to voice channel, missing permissions.");
  if (!permissions.has("SPEAK"))
    return msg.reply(
      "I cannot speak in this voice channel, make sure I have the proper permissions!"
    );

  let text = msg.content;
  const search = text.slice(2);
  const videoPattern = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
  const playlistPattern = /^.*(list=)([^#\&\?]*).*/gi;
  const scRegex = /^https?:\/\/(soundcloud\.com)\/(.*)$/;
  const url = args[1];
  const urlValid = videoPattern.test(args[1]);

  // Start the playlist if playlist url was provided
  if (!videoPattern.test(args[1]) && playlistPattern.test(args[1])) {
    return msg.client.commands.get("playlist").execute(msg, args);
  } else if (scdl.isValidUrl(url) && url.includes("/sets/")) {
    return msg.client.commands.get("playlist").execute(msg, args);
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
      return msg.reply(error.msg).catch(console.error);
    }
  } else if (scRegex.test(url)) {
    try {
      const trackInfo = await scdl.getInfo(url, SOUNDCLOUD_CLIENT_ID);
      song = {
        title: trackInfo.title,
        url: trackInfo.permalink_url,
        duration: Math.ceil(trackInfo.duration / 1000),
      };
    } catch (error) {
      if (error.statusCode === 404)
        return msg
          .reply("Could not find that Soundcloud track.")
          .catch(console.error);
      return msg
        .reply("There was an error playing that Soundcloud track.")
        .catch(console.error);
    }
  } else {
    try {
      const results = await youtube.searchVideos(search, 1);
      songInfo = await ytdl.getInfo(results[0].url);
      song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
        duration: songInfo.videoDetails.lengthSeconds,
      };
    } catch (error) {
      console.error(error);
      return msg
        .reply("No video was found with a matching title.")
        .catch(console.error);
    }
  }

  if (serverQueue) {
    serverQueue.songs.push(song);
    return serverQueue.textChannel
      .send(`✅ **${song.title}** has been added to the queue by ${msg.author}`)
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
    return msg.channel
      .send(`Could not join the channel: ${error}`)
      .catch(console.error);
  }
};

module.exports.help = {
  name: "p",
};
