const Discord = require("discord.js");
const Fs = require("fs");
const db = require("quick.db");
var xp = new db.table("xp");
let Xp = 0;
let NXp = 0;
let lvl = 0;

module.exports.run = async (bot, msg, args) => {
  let mentioned = msg.mentions.members.first();
  var allusers = (await msg.guild.members.fetch()).keyArray("id");
  var users = [];
  var usersXp = [];

  if (mentioned) {
    if (!xp.has(`${msg.guild.id}_${mentioned.id}.xp`)) {
      let ErrorEmbed = new Discord.MessageEmbed()
        .setTitle("**ERROR**")
        .setColor(0xff0000)
        .setThumbnail(msg.author.avatarURL())
        .setDescription("That person hasn't sent a message yet.");
      msg.channel.send(ErrorEmbed);
      return;
    }

    for (let x = 0; x <= allusers.length; ++x) {
      if (xp.has(`${msg.guild.id}_${allusers[x]}.xp`)) {
        users.push(allusers[x]);
        usersXp.push(xp.get(`${msg.guild.id}_${allusers[x]}.xp`));
      }
    }

    usersXp.sort((a, b) => a - b);
    usersXp.reverse();

    let Rank = 0;

    for (var i = 0; i < usersXp.length; ++i) {
      for (var n = 0; n < users.length; ++n) {
        if (usersXp[i] === xp.get(`${msg.guild.id}_${users[n]}.xp`)) {
          if (users[n] === mentioned.id) {
            i = usersXp.length;
            ++i;
          }
          ++Rank;
          users.splice(n, 1);
        }
      }
    }
    let nLevel = JSON.parse(Fs.readFileSync("./assets/util/levels.json"));

    lvl = xp.get(`${msg.guild.id}_${mentioned.id}.lvl`);
    Xp = xp.get(`${msg.guild.id}_${mentioned.id}.xp`);
    if (lvl < 100) {
      NXp = nLevel[++lvl];
    } else if (lvl >= 100) {
      NXp = 1899250;
    }

    let SuccessEmbed = new Discord.MessageEmbed()
      .setTitle(`**${mentioned.user.tag}**`)
      .setColor(0xfa1679)
      .setThumbnail(mentioned.user.avatarURL())
      .addFields(
        {
          name: "Xp",
          value: Xp + "/" + NXp,
          inline: true,
        },
        {
          name: "levels",
          value: lvl,
          inline: true,
        },
        {
          name: "Nummber of messages ",
          value: xp.get(`${msg.guild.id}_${mentioned.id}.msgs`),
          inline: true,
        },
        {
          name: "rank",
          value: Rank,
          inline: true,
        }
      );
    msg.channel.send(SuccessEmbed);
    return;
  } else {
    lvl = xp.get(`${msg.guild.id}_${msg.author.id}.lvl`);

    for (let x = 0; x <= allusers.length; ++x) {
      if (xp.has(`${msg.guild.id}_${allusers[x]}.xp`)) {
        users.push(allusers[x]);
        usersXp.push(xp.get(`${msg.guild.id}_${allusers[x]}.xp`));
      }
    }

    usersXp.sort((a, b) => a - b);
    usersXp.reverse();

    let Rank = 0;
    for (var i = 0; i < usersXp.length; ++i) {
      for (var n = 0; n < users.length; ++n) {
        if (usersXp[i] === xp.get(`${msg.guild.id}_${users[n]}.xp`)) {
          if (users[n] === msg.author.id) {
            i = usersXp.length;
            ++i;
          }
          ++Rank;
          users.splice(n, 1);
        }
      }
    }

    let nLevel = JSON.parse(Fs.readFileSync("./assets/util/levels.json"));

    lvl = xp.get(`${msg.guild.id}_${msg.author.id}.lvl`);
    Xp = xp.get(`${msg.guild.id}_${msg.author.id}.xp`);
    if (lvl < 100) {
      NXp = nLevel[++lvl];
    } else if (lvl >= 100) {
      NXp = 1899250;
    }

    let SuccessEmbed = new Discord.MessageEmbed()
      .setTitle(`**${msg.author.tag}**`)
      .setColor(0xfa1679)
      .setThumbnail(msg.author.avatarURL())
      .addFields(
        {
          name: "Xp",
          value: Xp + "/" + NXp,
          inline: true,
        },
        {
          name: "levels",
          value: lvl,
          inline: true,
        },
        {
          name: "Nummber of messages ",
          value: xp.get(`${msg.guild.id}_${msg.author.id}.msgs`),
          inline: true,
        },
        {
          name: "rank",
          value: Rank,
          inline: true,
        }
      );
    msg.channel.send(SuccessEmbed);
    return;
  }
};

module.exports.help = {
  name: "rank",
};
