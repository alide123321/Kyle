module.exports.run = async (bot, msg, args) => {

    if (msg.member.hasPermission('ADMINISTRATOR')) {
        if (!args[1])
          return msg.reply("Error please define how many msgs do you want to delete");
        if (args[1] > 100)
          return msg.channel.send("you can only delete 100 messages at a time");
        msg.channel.bulkDelete(args[1]);
    }
}

module.exports.help = {
    name: "clear"
}