module.exports.run = async (bot, msg, args) => {
  const vc = require("../../assets/functions/vc.js").vc;

  var VC = msg.member.voice.channel;
  vc("boing", 0.5, VC, msg.author.id, msg.channel);
  msg.channel.send(
    "https://cdn.discordapp.com/attachments/707451317626470455/767339717326667806/video0.mp4"
  );
};

module.exports.help = {
  name: "boing",
};
