module.exports.run = async (bot, msg, args) => {
  const Discord = require("discord.js");
  const db = require('quick.db');
  var economy = new db.table('economy')
  let author = msg.author.id
  let mentioned = msg.mentions.members.first();
  let useracc = economy.get(`${author}.bal`);

  useracc = economy.get(`${author}.bal`)
  
    if (mentioned) {
      let menacc = economy.has(mentioned.id)
      if (!menacc) {
        let ErrorEmbed = new Discord.MessageEmbed()
          .setTitle("**ERROR**")
          .setColor(0XFF0000)
          .setThumbnail(msg.author.avatarURL())
          .setDescription("That pearson isnt in the system tell them to use the .bal command.")
        msg.channel.send(ErrorEmbed);
      return;}

      let SuccessEmbed = new Discord.MessageEmbed()
        .setTitle("**"+mentioned.user.username+"'S BALANCE**")
        .setColor(0X32CD32)
        .setThumbnail(mentioned.user.avatarURL())
        .addField("Balance", economy.get(`${mentioned.id}.bal`), "<:chip:751730576918315048>")
      msg.channel.send(SuccessEmbed);
    return;
    } else {
      let SuccessEmbed = new Discord.MessageEmbed()
        .setTitle("**YOUR BALANCE**")
        .setColor(0X32CD32)
        .setThumbnail(msg.author.avatarURL())
        .addField("Balance", useracc, "<:chip:751730576918315048>")
      msg.channel.send(SuccessEmbed);
    }

}

module.exports.help = {
    name: "bal"
}