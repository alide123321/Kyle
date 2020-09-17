module.exports.run = async (bot, msg, args) => {
    const { canModifyQueue } = require("../../util/Kylebotutil.js");

    const queue = msg.client.queue.get(msg.guild.id);

    if (!queue) return msg.reply("There is nothing playing.").catch(console.error);
    if (!canModifyQueue(msg.member))
      return msg.reply("You need to join a voice channel first!").catch(console.error);

    if (!args[0]) return msg.reply(`🔊 The current volume is: **${queue.volume}%**`).catch(console.error);
    if (isNaN(args[0])) return msg.reply("Please use a number to set volume.").catch(console.error);
    if (parseInt(args[0]) > 100 || parseInt(args[0]) < 0)
      return msg.reply("Please use a number between 0 - 100.").catch(console.error);

    queue.volume = args[0];
    queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);

    return queue.textChannel.send(`Volume set to: **${args[0]}%**`).catch(console.error);
}

module.exports.help = {
    name: "vol"
}