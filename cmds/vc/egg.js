module.exports.run = async (bot, msg, args) => {
    const vc = require('../../functions/vc.js').vc;

    var VC = msg.member.voice.channel;
    vc("egg",.7,VC,msg.author.id,msg.channel)
    msg.channel.send("https://cdn.discordapp.com/attachments/752042865349230662/752123240226357268/EggMan_Sings_Yi_Jian_Mei_Synced_Up.mp4");
}

module.exports.help = {
    name: "egg"
}