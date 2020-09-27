module.exports.run = async (bot, msg, args) => {
  const vc = require("../../functions/vc.js").vc;

  var VC = msg.member.voice.channel;
  vc("graduate", 0.5, VC, msg.author.id, msg.channel);
  msg.channel.send(
    "https://cdn.discordapp.com/attachments/739448495634645002/751762869716254721/videoplayback.mp4"
  );
};

module.exports.help = {
  name: "graduate",
};
