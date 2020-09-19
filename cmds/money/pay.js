module.exports.run = async (bot, msg, args) => {
  const Discord = require("discord.js");
  const db = require('quick.db');
  var economy = new db.table('economy')
  let author = msg.author.id
  let mentioned = msg.mentions.members.first();
  let useracc = economy.get(`${author}.bal`)
  let Money = args[1];

  if(economy.has(author) === false){
  
      let SuccessEmbed = new Discord.MessageEmbed()
        .setTitle("**ERORR**")
        .setColor(0X0099ff)
        .setThumbnail(msg.author.avatarURL())
        .setDescription("You are not in the economy try .newbal")
      msg.channel.send(SuccessEmbed);
    return;}

  if (!Money) {
    let ErrorEmbed = new Discord.MessageEmbed()
    .setTitle("**ERROR**")
      .setColor(0XFF0000)
      .setThumbnail(msg.author.avatarURL())
      .setDescription("Please specify an amount to give .pay <#> <@>")
    msg.channel.send(ErrorEmbed);
  return;}

  if (isNaN(Money)) {
    let ErrorEmbed = new Discord.MessageEmbed()
      .setTitle("**ERROR**")
      .setColor(0XFF0000)
      .setThumbnail(msg.author.avatarURL())
      .setDescription("Please specify a number .pay <#> <@>")
    msg.channel.send(ErrorEmbed);
  return;}

  if (useracc < Money) {
    let ErrorEmbed = new Discord.MessageEmbed()
      .setTitle("**ERROR**")
      .setColor(0XFF0000)
      .setThumbnail(msg.author.avatarURL())
      .setDescription("You do not have enough money")
    msg.channel.send(ErrorEmbed);
  return;}

  if (Money.indexOf(".") != -1 || Money.indexOf("-") != -1 || Money == 0) {
    let ErrorEmbed = new Discord.MessageEmbed()
      .setTitle("**ERROR**")
      .setColor(0XFF0000)
      .setThumbnail(msg.author.avatarURL())
      .setDescription("Please specify an integer value greater than 0 .pay <#> <@>")
    msg.channel.send(ErrorEmbed);
  return;}

  if (!mentioned) {
    let ErrorEmbed = new Discord.MessageEmbed()
      .setTitle("**ERROR**")
      .setColor(0XFF0000)
      .setThumbnail(msg.author.avatarURL())
      .setDescription("Please mention a user .pay <#> <@>")
    msg.channel.send(ErrorEmbed);
  return;}
  let menacc = economy.get(mentioned.id)

  if (!menacc) {
    let ErrorEmbed = new Discord.MessageEmbed()
      .setTitle("**ERROR**")
      .setColor(0XFF0000)
      .setThumbnail(msg.author.avatarURL())
      .setDescription("That pearson isnt in the system tell them to use the .bal command.")
    msg.channel.send(ErrorEmbed);
  return;}

  economy.subtract(`${author}.bal`, Money)
  economy.add(`${mentioned.id}.bal`, Money)

  let SuccessEmbed = new Discord.MessageEmbed()
    .setTitle("**SUCCESS**")
    .setColor(0X32CD32)
    .setThumbnail(mentioned.user.avatarURL())
    .setDescription("You have given $" + Money + "<:chip:751730576918315048> to " + mentioned.user.username)
  msg.channel.send(SuccessEmbed);

}

module.exports.help = {
    name: "pay"
}