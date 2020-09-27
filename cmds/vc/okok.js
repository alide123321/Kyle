module.exports.run = async (bot, msg, args) => {
  const vc = require("../../functions/vc.js").vc;

  var VC = msg.member.voice.channel;
  vc("okok", 0.5, VC, msg.author.id, msg.channel);
  msg.channel.send(
    "https://cdn.discordapp.com/attachments/608295365384339457/737059292930375780/video0.mov"
  );
};

module.exports.help = {
  name: "okok",
};
