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

      let mentioned = msg.mentions.members.first();
        if (mentioned) {
          if (!UserJSON[mentioned.id]) {
            let ErrorEmbed = new Discord.MessageEmbed()
              .setTitle("**ERROR**")
              .setColor(0XFF0000)
              .setThumbnail(msg.author.avatarURL())
              .setDescription("That pearson isnt in the system tell them to use the .newbal command.")
            msg.channel.send(ErrorEmbed);
          return;}

          let SuccessEmbed = new Discord.MessageEmbed()
            .setTitle("**"+mentioned.user.username+"'S BALANCE**")
            .setColor(0X32CD32)
            .setThumbnail(mentioned.user.avatarURL())
            .addField("Balance", UserJSON[mentioned.id].bal)
          msg.channel.send(SuccessEmbed);
        return;
        } else {
          let SuccessEmbed = new Discord.MessageEmbed()
            .setTitle("**YOUR BALANCE**")
            .setColor(0X32CD32)
            .setThumbnail(msg.author.avatarURL())
            .addField("Balance", UserJSON[msg.author.id].bal)
          msg.channel.send(SuccessEmbed);
        }
}

module.exports.help = {
    name: "bal"
}