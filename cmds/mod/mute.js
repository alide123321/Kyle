module.exports.run = async (bot, msg, args) => {
    const Discord = require("discord.js");
    let text = msg.content;
    let reason = text.slice(28);
    const db = require('quick.db');
    var mutelist = new db.table('mutelist')
    let mentioned = msg.mentions.members.first();
    let author = msg.author.id

    if (!(msg.member.hasPermission('ADMINISTRATOR'))) {
        msg.channel.send('You dont have administrator perms')
    .then(msg => {
        msg.delete({ timeout: 5000 })
    })
    return;}

    const user = msg.mentions.members.first();

    if(!user) {
        msg.channel.send('Please specify a user, via mention or ID')
    .then(msg => {
        msg.delete({ timeout: 5000 })
    })
    return;}

    if(reason === " ") {
        msg.channel.send('Please specify a reason')
    .then(msg => {
        msg.delete({ timeout: 5000 })
    })
    return;}

    if(msg.author.id === user.id){
        msg.channel.send('You can\'t warn yourself dumb dumb')
    .then(msg => {
        msg.delete({ timeout: 5000 })
    })
    return;}

    if(msg.guild.owner.id === user.id){
        msg.channel.send('You can\'t unmute the server\'s owner')
    .then(msg => {
        msg.delete({ timeout: 5000 })
    })
    return;}

    user.roles.add("739067100085354526")

    let mute = new Discord.MessageEmbed()
        .setColor('#808080')
        .setTitle("**Muted**")
        .setURL("https://discord.gg/gBQc5cm")
        .setThumbnail('https://cdn.discordapp.com/attachments/739019780576641096/739022260857470981/Discord_Rose.png')
        .setDescription(`${user}\' Was muted by ${msg.member} for the follwoing reason: \`${reason}\``)
    msg.channel.send(mute)


    var muted = mutelist.get(`muted for_${msg.guild.id}_${mentioned.id}`)

    let mutedEmbed = new Discord.MessageEmbed()
        .setTitle("**warn**")
        .setColor(0X32CD32)
        .setThumbnail(msg.author.avatarURL())
        .setDescription(`You muted **${mentioned}** for ${reason} by: ${author}`)
    
    
    if(muted === null) {
        mutelist.set(`muted for_${msg.guild.id}_${mentioned.id}`, `${reason} by ${author}`)
        mentioned.send(`You have been muted in **${msg.guild.name}** for ${reason}`)
        await msg.channel.send(mutedEmbed);
    } else if (muted != null) {
        await mutelist.delete(`muted for_${msg.guild.id}_${mentioned.id}`)
        muted = muted.concat(`\n${reason} by ${author}\n`)
        mutelist.set(`muted for_${msg.guild.id}_${mentioned.id}`, muted)
        mentioned.send(`You have been muted in **${msg.guild.name}** for ${reason}`)
        await msg.channel.send(mutedEmbed);
    }

}
    

module.exports.help = {
    name: "mute"
}