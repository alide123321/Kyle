module.exports.run = async (bot, msg, args) => {
    const Discord = require("discord.js");
    const db = require('quick.db');
    var mutelist = new db.table('mutelist')
    let mentioned = msg.mentions.members.first();


    if(!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.channel.send("You should have admin perms to use this command!")
    return;}

    if(!(mentioned)){
        msg.channel.send(`Who do you want to check? (.whymute <@>)`)
    return;}

    if(mentioned.bot) {
        msg.channel.send("You can not check the mute history of bots.")
    return;}

    var muted = mutelist.get(`muted for_${msg.guild.id}_${mentioned.id}`)

    let warningEmbed = new Discord.MessageEmbed()
        .setTitle("**Muted Reasons**")
        .setColor(0X32CD32)
        .setThumbnail(mentioned.user.avatarURL())
        .setDescription(`**${mentioned}** was muted for ${muted}`)
    

    if(muted === null) {
        let noneEm = new Discord.MessageEmbed()
            .setTitle("**Muted Reasons**")
            .setColor(0X32CD32)
            .setThumbnail(mentioned.user.avatarURL())
        .setDescription(`**${mentioned}** was never muted`)
        msg.channel.send(noneEm);
    } else if (muted != null) {
        msg.channel.send(warningEmbed);
    }


}
  
module.exports.help = {
    name: "whymute"
}