module.exports.run = async (bot, msg, args) => {
    const vc = require('../../functions/vc.js').vc;
    
    var VC = msg.member.voice.channel;
    vc("mad",.35,VC,msg.author.id,msg.channel)
    msg.channel.send("https://cdn.discordapp.com/attachments/707451317626470455/743726550213460068/HOES_MAD_FULL_VIDEO.mp4");
}

module.exports.help = {
    name: "mad"
}