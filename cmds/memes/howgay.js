module.exports.run = async (bot, msg, args) => {
    let perc = Math.floor(Math.random() * 101);
    const Discord = require("discord.js");
    let mentioned = msg.mentions.members.first();
  
    if (mentioned) {
        if (mentioned.id === '698051518754062387') 
            perc = "-0";
        let menEmbed = new Discord.MessageEmbed()
            .setTitle("**Using the gay detectior on "+mentioned.user.username+"**")
            .setColor(0X32CD32)
            .setThumbnail(mentioned.user.avatarURL())
            .setDescription(`**${perc}% gay :rainbow_flag:**`)
        msg.channel.send(menEmbed);
    return;
    } else {
        let authEmbed = new Discord.MessageEmbed()
            .setTitle("**Using the gay detectior on "+msg.author.username+"**")
            .setColor(0X32CD32)
            .setThumbnail(msg.author.avatarURL())
            .setDescription(`**${perc}% gay :rainbow_flag:**`)
        msg.channel.send(authEmbed);
    }

}

module.exports.help = {
    name: "howgay"
}