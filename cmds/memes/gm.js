module.exports.run = async (bot, msg, args) => {
    let mentioned = msg.mentions.members.first();
      if(!mentioned)
        msg.channel.send("https://cdn.discordapp.com/attachments/716215392921452554/752216254315757669/video0.mov")
      if(mentioned){
        mentioned.send("**"+msg.author.username+" Says Good Morning**")
        mentioned.send("https://cdn.discordapp.com/attachments/716215392921452554/752216254315757669/video0.mov")
        msg.channel.send("Sent "+mentioned.user.username+" a Good Morning msg");
      }
}

module.exports.help = {
    name: "gm"
}