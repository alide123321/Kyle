module.exports.run = async (bot, msg, args) => {
    const vc = require('../../functions/vc.js').vc;
    
    msg.channel.send("https://cdn.discordapp.com/attachments/608207237667749908/740063663502786670/video0.mov");
      var VC = msg.member.voice.channel;
      vc("itis",.5,VC,msg.author.id,msg.channel)
}

module.exports.help = {
    name: "itis"
}