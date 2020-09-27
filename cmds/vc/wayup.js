module.exports.run = async (bot, msg, args) => {
  const vc = require("../../functions/vc.js").vc;

  var VC = msg.member.voice.channel;
  vc("wayup", 0.7, VC, msg.author.id, msg.channel);
  msg.channel.send(
    "https://cdn.discordapp.com/attachments/752042865349230662/753350097886249080/videoplayback.mp4"
  );
};

module.exports.help = {
  name: "wayup",
};
