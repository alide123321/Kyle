module.exports.run = async (bot, msg, args) => {
  const Discord = require("discord.js");
  const db = require("quick.db");
  var words = new db.table("words");
  let user = msg.mentions.users.first() || msg.author;

  if(user.bot) return msg.channel.send("no");

  let wordarr = words.all(`${user.id}.word_`, { sort: ".data" });
  let pos = null;
  var keys = [];
  var nums = [];
  var send = [];

  for (var i = 0; i <= wordarr.length; ++i) {
    if (wordarr[i].ID === user.id) {
      pos = i;
      i += wordarr.length + 1;
    }
  }

  if (wordarr[pos] === undefined) {
    return msg.channel.send("that user hasnt sent a message yet");
  }

  var wordsarr = wordarr[pos].data;

  for (var k in wordsarr) keys.push(k);

  for (var i = 0; i < keys.length; ++i) {
    nums.push(wordsarr[keys[i]]);
  }

  nums.sort((a, b) => b - a);

  for (var i = 0; i < 5; ++i) {
    for (var n = 0; n < keys.length; ++n) {
      if (nums[i] === wordsarr[keys[n]]) {
        send.push(`${keys[n].slice(5)}: ${nums[i]}`); // prettier-ignore
        keys.splice(n, 1);
      }
    }
  }

  let topwordem = new Discord.MessageEmbed()
    .setTitle("**Top Used Words**")
    .setColor("#0099ff")
    .setThumbnail(user.avatarURL())
    .setDescription(send);
  msg.channel.send(topwordem);
};

module.exports.help = {
  name: "words",
};
