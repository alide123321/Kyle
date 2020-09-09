module.exports.run = async (bot, msg, args) => {
    const vc = require('../../functions/vc.js').vc;
    
    var VC = msg.member.voice.channel;
    vc("sad",1.0,VC,msg.author.id,msg.channel)
    msg.channel.send("https://cdn.discordapp.com/attachments/707451317626470455/746467065577078915/video0.mp4");
}

module.exports.help = {
    name: "sad"
}