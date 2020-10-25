module.exports.run = async (bot, msg, args) => {
  const Discord = require("discord.js");
  const db = require("quick.db");
  var words = new db.table("words");
  let user = msg.mentions.users.first() || msg.author;

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

  let topwordem = new Discord.MessageEmbed()
    .setTitle("**all the words you said**")
    .setColor("#0099ff")
    .setThumbnail(user.avatarURL());

  for (var i = 0; i < nums.length; ++i) {
    for (var n = 0; n < keys.length; ++n) {
      if (nums[i] === wordsarr[keys[n]]) {
        topwordem.addFields({
          name: `${i + 1}) ${(await msg.guild.members.fetch(users[n])).displayName}`,
          value: nums[i],
        });
        keys.splice(n, 1);
      }
    }
  }

  msg.channel.send("Check your DM'S");

  msg.author.send(topwordem);
};

module.exports.help = {
  name: "allwords",
};
