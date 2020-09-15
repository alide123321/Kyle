module.exports.run = async (bot, msg, args) => {
    const Discord = require("discord.js");
    let text = msg.content;
    let reason = text.slice(29);

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

}
    

module.exports.help = {
    name: "mute"
}