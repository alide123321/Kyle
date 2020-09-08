module.exports.run = async (bot, msg, args) => {
    const vc = require('../../functions/vc.js').vc;
    
    msg.channel.send("https://cdn.discordapp.com/attachments/707451317626470455/740725168904601670/videoplayback_1_online-video-cutter.com.mp4");
      var VC = msg.member.voice.channel;
      vc("kanye",.7,VC,msg.author.id,msg.channel)
}

module.exports.help = {
    name: "kanye"
}