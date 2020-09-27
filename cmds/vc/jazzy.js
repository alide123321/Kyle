module.exports.run = async (bot, msg, args) => {
  const vc = require("../../functions/vc.js").vc;

  var VC = msg.member.voice.channel;
  vc("jazzy", 1.5, VC, msg.author.id, msg.channel);
  msg.channel.send(
    "https://cdn.discordapp.com/attachments/752042865349230662/756065344724140032/video0.mp4"
  );
};

module.exports.help = {
  name: "jazzy",
};
