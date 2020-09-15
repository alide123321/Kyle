module.exports.run = async (bot, msg, args) => {
  const queue = require('../../functions/queue.js').queue;
  const plays = require('../../functions/plays.js').plays;
  const serverQueue = queue.get(msg.guild.id);

}

module.exports.help = {
    name: "skip"
}