module.exports.run = async (bot, msg, args) => {
  const Discord = require("discord.js");
  const db = require("quick.db");
  var xp = new db.table("xp");

  if (msg.author.id !== "698051518754062387") {
    msg.channel.send("Only Alide can use this command");
    return;
  }

  var allusers = (await msg.guild.members.fetch()).keyArray("id");
  var users = [];

  for (let x = 0; x <= allusers.length; ++x) {
    if (xp.has(`${allusers[x]}.xp`)) {
      xp.delete(`${allusers[x]}.xp`);
      xp.delete(`${allusers[x]}.lvl`);
      xp.delete(`${allusers[x]}.msgs`);
      users.push((await msg.guild.members.fetch(allusers[x])).displayName);
    }
  }

  const embed = new Discord.MessageEmbed()
    .setColor(0xb33076)
    .setTitle("Reseted")
    .setDescription(users);
  msg.channel.send(embed);
};

module.exports.help = {
  name: "resetxp",
};
