module.exports.run = async (bot, msg, args) => {
    const Discord = require("discord.js");
    const prefix = '.';
    
    const helplink = "https://sites.google.com/view/kyle-bot/home";

    var moneyhelp = [
        "**" + prefix + "newbal________use this command first**",
        "**" + prefix + "daily_________adds 10 coins everyday**",
        "**" + prefix + "pay___________pay someone**",
        "**" + prefix + "bal___________to check your balance**",
        "**" + prefix + "topbal________Check who the richest person in server is**"
    ]

    let balhelp = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle("**BalCommands**")
        .setURL(helplink)
        .setThumbnail('https://cdn.discordapp.com/attachments/739019780576641096/739022260857470981/Discord_Rose.png')
        .addFields(
          {name: "Check out the commands on our website", value: helplink}, 
          {name: "**Money Commands**", value: moneyhelp}
    )
    msg.channel.send(balhelp);
}

module.exports.help = {
    name: "moneyhelp"
}