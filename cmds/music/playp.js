module.exports.run = async (bot, msg, args) => {
    const scdl = require("soundcloud-downloader")
    const YouTubeAPI = require("simple-youtube-api");
    const youtube = new YouTubeAPI(YOUTUBE_API_KEY);
    const { MessageEmbed } = require("discord.js");
    const { play } = require("../../functions/play.js");
    
    const { PRUNING } = require("../config.json");
    const { channel } = msg.member.voice;

    const serverQueue = msg.client.queue.get(msg.guild.id);
    if (serverQueue && channel !== msg.guild.me.voice.channel)
      return msg.reply(`You must be in the same channel as ${msg.client.user}`).catch(console.error);

    if (!args.length)
      return msg
        .reply(`Usage: ${msg.client.prefix}playlist <YouTube Playlist URL | Playlist Name>`)
        .catch(console.error);
    if (!channel) return msg.reply("You need to join a voice channel first!").catch(console.error);

    const permissions = channel.permissionsFor(msg.client.user);
    if (!permissions.has("CONNECT"))
      return msg.reply("Cannot connect to voice channel, missing permissions");
    if (!permissions.has("SPEAK"))
      return msg.reply("I cannot speak in this voice channel, make sure I have the proper permissions!");

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
      playing: true
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
      if (args[0].includes('/sets/')) {
        msg.channel.send('⌛ fetching the playlist...')
        playlist = await scdl.getSetInfo(args[0], SOUNDCLOUD_CLIENT_ID)
        videos = playlist.tracks.map(track => ({
          title: track.title,
          url: track.permalink_url,
          duration: track.duration / 1000
        }))
      }
    } else {
      try {
        const results = await youtube.searchPlaylists(search, 1, { part: "snippet" });
        playlist = results[0];
        videos = await playlist.getVideos(MAX_PLAYLIST_SIZE || 10, { part: "snippet" });
      } catch (error) {
        console.error(error);
        return msg.reply("Playlist not found :(").catch(console.error);
      }
    }

    videos.forEach((video) => {
      song = {
        title: video.title,
        url: video.url,
        duration: video.durationSeconds
      };

      if (serverQueue) {
        serverQueue.songs.push(song);
        if (!PRUNING)
          msg.channel
            .send(`✅ **${song.title}** has been added to the queue by ${msg.author}`)
            .catch(console.error);
      } else {
        queueConstruct.songs.push(song);
      }
    });

    let playlistEmbed = new MessageEmbed()
      .setTitle(`${playlist.title}`)
      .setURL(playlist.url)
      .setColor("#F8AA2A")
      .setTimestamp();

    if (!PRUNING) {
      playlistEmbed.setDescription(queueConstruct.songs.map((song, index) => `${index + 1}. ${song.title}`));
      if (playlistEmbed.description.length >= 2048)
        playlistEmbed.description =
          playlistEmbed.description.substr(0, 2007) + "\nPlaylist larger than character limit...";
    }

    msg.channel.send(`${msg.author} Started a playlist`, playlistEmbed);

    if (!serverQueue) msg.client.queue.set(msg.guild.id, queueConstruct);

    if (!serverQueue) {
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
    }
}

module.exports.help = {
    name: "playp"
}