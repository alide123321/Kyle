module.exports.run = async (bot, msg, args) => {
    const vcmuted = require('../../functions/vcmuted.js').vcmuted;
    let Mentioned = msg.mentions.members.first();

    if (!(msg.member.hasPermission('ADMINISTRATOR'))) {
        let ErrorEmbed = new Discord.MessageEmbed()
            .setTitle("**ERROR**")
            .setColor(0XFF0000)
            .setDescription("dumb dumb ur not a admin")
          msg.channel.send(ErrorEmbed);
    return;}

    if(!Mentioned){
        let ErrorEmbed = new Discord.MessageEmbed()
            .setTitle("**ERROR**")
            .setColor(0XFF0000)
            .setDescription("Who do you want to want to mute from using any commands in .vchelp")
          msg.channel.send(ErrorEmbed);
    return;}


    vcmuted.add(Mentioned);
}

module.exports.help = {
    name: "vcmute"
}