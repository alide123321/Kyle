module.exports.run = async (bot, msg, args) => {
    const Discord = require("discord.js");
    const Fs = require("fs");
    
    let UserJSON = JSON.parse(Fs.readFileSync("./DataBase/users.json"));
    var dice = args[1];
    let bet = args[2];

    let rand = Math.floor(Math.random() * 6 ) + 1;

    if (!UserJSON[msg.author.id]) {
        let ErrorEmbed = new Discord.MessageEmbed()
          .setTitle("**ERROR**")
          .setColor(0XFF0000)
          .setThumbnail(msg.author.avatarURL())
          .setDescription("You are not in the system try .newbal")
        msg.channel.send(ErrorEmbed);
    return;}

    if(!args[1] || isNaN(dice)){
      let ErrorEmbed = new Discord.MessageEmbed()
        .setTitle("**ERROR**")
        .setColor(0XFF0000)
        .setThumbnail(msg.author.avatarURL())
        .setDescription("what number are you betting on \n.dice <1/2/3/4/5/6> <Bet>")
      msg.channel.send(ErrorEmbed);
    return;}

    if(dice > 6 || dice < 1){
      let ErrorEmbed = new Discord.MessageEmbed()
        .setTitle("**ERROR**")
        .setColor(0XFF0000)
        .setThumbnail(msg.author.avatarURL())
        .setDescription("what number are you betting on \n.dice <1/2/3/4/5/6> <Bet>")
      msg.channel.send(ErrorEmbed);
    return;}

    if(!args[2] || isNaN(bet)){
        let ErrorEmbed = new Discord.MessageEmbed()
          .setTitle("**ERROR**")
          .setColor(0XFF0000)
          .setThumbnail(msg.author.avatarURL())
          .setDescription("how much do you want to bet .dice <1/2/3/4/5/6> <Bet>")
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

    if(UserJSON[msg.author.id].bal < bet) {
      let ErrorEmbed = new Discord.MessageEmbed()
        .setTitle("**ERROR**")
        .setColor(0XFF0000)
        .setThumbnail(msg.author.avatarURL())
        .setDescription("You do not have enough money")
      msg.channel.send(ErrorEmbed);
    return;}

    if(dice == rand){
      let winmoney = bet * 3;

      UserJSON[msg.author.id].bal += parseInt(winmoney);
      Fs.writeFileSync("./DataBase/users.json", JSON.stringify(UserJSON));
      let SuccessEmbed = new Discord.MessageEmbed()
        .setTitle("**WIN**")
        .setColor(0X32CD32)
        .setThumbnail(msg.author.avatarURL())
        .setDescription("You won: "+ winmoney +" :)")
      msg.channel.send(SuccessEmbed);
    return;}

    if(dice !== rand){

      UserJSON[msg.author.id].bal -= parseInt(bet);
      Fs.writeFileSync("./DataBase/users.json", JSON.stringify(UserJSON));
      let SuccessEmbed = new Discord.MessageEmbed()
        .setTitle("**LOSS**")
        .setColor(0XFF0000)
        .setThumbnail(msg.author.avatarURL())
        .setDescription("You lost: "+ bet +" :(\n The dice was: "+rand)
      msg.channel.send(SuccessEmbed);
    return;}

        
}

module.exports.help = {
    name: "dice"
}