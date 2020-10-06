module.exports.run = async (bot, msg, args) => {
  const Discord = require("discord.js");

  const helplink = "https://sites.google.com/view/kyle-bot/home";
  const version = process.env.VERSION;
  const prefix = process.env.PREFIX;
  const author = process.env.ALIDE;

  let info = new Discord.MessageEmbed()
    .setColor("#0099ff")
    .setTitle("**Help commands**")
    .setURL(helplink)
    .setThumbnail(
      "https://cdn.discordapp.com/attachments/739019780576641096/739022260857470981/Discord_Rose.png"
    )
    .addFields(
      { name: "Version: ", value: version, inline: true },
      { name: "Prefix: ", value: prefix, inline: true },
      { name: "Author: ", value: author }
    );
  msg.channel.send(info);
};

module.exports.help = {
  name: "info",
};
