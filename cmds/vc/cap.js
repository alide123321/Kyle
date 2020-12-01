module.exports.run = async (bot, msg, args) => {
  const vc = require("../../assets/functions/vc.js").vc;

  var VC = msg.member.voice.channel;
  vc("cap", 0.7, VC, msg.author.id, msg.channel);
  msg.channel.send(
    "https://cdn.discordapp.com/attachments/752042865349230662/759799959229825104/Zias_Stop_The_Cap.mp4"
  );
};

module.exports.help = {
  name: "cap",
};
