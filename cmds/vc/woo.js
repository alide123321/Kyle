module.exports.run = async (bot, msg, args) => {
    const vc = require('../../functions/vc.js').vc;
    
    msg.channel.send("https://cdn.discordapp.com/attachments/737775095828709508/738086389358264391/woo.gif");
    var VC = msg.member.voice.channel;
    vc("woo",.25,VC,msg.author.id,msg.channel)
}

module.exports.help = {
    name: "woo"
}