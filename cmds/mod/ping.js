module.exports.run = async (bot, msg, args) => {
    msg.channel.send("Im alive");
}

module.exports.help = {
    name: "ping"
}