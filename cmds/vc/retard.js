module.exports.run = async (bot, msg, args) => {
  const vc = require("../../assets/functions/vc.js").vc;

  var VC = msg.member.voice.channel;
  vc("retard", 0.5, VC, msg.author.id, msg.channel);
  msg.channel.send(
    "https://cdn.discordapp.com/attachments/724055819548622968/768747697376198666/120862237_329041051492571_197292215089316325_n.mp4"
  );
};

module.exports.help = {
  name: "retard",
};
