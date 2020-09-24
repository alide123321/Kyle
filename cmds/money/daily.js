module.exports.run = async (bot, msg, args) => {
  const Discord = require("discord.js");
  const db = require('quick.db');
  const ms = require('parse-ms');
  let timeout = 86400000;
  var economy = new db.table('economy')
  let author = msg.author.id
  let lc = economy.get(`${author}.lc`)

  if(economy.has(author) === false){
    let SuccessEmbed = new Discord.MessageEmbed()
      .setTitle("**ERORR**")
      .setColor(0X0099ff)
      .setThumbnail(msg.author.avatarURL())
      .setDescription("You are not in the economy, try .newbal")
    msg.channel.send(SuccessEmbed);
  return;}


  if (timeout - (Date.now() - lc) > 0) {
    let time = ms(timeout - (Date.now() - lc));

    let WarningEmbed = new Discord.MessageEmbed()
      .setTitle("**Daily**")
      .setColor(0XFF0000)
      .setThumbnail(msg.author.avatarURL())
      .setDescription(`You have claimed this today already.\n**${time.hours}h ${time.minutes}m ${time.seconds}s**!`)
    msg.channel.send(WarningEmbed);
  } else{
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