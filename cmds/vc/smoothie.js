module.exports.run = async (bot, msg, args) => {
    const vc = require('../../functions/vc.js').vc;
    
    msg.channel.send("https://cdn.discordapp.com/attachments/608207237667749908/748466554097631291/Im_about_to_try_my_smoothie.mp4");
      var VC = msg.member.voice.channel;
      vc("smoothie",.7,VC,msg.author.id,msg.channel)
}

module.exports.help = {
    name: "smoothie"
}