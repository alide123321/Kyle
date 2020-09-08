module.exports.run = async (bot, msg, args) => {
    const Discord = require("discord.js");
    const Fs = require("fs");
    
    let UserJSON = JSON.parse(Fs.readFileSync("./DataBase/users.json"));

      if (UserJSON[msg.author.id]) {
        let WarningEmbed = new Discord.MessageEmbed()
          .setTitle("**ERROR**")
          .setColor(0XFF0000)
          .setThumbnail(msg.author.avatarURL())
          .setDescription("You are already in the system")
        msg.channel.send(WarningEmbed);
        return;}

      UserJSON[msg.author.id] = {
        bal : 100,
        lastclaim : 0,
      }
      Fs.writeFileSync("./DataBase/users.json", JSON.stringify(UserJSON));

      let SuccessEmbed = new Discord.MessageEmbed()
        .setTitle("**WELCOME**")
        .setColor(0X32CD32)
        .setThumbnail(msg.author.avatarURL())
        .setDescription("You have joined the economy!")
      msg.channel.send(SuccessEmbed);
}

module.exports.help = {
    name: "newbal"
}