module.exports.run = async (bot, msg, args) => {
    const Discord = require("discord.js");
    const Fs = require("fs");
    
    let UserJSON = JSON.parse(Fs.readFileSync("./DataBase/users.json"));

      if (!UserJSON[msg.author.id]) {
        let ErrorEmbed = new Discord.MessageEmbed()
          .setTitle("**ERROR**")
          .setColor(0XFF0000)
          .setThumbnail(msg.author.avatarURL())
          .setDescription("You are not in the system try .newbal")
          msg.channel.send(ErrorEmbed);
        return;}

      if (Math.floor(new Date().getTime() - UserJSON[msg.author.id].lastclaim) / (1000 * 60 * 60 * 24) < 1) {
        let WarningEmbed = new Discord.MessageEmbed()
          .setTitle("**Daily**")
          .setColor(0XFF0000)
          .setThumbnail(msg.author.avatarURL())
          .setDescription("You have claimed today already")
        msg.channel.send(WarningEmbed);
        return;}

      UserJSON[msg.author.id].bal += 50;
      UserJSON[msg.author.id].lastclaim = new Date().getTime();
      Fs.writeFileSync("./DataBase/users.json", JSON.stringify(UserJSON));
      let SuccessEmbed = new Discord.MessageEmbed()
        .setTitle("**SUCCESS**")
        .setColor(0X32CD32)
        .setThumbnail(msg.author.avatarURL())
        .setDescription("You have claimed your daily reward of 50 coins!")
      msg.channel.send(SuccessEmbed);
}

module.exports.help = {
    name: "daily"
}