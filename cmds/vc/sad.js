module.exports.run = async (bot, msg, args) => {
    const vc = require('../../functions/vc.js').vc;
    
    msg.channel.send("https://cdn.discordapp.com/attachments/707451317626470455/746467065577078915/video0.mp4");
      var VC = msg.member.voice.channel;
      vc("sad",.7,VC,msg.author.id,msg.channel)
}

module.exports.help = {
    name: "sad"
}