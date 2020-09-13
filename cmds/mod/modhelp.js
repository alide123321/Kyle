module.exports.run = async (bot, msg, args) => {
    const Discord = require("discord.js");
    const prefix = '.';
    
    const helplink = "https://sites.google.com/view/kyle-bot/home";

    var modshelp = [
        "**" + prefix + "help__________will bring up this page**",
        "**" + prefix + "website_______Do you to check put our website?**",
        "**" + prefix + "ping__________will tell you if the bot is online**",
        "**" + prefix + "clear <#>_____clears the messages above it by #**", 
        "**" + prefix + "info__________more information about the bot**",
        "**" + prefix + "report________to report anything related to this server DM me**",
        "**" + prefix + "announce <#><title>_after that the bot will ask for the description**",
        "**" + prefix + "whois<@>______Find information about a user**",
        "**" + prefix + "mute__________Give someone the muted role**",
        "**" + prefix + "unmute________Take someone's muted role away**"
      ];

    let modhelp = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle("**Mod commands**")
        .setURL(helplink)
        .setThumbnail('https://cdn.discordapp.com/attachments/739019780576641096/739022260857470981/Discord_Rose.png')
        .addFields(
          {name: "Check out the commands on our website", value: helplink}, 
          {name: "**Moderatorcommands**", value: modshelp}
        )
    msg.channel.send(modhelp);
}

module.exports.help = {
    name: "modhelp"
}