module.exports.run = async (bot, msg, args) => {
    const vc = require('../../functions/vc.js').vc;
    
    var VC = msg.member.voice.channel;
    vc("rock",.6,VC,msg.author.id,msg.channel)
    msg.channel.send("https://cdn.discordapp.com/attachments/707451317626470455/748035445140619264/rock.mp4");
}

module.exports.help = {
    name: "rock"
}