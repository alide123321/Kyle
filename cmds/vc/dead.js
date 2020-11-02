module.exports.run = async (bot, msg, args) => {
  const vc = require("../../assets/functions/vc.js").vc;

  var VC = msg.member.voice.channel;
  vc("dead", 0.7, VC, msg.author.id, msg.channel);
  msg.channel.send(
    "https://cdn.discordapp.com/attachments/669931327797067807/772713992178106388/video0.mov"
  );
};

module.exports.help = {
  name: "dead",
};
