module.exports.run = async (bot, msg, args) => {
    const Discord = require("discord.js");
    const Fs = require("fs");
    
    let UserJSON = JSON.parse(Fs.readFileSync("./DataBase/users.json"));
      let bet = args[1];

      let rand = Math.floor(Math.random() * 2 - 1) + 1;

      if (!UserJSON[msg.author.id]) {
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

      if (UserJSON[msg.author.id].bal < bet) {
        let ErrorEmbed = new Discord.MessageEmbed()
          .setTitle("**ERROR**")
          .setColor(0XFF0000)
          .setThumbnail(msg.author.avatarURL())
          .setDescription("You do not have enough money")
        msg.channel.send(ErrorEmbed);
      return;}

    if(rand === 0){
      UserJSON[msg.author.id].bal -= parseInt(bet);
      Fs.writeFileSync("./DataBase/users.json", JSON.stringify(UserJSON));
      let SuccessEmbed = new Discord.MessageEmbed()
        .setTitle("**LOSS**")
        .setColor(0XFF0000)
        .setThumbnail(msg.author.avatarURL())
        .setDescription("You lost: "+ bet +" :(")
      msg.channel.send(SuccessEmbed);
    }

    if(rand === 1){
      UserJSON[msg.author.id].bal += parseInt(bet);
      Fs.writeFileSync("./DataBase/users.json", JSON.stringify(UserJSON));
      let SuccessEmbed = new Discord.MessageEmbed()
        .setTitle("**WIN**")
        .setColor(0X32CD32)
        .setThumbnail(msg.author.avatarURL())
        .setDescription("You won: "+ bet +" :)")
      msg.channel.send(SuccessEmbed);
    }
}

module.exports.help = {
    name: "flip"
}