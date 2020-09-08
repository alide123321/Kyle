module.exports.run = async (bot, msg, args) => {
    const vc = require('../../functions/vc.js').vc;
    
    msg.channel.send("https://cdn.discordapp.com/attachments/599061991281131531/749542094783381624/Its_me_Im_niggas.mp4");
      var VC = msg.member.voice.channel;
      vc("itsme",.7,VC,msg.author.id,msg.channel)
}

module.exports.help = {
    name: "itsme"
}