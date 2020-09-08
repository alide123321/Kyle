module.exports.run = async (bot, msg, args) => {
    const vc = require('../../functions/vc.js').vc;
    
    msg.channel.send("https://cdn.discordapp.com/attachments/707451317626470455/740483382173237299/JoeBuddenstopmeme.mp4");
      var VC = msg.member.voice.channel;
      vc("stop",.5,VC,msg.author.id,msg.channel)
}

module.exports.help = {
    name: "stop"
}