module.exports.run = async (bot, msg, args) => {
  const queue = require('../../functions/queue.js').queue;
  const serverQueue = queue.get(msg.guild.id);
  
  for(var i = 0; i < serverQueue.songs.length; ++i )
  msg.channel.send("```"+serverQueue.songs[i]+"```")
}

module.exports.help = {
  name: "queue"
}