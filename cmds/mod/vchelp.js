module.exports.run = async (bot, msg, args) => {
    const Discord = require("discord.js");
    const prefix = '.';
    
    const helplink = "https://sites.google.com/view/kyle-bot/home";

    var VChelp = [
        "**" + prefix + "okok__________PopSmoke's OK OK**",
        "**" + prefix + "woo___________Woo back**",
        "**" + prefix + "hamood________Arab**", 
        "**" + prefix + "itis__________IT IS WHAT IT ISSS**",
        "**" + prefix + "stop__________just stop**",
        "**" + prefix + "cough_________Weed cough**",
        "**" + prefix + "kanye_________shut the fuck up!**",
        "**" + prefix + "rock__________Shut up bitch!**",
        "**" + prefix + "mad___________HOES MAD!!!**",
        "**" + prefix + "gay___________HES GAY!!!**",
        "**" + prefix + "sad___________it's actually changes by x**",
        "**" + prefix + "smoothie______im about to try my smoothie**",
        "**" + prefix + "itsme_________its me im**",
        "**" + prefix + "unwise________ming dynasty pussy**",
        "**" + prefix + "shampoo_______HAHA shampoo**",
        "**" + prefix + "notme_________Who the fuck wanna listen to that**",
        "**" + prefix + "graduate______you think u can graduate**",
        "**" + prefix + "egg___________Egg man**",
        "**" + prefix + "wayup_________Started from the bottom now we way up**"
    ];

    let modhelp = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle("**VC commands**")
        .setURL(helplink)
        .setThumbnail('https://cdn.discordapp.com/attachments/739019780576641096/739022260857470981/Discord_Rose.png')
        .addFields(
          {name: "Check out the commands on our website", value: helplink}, 
          {name: "**VCcommands**", value: VChelp}
    )
    msg.channel.send(modhelp);
}

module.exports.help = {
    name: "vchelp"
}