module.exports.run = async (bot, msg, args) => {
    const { canModifyQueue } = require("../../util/Kylebotutil.js");

    const queue = msg.client.queue.get(msg.guild.id);
    if (!queue) return msg.reply("There is nothing playing.").catch(console.error);
    if (!canModifyQueue(msg.member)) return;

    // toggle from false to true and reverse
    queue.loop = !queue.loop;
    return queue.textChannel
      .send(`Loop is now ${queue.loop ? "**on**" : "**off**"}`)
      .catch(console.error);
}

module.exports.help = {
    name: "loop"
}