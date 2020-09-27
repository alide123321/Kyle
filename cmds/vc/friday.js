module.exports.run = async (bot, msg, args) => {
  const vc = require("../../functions/vc.js").vc;

  var VC = msg.member.voice.channel;
  vc("friday", 1.0, VC, msg.author.id, msg.channel);
  msg.channel.send(
    "https://cdn.discordapp.com/attachments/752042865349230662/754081325144735774/videoplayback.mp4"
  );
};

module.exports.help = {
  name: "friday",
};
