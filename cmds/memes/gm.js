module.exports.run = async (bot, msg, args) => {
  const GmGndown = require("../../assets/functions/GmGn.js").GmGndown;
  let mentioned = msg.mentions.members.first();

  if (GmGndown.has(msg.author.id) && msg.author.id !== "698051518754062387") {
    msg.channel.send("Cooldown for 1 hour").then((msg) => {
      msg.delete({ timeout: 5000 });
    });
    return;
  }

  GmGndown.add(msg.author.id);
  setTimeout(() => {
    GmGndown.delete(msg.author.id);
  }, 3600000);

  if (!mentioned)
    msg.channel.send(
      "https://cdn.discordapp.com/attachments/599061991281131531/757130408251883571/videoplayback.mp4"
    );
  if (mentioned) {
    mentioned
      .send(
        "**" +
          msg.author.username +
          " Says Good Morning**\n" +
          "https://cdn.discordapp.com/attachments/599061991281131531/757130408251883571/videoplayback.mp4"
      )
      .catch(() => msg.reply("Can't send DM to that user!"));
    msg.channel.send("Sent " + mentioned.user.username + " a Good Morning msg");
  }
};

module.exports.help = {
  name: "gm",
};
