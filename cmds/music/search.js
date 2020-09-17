module.exports.run = async (bot, msg, args) => {
    const { MessageEmbed } = require("discord.js");
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
    const YouTubeAPI = require("simple-youtube-api");
    const youtube = new YouTubeAPI(YOUTUBE_API_KEY);
    
    if (!args.length)
      return msg.reply(`Usage: ${msg.client.prefix}${module.exports.name} <Video Name>`).catch(console.error);
    if (msg.channel.activeCollector)
      return msg.reply("A msg collector is already active in this channel.");
    if (!msg.member.voice.channel)
      return msg.reply("You need to join a voice channel first!").catch(console.error);

    let text = msg.content;
    const search = text.slice(7);

    let resultsEmbed = new MessageEmbed()
      .setTitle(`**Reply with the song number you want to play**`)
      .setDescription(`Results for: ${search}`)
      .setColor("#F8AA2A");

    try {
      const results = await youtube.searchVideos(search, 10);
      results.map((video, index) => resultsEmbed.addField(video.shortURL, `${index + 1}. ${video.title}`));

      

      var resultsMessage = await msg.channel.send(resultsEmbed);

      function filter(msg) {
        const pattern = /(^[1-9][0-9]{0,1}$)/g;
        return pattern.test(msg.content) && parseInt(msg.content.match(pattern)[0]) <= 10;
      }

      msg.channel.activeCollector = true;
      const response = await msg.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ["time"] });
      const choice = resultsEmbed.fields[parseInt(response.first()) - 1].name;

      msg.channel.activeCollector = false;
      msg.client.commands.get("play").execute(msg, [choice]);
      resultsMessage.delete().catch(console.error);
    } catch (error) {
      console.error(error);
      msg.channel.activeCollector = false;
    }
}

module.exports.help = {
    name: "search"
}