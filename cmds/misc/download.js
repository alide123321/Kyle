module.exports.run = async (bot, msg, args) => {
  const Discord = require("discord.js");
  var unirest = require("unirest");
  const ytdl = require("ytdl-core");

  let songInfo = null;
  let vidid = null;
  var json3 = null;
  var json4 = null;

  const videoPattern = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
  const urlValid = videoPattern.test(args[1]);

  if (!args[1]) {
    msg.channel.send("I need a link .download <Youtube link>");
  }

  if (!urlValid) {
    msg.channel.send("not a link");
  } else if (urlValid) {
    try {
      songInfo = await ytdl.getInfo(args[1]);
      vidid = songInfo.videoDetails.videoId;
    } catch (error) {
      console.error(error);
      return msg.reply(error.msg).catch(console.error);
    }
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

    const filter = (reaction, user) => {
      return ["3️⃣", "4️⃣"].includes(reaction.emoji.name) && user.id === msg.author.id;
    };

    sentmsg.awaitReactions(filter, { max: 1, time: 10000, errors: ["time"] }).then((collected) => {
      const reaction = collected.first();

      if (reaction.emoji.name === "3️⃣") {
        var req3 = unirest(
          "GET",
          `https://free-mp3-mp4-youtube.p.rapidapi.com/${vidid}/MP3/spinner/2196f3/100/box-button/2196f3/tiny-button/Download/FFFFFF/yes/FFFFFF/none`
        );

        req3.headers({
          "x-rapidapi-host": "free-mp3-mp4-youtube.p.rapidapi.com",
          "x-rapidapi-key": process.env.RAPIDAPI,
          useQueryString: true,
        });

        req3.end(function (res) {
          if (res.error) throw new Error(res.error);

          if (res.status != 200) {
            message.reply("An error occurred while trying to make the API request!");
          } else {
            json3 = JSON.parse(JSON.stringify(res.body));
            msg.channel.send(`MP3:${json3.url}`);
          }
        });
      }

      if (reaction.emoji.name === "4️⃣") {
        var req4 = unirest(
          "GET",
          `https://free-mp3-mp4-youtube.p.rapidapi.com/${vidid}/MP4/spinner/2196f3/100/box-button/2196f3/tiny-button/Download/FFFFFF/yes/FFFFFF/none`
        );

        req4.headers({
          "x-rapidapi-host": "free-mp3-mp4-youtube.p.rapidapi.com",
          "x-rapidapi-key": process.env.RAPIDAPI,
          useQueryString: true,
        });

        req4.end(function (res) {
          if (res.error) throw new Error(res.error);

          if (res.status != 200) {
            message.reply("An error occurred while trying to make the API request!");
          } else {
            json4 = JSON.parse(JSON.stringify(res.body));
            msg.channel.send(`MP4:${json4.url}`);
          }
        });
      }
    });
  });
};

module.exports.help = {
  name: "download",
};
