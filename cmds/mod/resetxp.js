module.exports.run = async (bot, msg, args) => {
  const Discord = require("discord.js");
  const db = require("quick.db");
  var xp = new db.table("xp");

  if (msg.author.id !== "698051518754062387") {
    msg.channel.send("Only Alide can use this command");
    return;
  }

  var allusers = (await msg.guild.members.fetch()).keyArray("id");
  var send = [];

  for (let x = 0; x <= allusers.length; ++x) {
    if (xp.get(`${allusers[x]}.xp`)) {
      xp.subtract(`${allusers[x]}.xp`, xp.get(`${allusers[x]}.xp`));
      xp.subtract(`${allusers[x]}.lvl`, xp.get(`${allusers[x]}.lvl`));
      xp.subtract(`${allusers[x]}.msgs`, xp.get(`${allusers[x]}.msgs`));
      send.push((await msg.guild.members.fetch(allusers[x])).displayName);
    }
  }

  let resetem = new Discord.MessageEmbed()
    .setTitle("**Reseted Users**")
    .setColor("#0099ff")
    .setDescription(send);
  msg.channel.send(resetem);
};

module.exports.help = {
  name: "resetxp",
};
