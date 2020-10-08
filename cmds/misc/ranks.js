const Discord = require("discord.js");
const db = require("quick.db");
var xp = new db.table("xp");

module.exports.run = async (bot, msg, args) => {
  var allusers = (await msg.guild.members.fetch()).keyArray("id");
  var users = [];
  var usersXp = [];

  for (let x = 0; x <= allusers.length; ++x) {
    if (xp.has(`${msg.guild.id}_${allusers[x]}.xp`)) {
      users.push(allusers[x]);
      usersXp.push(xp.get(`${msg.guild.id}_${allusers[x]}.xp`));
    }
  }

  usersXp.sort((a, b) => a - b);
  usersXp.reverse();

  let topranks = new Discord.MessageEmbed()
    .setTitle(`**Top ranks in ${msg.guild.name}**`)
    .setColor("#0099ff");

  for (var i = 0; i < usersXp.length; ++i) {
    for (var n = 0; n < users.length; ++n) {
      if (usersXp[i] === xp.get(`${msg.guild.id}_${users[n]}.xp`)) {
        topranks.addFields({
          name: `${i + 1}) ${
            (await msg.guild.members.fetch(users[n])).displayName
          }`,
          value: `Xp: ${usersXp[i]} \t lvl: ${xp.get(
            `${msg.guild.id}_${users[n]}.lvl`
          )} msgs: ${xp.get(`${msg.guild.id}_${users[n]}.msgs`)}`,
          inline: true,
        });

        users.splice(n, 1);
      }
    }
  }

  msg.author.send(topranks);

  msg.channel.send(`Check your DM's please`);
};

module.exports.help = {
  name: "ranks",
};
