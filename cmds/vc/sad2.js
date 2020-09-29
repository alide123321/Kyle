module.exports.run = async (bot, msg, args) => {
  const vc = require("../../functions/vc.js").vc;

  var VC = msg.member.voice.channel;
  vc("sad2", 1.0, VC, msg.author.id, msg.channel);
  msg.channel.send(
    "https://cdn.discordapp.com/attachments/707451317626470455/760052929360429106/video0.mov"
  );
};

module.exports.help = {
  name: "sad2",
};
