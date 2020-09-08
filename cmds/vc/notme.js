module.exports.run = async (bot, msg, args) => {
    const vc = require('../../functions/vc.js').vc;
    
    msg.channel.send("https://cdn.discordapp.com/attachments/707451317626470455/751540044476710982/not_me.mp4");
      var VC = msg.member.voice.channel;
      vc("notme",.7,VC,msg.author.id,msg.channel)
}

module.exports.help = {
    name: "notme"
}