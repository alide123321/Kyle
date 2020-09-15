module.exports.run = async (bot, msg, args) => {
    const Discord = require("discord.js");
    const db = require('quick.db');
    var economy = new db.table('economy')
    let useracc = economy.get(`${author}.bal`)

      let bet = args[1];

      let rand = Math.floor(Math.random() * 2 - 1) + 1;

      if (!useracc) {
        let ErrorEmbed = new Discord.MessageEmbed()
          .setTitle("**ERROR**")
          .setColor(0XFF0000)
          .setThumbnail(msg.author.avatarURL())
          .setDescription("You are not in the system try .newbal")
        msg.channel.send(ErrorEmbed);
      return;}

      if(!args[1] || isNaN(bet)){
        let ErrorEmbed = new Discord.MessageEmbed()
          .setTitle("**ERROR**")
          .setColor(0XFF0000)
          .setThumbnail(msg.author.avatarURL())
          .setDescription("how much do you want to bet")
        msg.channel.send(ErrorEmbed);
      return;}

      if(bet < 0){
        let ErrorEmbed = new Discord.MessageEmbed()
          .setTitle("**ERROR**")
          .setColor(0XFF0000)
          .setThumbnail(msg.author.avatarURL())
          .setDescription("you have to bet more than or equal to 0")
        msg.channel.send(ErrorEmbed);
      return;}

      if (useracc < bet) {
        let ErrorEmbed = new Discord.MessageEmbed()
          .setTitle("**ERROR**")
          .setColor(0XFF0000)
          .setThumbnail(msg.author.avatarURL())
          .setDescription("You do not have enough money")
        msg.channel.send(ErrorEmbed);
      return;}

    if(rand === 0){
      economy.subtract(`${author}.bal`, bet)
      let SuccessEmbed = new Discord.MessageEmbed()
        .setTitle("**LOSS**")
        .setColor(0XFF0000)
        .setThumbnail(msg.author.avatarURL())
        .setDescription("You lost: "+ bet +" :( <:chip:751730576918315048>")
      msg.channel.send(SuccessEmbed);
    }

    if(rand === 1){
      economy.add(`${author}.bal`, bet)
      let SuccessEmbed = new Discord.MessageEmbed()
        .setTitle("**WIN**")
        .setColor(0X32CD32)
        .setThumbnail(msg.author.avatarURL())
        .setDescription("You won: "+ bet +" :) <:chip:751730576918315048>")
      msg.channel.send(SuccessEmbed);
    }
}

module.exports.help = {
    name: "flip"
}