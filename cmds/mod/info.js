module.exports.run = async (bot, msg, args) => {
    const Discord = require("discord.js");
    
    const helplink = "https://sites.google.com/view/kyle-bot/home";
    const version = "1.5.0";
    const auther = "alide123321#9518";

    let info = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle("**Help commands**")
        .setURL(helplink)
        .setThumbnail('https://cdn.discordapp.com/attachments/739019780576641096/739022260857470981/Discord_Rose.png')
        .addFields(
          {name: "version: ", value: version}, 
          {name: "author: ", value: auther}
        )
      msg.channel.send(info);
}

module.exports.help = {
    name: "info"
}