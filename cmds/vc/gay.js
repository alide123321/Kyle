module.exports.run = async (bot, msg, args) => {
    const vc = require('../../functions/vc.js').vc;
    
    msg.channel.send("https://cdn.discordapp.com/attachments/608207237667749908/746398464220463216/video0.mp4");
      var VC = msg.member.voice.channel;
      vc("gay",.5,VC,msg.author.id,msg.channel)
}

module.exports.help = {
    name: "gay"
}