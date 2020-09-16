module.exports.run = async (bot, msg, args) => {
  const Discord = require("discord.js");
  const db = require('quick.db');
  var economy = new db.table('economy')
  let author = msg.author.id
  let useracc = economy.get(`${author}.bal`)
  let time = economy.get(`${author}.lc`)

  if(!useracc){

    economy.set(`${author}.bal`, 100)
    economy.add(`${author}.lc`, 0)

    let SuccessEmbed = new Discord.MessageEmbed()
      .setTitle("**WELCOME**")
      .setColor(0X32CD32)
      .setThumbnail(msg.author.avatarURL())
      .setDescription("You have joined the economy!")
    msg.channel.send(SuccessEmbed);
  }

  if (Math.floor(new Date().getTime() - time) / (1000 * 60 * 60 * 24) < 1) {
    let WarningEmbed = new Discord.MessageEmbed()
      .setTitle("**Daily**")
      .setColor(0XFF0000)
      .setThumbnail(msg.author.avatarURL())
      .setDescription("You have claimed today already")
    msg.channel.send(WarningEmbed);
  return;}

  if (Math.floor(new Date().getTime() - time) / (1000 * 60 * 60 * 24) > 1) {
    economy.add(`${author}.bal`, 50)
    economy.add(`${author}.lc`, new Date().getTime())
    let SuccessEmbed = new Discord.MessageEmbed()
      .setTitle("**SUCCESS**")
      .setColor(0X32CD32)
      .setThumbnail(msg.author.avatarURL())
      .setDescription("You have claimed your daily reward of 50 <:chip:751730576918315048>!")
    msg.channel.send(SuccessEmbed);
  }
}

module.exports.help = {
    name: "daily"
}