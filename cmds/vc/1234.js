module.exports.run = async (bot, msg, args) => {
  const vc = require("../../assets/functions/vc.js").vc;

  var VC = msg.member.voice.channel;
  vc("1234", 0.7, VC, msg.author.id, msg.channel);
  msg.channel.send(
    "https://cdn.discordapp.com/attachments/752042865349230662/761928030020829184/videoplayback.mp4"
  );
};

module.exports.help = {
  name: "1234",
};
