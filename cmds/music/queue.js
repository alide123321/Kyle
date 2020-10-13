module.exports.run = async (bot, msg, args) => {
  const serverQueue = msg.client.queue.get(msg.guild.id);
  if (!serverQueue) return msg.channel.send("There is nothing playing.");
  return msg.channel.send(`
__**Song queue:**__
${serverQueue.songs.map((song) => `**-** ${song.title}`).join("\n")}
**Now playing:** ${serverQueue.songs[0].title}
		`);
};

module.exports.help = {
  name: "queue",
  Alias: "q",
};
