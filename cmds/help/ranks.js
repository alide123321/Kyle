const Discord = require("discord.js");
const db = require("quick.db");
var xp = new db.table("xp");
let TXp;

const express = require("express");
const app = express();
app.use(express.static("public"));
app.listen(5000, () =>
  console.log(`Example app listening at http://localhost:${5000}`)
);

const fs = require("fs");

module.exports.run = async (bot, msg, args) => {
  var allusers = (await msg.guild.members.fetch()).keyArray("id");
  var users = [];
  var usersXp = [];
  var sendarr = [];

  for (let x = 0; x <= allusers.length; ++x) {
    if (xp.has(`${allusers[x]}.xp`)) {
      users.push(allusers[x]);
    }
  }

  for (let x = 0; x < users.length; ++x) {
    let lvl = xp.get(`${users[x]}.lvl`);
    if (lvl === 0) {
      TXp = xp.get(`${users[x]}.xp`);
    } else {
      TXp = xp.get(`${users[x]}.xp`) + (5 * (lvl * lvl) + 50 * lvl + 100);
    }
    usersXp.push(TXp);
  }

  usersXp.sort((a, b) => a - b);
  usersXp.reverse();

  for (var i = 0; i < usersXp.length; ++i) {
    for (var n = 0; n < users.length; ++n) {
      if (usersXp[i] === TXP(users[n])) {
        sendarr.push(
          `${i + 1}) ` +
            (await msg.guild.members.fetch(users[n])).displayName +
            "..." +
            usersXp[i] +
            " lvl:" +
            xp.get(`${users[n]}.lvl`)
        );
        users.splice(n, 1);
      }
    }
  }

  let topranks = new Discord.MessageEmbed()
    .setTitle(`**Top ranks in ${msg.guild.name}**`)
    .setColor("#0099ff")
    .setDescription(sendarr);

  msg.author.send(topranks);

  msg.channel.send(`Check your DM's please`);
};

function TXP(uid) {
  let lvl = xp.get(`${uid}.lvl`);
  if (lvl === 0) {
    TXp = xp.get(`${uid}.xp`);
  } else {
    TXp = xp.get(`${uid}.xp`) + (5 * (lvl * lvl) + 50 * lvl + 100);
  }
  return TXp;
}

module.exports.help = {
  name: "ranks",
};
