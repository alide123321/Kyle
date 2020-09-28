module.exports.run = async (bot, msg, args) => {
  if (msg.member.hasPermission("ADMINISTRATOR")) {
    if (!args[1])
      return msg.reply(
        "Error: please define how many messages do you want to delete."
      );
    if (isNaN(args[1]))
      return msg.reply(
        "Error: please define how many messages do you want to delete."
      );

    if (args[1] < 1)
      return msg.channel.send("Error: please chose a number between 1 and 99");

    args[1]++;

    if (args[1] > 100)
      return msg.channel.send("You can only delete 99 messages at a time.");
    msg.channel.bulkDelete(args[1]).catch(console.error);
  } else {
    return msg.reply("Error: You dont have administrator perms.");
  }
};

module.exports.help = {
  name: "purge",
};
