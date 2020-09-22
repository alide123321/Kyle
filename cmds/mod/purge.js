module.exports.run = async (bot, msg, args) => {

  if (msg.member.hasPermission('ADMINISTRATOR')) {
    if (!args[1])
      return msg.reply("Error: please define how many messages do you want to delete.");
    if (isNaN(args[1]))
      return msg.reply("Error: please define how many messages do you want to delete.");

    args[1]++;

    if (args[1] > 100)
      return msg.channel.send("You can only delete 99 messages at a time.");
    msg.channel.bulkDelete(args[1])
    .catch(console.error);
    }
}

module.exports.help = {
  name: "purge"
}