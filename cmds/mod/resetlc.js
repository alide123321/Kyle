module.exports.run = async (bot, msg, args) => {
    const Discord = require("discord.js");
    const db = require('quick.db');
    var economy = new db.table('economy')

    if (author !== '698051518754062387') {
        msg.channel.send("Only Alide can use this command")
    return;}

    var allusers = (await msg.guild.members.fetch()).keyArray("id")
    var send = []

    for(let x = 0; x <= allusers.length ;++x){
        if (economy.get(`${allusers[x]}.lc`)) {
            let lc = economy.get(`${allusers[x]}.lc`)
            economy.subtract(`${allusers[x]}.lc`,lc)
            send.push((await msg.guild.members.fetch(allusers[x])).displayName)
        }
    }

    let resetem = new Discord.MessageEmbed()
        .setTitle("**Reseted Users**")
        .setColor('#0099ff')
        .setDescription(send)
    msg.channel.send(resetem);

}

module.exports.help = {
    name: "resetlc"
}