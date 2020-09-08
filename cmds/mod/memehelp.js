module.exports.run = async (bot, msg, args) => {
    const Discord = require("discord.js");
    const prefix = '.';
    
    const helplink = "https://sites.google.com/view/kyle-bot/home";

    var funhelp = [
        "**" + prefix + "memes_________for the best memes**",
        "**" + prefix + "spam__________will spam whatever you tell it to 5X**",
        "**" + prefix + "shhdm<@><msg>_Send a anonymous message to someone**",
        "**" + prefix + "oof___________to show the oof**", 
        "**" + prefix + "emilie________STFU emilie**",
        "**" + prefix + "Simp__________Simp bucks**",
        "**" + prefix + "haram_________Haram**",
        "**" + prefix + "blue__________Scary blue**",
        "**" + prefix + "our___________Our stuff**",
        "**" + prefix + "smh___________disappointed**",
        "**" + prefix + "kith__________gimme kith**",
        "**" + prefix + "wtf___________wtf?**",
        "**" + prefix + "bruh__________that face**",
        "**" + prefix + "pardon________PARDON.**",
        "**" + prefix + "halal_________absolutely halal**",
        "**" + prefix + "gn<@>_________Say GN to anyone better if u @ them**",
        "**" + prefix + "gm<@>_________Say GM to anyone better if u @ them**",
        "**" + prefix + "frog__________Frog someone**"
    ];

    let memehelp = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle("**Meme commands**")
      .setURL(helplink)
      .setThumbnail('https://cdn.discordapp.com/attachments/739019780576641096/739022260857470981/Discord_Rose.png')
      .addFields(
        {name: "Check out the commands on our website", value: helplink}, 
        {name: "**Meme commands**", value: funhelp}
      )
    msg.channel.send(memehelp);
}

module.exports.help = {
    name: "memehelp"
}