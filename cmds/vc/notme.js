module.exports.run = async (bot, msg, args) => {
  const vc = require("../../functions/vc.js").vc;

  var VC = msg.member.voice.channel;
  vc("notme", 0.7, VC, msg.author.id, msg.channel);
  msg.channel.send(
    "https://cdn.discordapp.com/attachments/707451317626470455/751540044476710982/not_me.mp4"
  );
};

module.exports.help = {
  name: "notme",
};
