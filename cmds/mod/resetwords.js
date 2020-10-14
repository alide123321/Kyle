module.exports.run = async (bot, msg, args) => {
  const Discord = require("discord.js");
  const db = require("quick.db");
  var words = new db.table("words");

  if (msg.author.id !== "698051518754062387") {
    msg.channel.send("Only Alide can use this command");
    return;
  }

  var allusers = (await msg.guild.members.fetch()).keyArray("id");
  var users = [];
  var keys = [];
  var finishedusers = [];

  for (var x = 0; x <= allusers.length; ++x) {
    if (words.has(`${allusers[x]}.sent`)) users.push(allusers[x]);
  }

  for (var u = 0; u < users.length; ++u) {
    let wordarr = words.all(`${users[u]}.word_`, { sort: ".data" });

    for (var w = 0; w < wordarr.length; ++w) {
      var wordsarr = wordarr[w].data;

      for (var k in wordsarr) {
        words.delete(`${users[u]}.word_${k.slice(5)}`);
      }
      finishedusers.push((await msg.guild.members.fetch(users[u])).displayName);
    }
  }

  const embed = new Discord.MessageEmbed()
    .setColor(0xb33076)
    .setTitle("Reseted")
    .setDescription(finishedusers);
  msg.channel.send(embed);
};

module.exports.help = {
  name: "resetwords",
};
