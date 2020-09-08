module.exports.run = async (bot, msg, args) => {
    const Discord = require("discord.js");
    const Fs = require("fs");
    
    let UserJSON = JSON.parse(Fs.readFileSync("./DataBase/users.json"));
      let bet = args[2];
      let drand = Math.floor(Math.random() * 3 - 1) + 1;

      if (!UserJSON[msg.author.id]) {
        let ErrorEmbed = new Discord.MessageEmbed()
          .setTitle("**ERROR**")
          .setColor(0XFF0000)
          .setThumbnail(msg.author.avatarURL())
          .setDescription("You are not in the system try .newbal")
        msg.channel.send(ErrorEmbed);
      return;}

      if(!args[2] || isNaN(bet)){
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

      if(!args[1]){
        let ErrorEmbed = new Discord.MessageEmbed()
          .setTitle("**ERROR**")
          .setColor(0XFF0000)
          .setThumbnail(msg.author.avatarURL())
          .setDescription("What do you want \n0-Rock\n1-Paper\n2-scissors")
        msg.channel.send(ErrorEmbed);
      return;}

      let player = args[1];
      if(player != 0 && player != 1 && player != 2){
        let ErrorEmbed = new Discord.MessageEmbed()
          .setTitle("**ERROR**")
          .setColor(0XFF0000)
          .setThumbnail(msg.author.avatarURL())
          .setDescription("What do you want \n0-Rock\n1-Paper\n2-scissors")
        msg.channel.send(ErrorEmbed);
      return;}


      // 0 = rock 
      // 1 = paper 
      // 2 = sis

    if(player == 0){
      if(drand === 0){ //if u get rock and dealer gets rock
        let SuccessEmbed = new Discord.MessageEmbed()
          .setTitle("**ew**")
          .setColor(0XFFA500)
          .setThumbnail(msg.author.avatarURL())
          .setDescription("You both got rock")
        msg.channel.send(SuccessEmbed);
      }
      if(drand === 1){ //if u get rock and dealer gets paper
        var dealer = "paper";
        UserJSON[msg.author.id].bal -= parseInt(bet);
        Fs.writeFileSync("./DataBase/users.json", JSON.stringify(UserJSON));
        let SuccessEmbed = new Discord.MessageEmbed()
          .setTitle("**LOSS**")
          .setColor(0XFF0000)
          .setThumbnail(msg.author.avatarURL())
          .setDescription("You lost: "+ bet +" :(\nBot got: "+ dealer)
        msg.channel.send(SuccessEmbed);
      }
      if(drand === 2){ //if u get rock and dealer gets sis
        var dealer = "scissors";
        UserJSON[msg.author.id].bal += parseInt(bet);
        Fs.writeFileSync("./DataBase/users.json", JSON.stringify(UserJSON));
        let SuccessEmbed = new Discord.MessageEmbed()
          .setTitle("**Win**")
          .setColor(0X32CD32)
          .setThumbnail(msg.author.avatarURL())
          .setDescription("You Win: "+ bet + "\nBot got: " + dealer)
        msg.channel.send(SuccessEmbed);
      }
    return;}

    if(player == 1){
      if(drand === 1){ //if u get paper and dealer gets paper
        let SuccessEmbed = new Discord.MessageEmbed()
          .setTitle("**ew**")
          .setColor(0XFFA500)
          .setThumbnail(msg.author.avatarURL())
          .setDescription("You both got paper")
        msg.channel.send(SuccessEmbed);
      }
      if(drand === 2){ //if u get paper and dealer gets sis
        var dealer = "scissors";
        UserJSON[msg.author.id].bal -= parseInt(bet);
        Fs.writeFileSync("./DataBase/users.json", JSON.stringify(UserJSON));
        let SuccessEmbed = new Discord.MessageEmbed()
          .setTitle("**LOSS**")
          .setColor(0XFF0000)
          .setThumbnail(msg.author.avatarURL())
          .setDescription("You lost: "+ bet +" :(\nBot got: "+ dealer)
        msg.channel.send(SuccessEmbed);
      }
      if(drand === 0){ //if u get paper and dealer gets rock
        var dealer = "rock";
        UserJSON[msg.author.id].bal += parseInt(bet);
        Fs.writeFileSync("./DataBase/users.json", JSON.stringify(UserJSON));
        let SuccessEmbed = new Discord.MessageEmbed()
          .setTitle("**Win**")
          .setColor(0X32CD32)
          .setThumbnail(msg.author.avatarURL())
          .setDescription("You Win: "+ bet + "\nBot got: "+ dealer)
        msg.channel.send(SuccessEmbed);
      }
    return;}

    if(player == 2){
      if(drand === 2){ //if u get sis and dealer gets sis
        let SuccessEmbed = new Discord.MessageEmbed()
          .setTitle("**ew**")
          .setColor(0XFFA500)
          .setThumbnail(msg.author.avatarURL())
          .setDescription("You both got scissors")
        msg.channel.send(SuccessEmbed);
      }
      if(drand === 0){ //if u get sis and dealer gets rock
        var dealer = "rock";
        UserJSON[msg.author.id].bal -= parseInt(bet);
        Fs.writeFileSync("./DataBase/users.json", JSON.stringify(UserJSON));
        let SuccessEmbed = new Discord.MessageEmbed()
          .setTitle("**LOSS**")
          .setColor(0XFF0000)
          .setThumbnail(msg.author.avatarURL())
          .setDescription("You lost: "+ bet +" :(\nBot got: "+ dealer)
        msg.channel.send(SuccessEmbed);
      }
      if(drand === 1){ //if u get sis and dealer gets paper
        var dealer = "paper";
        UserJSON[msg.author.id].bal += parseInt(bet);
        Fs.writeFileSync("./DataBase/users.json", JSON.stringify(UserJSON));
        let SuccessEmbed = new Discord.MessageEmbed()
          .setTitle("**Win**")
          .setColor(0X32CD32)
          .setThumbnail(msg.author.avatarURL())
          .setDescription("You Win: "+ bet + "\nBot got: "+ dealer)
        msg.channel.send(SuccessEmbed);
      }
    return;}

}

module.exports.help = {
    name: "rps"
}