module.exports.run = async (bot, msg, args) => {
  let imageNum = Math.floor(Math.random() * 8) + 1;
  msg.channel.send({ files: ["./images/oof" + imageNum + ".jpg"] });
};

module.exports.help = {
  name: "oof",
};
