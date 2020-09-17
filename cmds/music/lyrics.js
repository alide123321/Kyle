module.exports.run = async (bot, msg, args) => {
    const { MessageEmbed } = require("discord.js");
    const lyricsFinder = require("lyrics-finder");

    const queue = msg.client.queue.get(msg.guild.id);
    if (!queue) return msg.channel.send("There is nothing playing.").catch(console.error);

    let lyrics = null;

    try {
      lyrics = await lyricsFinder(queue.songs[0].title, "");
      if (!lyrics) lyrics = `No lyrics found for ${queue.songs[0].title}.`;
    } catch (error) {
      lyrics = `No lyrics found for ${queue.songs[0].title}.`;
    }

    let lyricsEmbed = new MessageEmbed()
      .setTitle("Lyrics")
      .setDescription(lyrics)
      .setColor("#F8AA2A")
      .setTimestamp();

    if (lyricsEmbed.description.length >= 2048)
      lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
    return msg.channel.send(lyricsEmbed).catch(console.error);
}

module.exports.help = {
    name: "lyrics"
}