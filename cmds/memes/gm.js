module.exports.run = async (bot, msg, args) => {
  let mentioned = msg.mentions.members.first();
    if(!mentioned)
      msg.channel.send("https://cdn.discordapp.com/attachments/599061991281131531/757130408251883571/videoplayback.mp4")
    if(mentioned){
      mentioned.send("**"+msg.author.username+" Says Good Morning**")
      mentioned.send("https://cdn.discordapp.com/attachments/599061991281131531/757130408251883571/videoplayback.mp4")
      msg.channel.send("Sent "+mentioned.user.username+" a Good Morning msg");
    }
}

module.exports.help = {
  name: "gm"
}