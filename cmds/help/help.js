module.exports.run = async (bot, msg, args) => {
  const Discord = require("discord.js");
  const prefix = process.env.PREFIX;

  const helplink = "https://sites.google.com/view/kyle-bot/home";

  let helpem = new Discord.MessageEmbed()
    .setColor("#0099ff")
    .setTitle("All the commands")
    .setURL(helplink)
    .setThumbnail(
      "https://cdn.discordapp.com/attachments/739019780576641096/739022260857470981/Discord_Rose.png"
    )
    .addFields(
      { name: "Check out the commands on our website", value: helplink },
      { name: "**Meme commands**", value: prefix + "memehelp", inline: true },
      { name: "**VC commands**", value: prefix + "vchelp", inline: true },
      {
        name: "**Moderator commands**",
        value: prefix + "modhelp",
        inline: true,
      },
      { name: "**Music commands**", value: prefix + "musichelp", inline: true },
      {
        name: "**Balance commands**",
        value: prefix + "moneyhelp",
        inline: true,
      },
      {
        name: "**Gambling commands**",
        value: prefix + "gambhelp",
        inline: true,
      },
      {
        name: "**Mischelp commands**",
        value: prefix + "Mischelp",
        inline: true,
      }
    )
    .setImage(
      "https://cdn.discordapp.com/attachments/739019780576641096/739022260857470981/Discord_Rose.png"
    );
  msg.channel.send(helpem);
};

module.exports.help = {
  name: "help",
};
