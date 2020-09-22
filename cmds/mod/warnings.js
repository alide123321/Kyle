module.exports.run = async (bot, msg, args) => {
    const Discord = require("discord.js");
    const db = require('quick.db');
    var warn = new db.table('warn')
    let mentioned = msg.mentions.members.first();


    if(!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.channel.send("You should have admin perms to use this command!")
    return;}

    if(!(mentioned)){
        msg.channel.send(`Who do you want to warm? .warnings <@>`)
    return;}

    if(mentioned.bot) {
        msg.channel.send("You can not warn bots")
    return;}

    let warnings = warn.get(`warnings_${msg.guild.id}_${mentioned.id}`)

    let warningEmbed = new Discord.MessageEmbed()
        .setTitle("**warnings**")
        .setColor(0X32CD32)
        .setThumbnail(mentioned.user.avatarURL())
        .setDescription(`**${mentioned}** was warned for ${warnings}`)
    

    if(warnings === null) {
        let noneEm = new Discord.MessageEmbed()
        .setTitle("**warnings**")
        .setColor(0X32CD32)
        .setThumbnail(mentioned.user.avatarURL())
        .setDescription(`**${mentioned}** has no warnings`)
        msg.channel.send(noneEm);
    } else if (warnings != null) {
        msg.channel.send(warningEmbed);
    }

    

}
  
module.exports.help = {
    name: "warnings"
}