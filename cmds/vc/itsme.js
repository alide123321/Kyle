module.exports.run = async (bot, msg, args) => {
  const vc = require("../../functions/vc.js").vc;

  var VC = msg.member.voice.channel;
  vc("itsme", 0.7, VC, msg.author.id, msg.channel);
  msg.channel.send(
    "https://cdn.discordapp.com/attachments/599061991281131531/749542094783381624/Its_me_Im_niggas.mp4"
  );
};

module.exports.help = {
  name: "itsme",
};
