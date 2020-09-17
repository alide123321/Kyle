module.exports.run = async (bot, msg, args) => {
    const { canModifyQueue } = require("../util/Kylebotutil.js");
    
    const queue = msg.client.queue.get(msg.guild.id);
    if (!queue) return msg.channel.send("There is no queue.").catch(console.error);
    if (!canModifyQueue(msg.member)) return;
    
    if (!args.length) return msg.reply(`Usage: ${msg.client.prefix}remove <Queue Number>`);
    if (isNaN(args[0])) return msg.reply(`Usage: ${msg.client.prefix}remove <Queue Number>`);

    const song = queue.songs.splice(args[0] - 1, 1);
    queue.textChannel.send(`${msg.author} ❌ removed **${song[0].title}** from the queue.`);
}

module.exports.help = {
    name: "remove"
}