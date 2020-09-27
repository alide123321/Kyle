module.exports.run = async (bot, msg, args) => {
  let mentioned = msg.mentions.members.first();
  if (!mentioned)
    msg.channel.send(
      "https://cdn.discordapp.com/attachments/599061991281131531/751735078203293726/118375543_164947441915565_6934644620562947858_n.mp4"
    );
  if (mentioned) {
    mentioned.send("**" + msg.author.username + " Says Good Night**");
    mentioned.send(
      "https://cdn.discordapp.com/attachments/599061991281131531/751735078203293726/118375543_164947441915565_6934644620562947858_n.mp4"
    );
    msg.channel.send("Sent " + mentioned.user.username + " a Good Night msg");
  }
};

module.exports.help = {
  name: "gn",
};
