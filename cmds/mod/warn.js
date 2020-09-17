module.exports.run = async (bot, msg, args) => {
    const Discord = require("discord.js");
    const db = require('quick.db');
    var warn = new db.table('warn')
    let author = msg.author.id
    let mentioned = msg.mentions.members.first();
    let text = msg.content;
    let reason = text.slice(29);

    if(!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.channel.send("You should have admin perms to use this command!")
    return;}
    
    if(!(mentioned)){
        msg.channel.send(`Who do you want to warm? .warn <@> <reason>`)
    return;}

    if(mentioned.bot) {
        msg.channel.send("You can not warn bots")
    return;}


    

    if(author === mentioned.id) {
        msg.channel.send("You can not warn yourself")
    return;}

    if(msg.guild.owner.id === mentioned.id) {
        msg.channel.send("You can not warn yourself")
    return;}

    if(!(reason)){
        msg.channel.send(`Who do you want to warm? .warn <@> <reason>`)
    return;}
    
    var warnings = warn.get(`warnings_${msg.guild.id}_${mentioned.id}`)

    let warningEmbed = new Discord.MessageEmbed()
        .setTitle("**warn**")
        .setColor(0X32CD32)
        .setThumbnail(msg.author.avatarURL())
        .setDescription(`You warned **${mentioned}** for ${reason} by: ${author}`)
    
    
    if(warnings === null) {
        warn.set(`warnings_${msg.guild.id}_${mentioned.id}`, `${reason} by ${author}`)
        mentioned.send(`You have been warned in **${msg.guild.name}** for ${reason}`)
        await msg.channel.send(warningEmbed);
    } else if (warnings != null) {
        await warn.delete(`warnings_${msg.guild.id}_${mentioned.id}`)
        warnings = warnings.concat(`, and ${reason} by ${author}`)
        warn.set(`warnings_${msg.guild.id}_${mentioned.id}`, warnings)
        mentioned.send(`You have been warned in **${msg.guild.name}** for ${reason}`)
        await msg.channel.send(warningEmbed);
    }

    

}
  
module.exports.help = {
    name: "warn"
}