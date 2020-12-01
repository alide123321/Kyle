module.exports.run = async (bot, msg, args) => {
  const { canModifyQueue } = require("../../assets/util/Kylebotutil.js");

  const queue = msg.client.queue.get(msg.guild.id);
  if (!queue) return msg.reply("There is nothing playing.").catch(console.error);
  if (!canModifyQueue(msg.member)) return;

  if (queue.playing) {
    queue.playing = false;
    queue.connection.dispatcher.pause(true);
    return queue.textChannel.send(`${msg.author} ⏸ paused the music.`).catch(console.error);
  }
};

module.exports.help = {
  name: "pause",
};
