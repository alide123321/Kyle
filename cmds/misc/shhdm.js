module.exports.run = async (bot, msg, args) => {
  const Discord = require("discord.js");
  let mention = msg.mentions.users.first();
  let text = msg.content;

  if (text.includes("@here") || text.includes("@everyone")) {
    msg.channel.send("NO!");
    return;
  }

  if (!args[1]) {
    msg.channel.send("Who would you like to anonymously DM?");
    return;
  }

  if (!args[1].includes("@")) {
    msg.channel.send("Who would you like to anonymously DM?");
    return;
  }

  const embed = new Discord.MessageEmbed()
    .setColor(0xb33076)
    .setTitle("Anonymous Message")
    .setDescription(text.slice(6));
  mention.send(embed).catch(() => msg.reply("Can't send DM to that user!"));

  msg.channel.bulkDelete(1);
};

module.exports.help = {
  name: "shhdm",
};
