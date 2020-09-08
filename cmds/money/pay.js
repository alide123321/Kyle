module.exports.run = async (bot, msg, args) => {
    const Discord = require("discord.js");
    const Fs = require("fs");
    
    let UserJSON = JSON.parse(Fs.readFileSync("./DataBase/users.json"));
    let Money = args[1];

    if (!Money) {
        let ErrorEmbed = new Discord.MessageEmbed()
        .setTitle("**ERROR**")
          .setColor(0XFF0000)
          .setThumbnail(msg.author.avatarURL())
          .setDescription("Please specify an amount to give .pay <#> <@>")
        msg.channel.send(ErrorEmbed);
      return;}

      if (!UserJSON[msg.author.id]) {
      let ErrorEmbed = new Discord.MessageEmbed()
        .setTitle("**ERROR**")
        .setColor(0XFF0000)
        .setThumbnail(msg.author.avatarURL())
        .setDescription("You are not in the system try .newbal")
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

      if (UserJSON[msg.author.id].bal < Money) {
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

      let Mentioned = msg.mentions.members.first();
        if (!Mentioned) {
          let ErrorEmbed = new Discord.MessageEmbed()
            .setTitle("**ERROR**")
            .setColor(0XFF0000)
            .setThumbnail(msg.author.avatarURL())
            .setDescription("Please mention a user .pay <#> <@>")
          msg.channel.send(ErrorEmbed);
        return;}

      if (!UserJSON[Mentioned.id]) {
        let ErrorEmbed = new Discord.MessageEmbed()
          .setTitle("**ERROR**")
          .setColor(0XFF0000)
          .setThumbnail(msg.author.avatarURL())
          .setDescription("That pearson isnt in the system tell them to use the .newbal command.")
        msg.channel.send(ErrorEmbed);
      return;}

      UserJSON[msg.author.id].bal -= parseInt(Money);
      UserJSON[Mentioned.id].bal += parseInt(Money);

      Fs.writeFileSync("./DataBase/users.json", JSON.stringify(UserJSON));

      let SuccessEmbed = new Discord.MessageEmbed()
        .setTitle("**SUCCESS**")
        .setColor(0X32CD32)
        .setThumbnail(Mentioned.user.avatarURL())
        .setDescription("You have given $" + Money + " discord coins to " + Mentioned.user.username)
      msg.channel.send(SuccessEmbed);
}

module.exports.help = {
    name: "pay"
}