module.exports.run = async (bot, msg, args) => {
  const db = require("quick.db");
  var words = new db.table("words");
  let user = msg.author;
  let mention = msg.mentions.users.first();

  if (mention) {
    if (msg.author.id === "698051518754062387") {
      user = mention;
    } else {
      return msg.channel.send(`only ${process.env.ALIDE} can reset other people`);
    }
  }

  if (!words.has(`${user.id}.sent`)) return msg.channel.send("that user hasnt sent a message yet");

  words.set(`${user.id}.sent`, false);

  let wordarr = words.all(`${user.id}.word_`, { sort: ".data" });
  let pos = null;

  for (var i = 0; i <= wordarr.length; ++i) {
    if (wordarr[i].ID === user.id) {
      pos = i;
      i += wordarr.length + 1;
    }
  }

  var wordsarr = wordarr[pos].data;

  for (var k in wordsarr) words.delete(`${user.id}.word_${k.slice(5)}`);

  msg.channel.send("done.");
};

module.exports.help = {
  name: "resetwords",
};
