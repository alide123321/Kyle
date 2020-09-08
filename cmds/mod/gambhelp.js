module.exports.run = async (bot, msg, args) => {
    const Discord = require("discord.js");
    const prefix = '.';
    
    const helplink = "https://sites.google.com/view/kyle-bot/home";

    var gamblhelp = [
        "**" + prefix + "flip__________A fifty fifty chance of winning**",
        "**" + prefix + "dice__________Roll a dice if you get it right you get 3X your bet but if you lose then you lose your bet**",
        "**" + prefix + "bj____________Play Black Jack**",
        "**" + prefix + "rps___________Play Rock Paper scissors**"
      ]

    let ballhelp = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle("**GambCommands**")
        .setURL(helplink)
        .setThumbnail('https://cdn.discordapp.com/attachments/739019780576641096/739022260857470981/Discord_Rose.png')
        .addFields(
          {name: "Check out the commands on our website", value: helplink}, 
          {name: "**Gambling Commands**", value: gamblhelp}
    )
    msg.channel.send(ballhelp);
}

module.exports.help = {
    name: "gambhelp"
}