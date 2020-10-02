const Discord = require("discord.js");
const db = require("quick.db");
var xp = new db.table("xp");
let TXp = 0;
let NXp = 0;

module.exports.run = async (bot, msg, args) => {
  let mentioned = msg.mentions.members.first();
  var allusers = (await msg.guild.members.fetch()).keyArray("id");
  var users = [];
  var usersXp = [];

  if (mentioned) {
    if (!xp.has(`${mentioned.id}.xp`)) {
      let ErrorEmbed = new Discord.MessageEmbed()
        .setTitle("**ERROR**")
        .setColor(0xff0000)
        .setThumbnail(msg.author.avatarURL())
        .setDescription("That person hasn't sent a message yet.");
      msg.channel.send(ErrorEmbed);
      return;
    }
    let lvl = xp.get(`${mentioned.id}.lvl`);

    for (var i = 0; i <= lvl; ++i) {
      NXp = NXp + (5 * (i * i) + 50 * i + 100);
    }
    if (lvl === 0) {
      NXp = 100;
    }

    for (let x = 0; x <= allusers.length; ++x) {
      if (xp.has(`${allusers[x]}.xp`)) {
        users.push(allusers[x]);
      }
    }

    for (let x = 0; x < users.length; ++x) {
      usersXp.push(FTXP(users[x]));
    }

    usersXp.sort((a, b) => a - b);
    usersXp.reverse();

    let Rank = 0;

    for (var i = 0; i < usersXp.length; ++i) {
      for (var n = 0; n < users.length; ++n) {
        if (usersXp[i] === FTXP(users[n])) {
          if (users[n] === mentioned.id) {
            i = usersXp.length;
            ++i;
          }
          ++Rank;
          users.splice(n, 1);
        }
      }
    }

    TXp = FTXP(mentioned.id);

    let SuccessEmbed = new Discord.MessageEmbed()
      .setTitle(`**${mentioned.user.tag}**`)
      .setColor(0xfa1679)
      .setThumbnail(mentioned.user.avatarURL())
      .addFields(
        {
          name: "Xp",
          value: TXp + "/" + NXp,
          inline: true,
        },
        {
          name: "levels",
          value: lvl,
          inline: true,
        },
        {
          name: "Nummber of messages ",
          value: xp.get(`${mentioned.id}.msgs`),
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
    let lvl = xp.get(`${msg.author.id}.lvl`);

    for (var i = 0; i <= lvl; ++i) {
      NXp = NXp + (5 * (i * i) + 50 * i + 100);
    }
    for (let x = 0; x <= allusers.length; ++x) {
      if (xp.has(`${allusers[x]}.xp`)) {
        users.push(allusers[x]);
      }
    }
    for (let x = 0; x < users.length; ++x) {
      usersXp.push(FTXP(users[x]));
    }
    usersXp.sort((a, b) => a - b);
    usersXp.reverse();

    let Rank = 0;
    for (var i = 0; i < usersXp.length; ++i) {
      for (var n = 0; n < users.length; ++n) {
        if (usersXp[i] === FTXP(users[n])) {
          if (users[n] === msg.author.id) {
            i = usersXp.length;
            ++i;
          }
          ++Rank;
          users.splice(n, 1);
        }
      }
    }
    TXp = FTXP(msg.author.id);
    let SuccessEmbed = new Discord.MessageEmbed()
      .setTitle(`**${msg.author.tag}**`)
      .setColor(0xfa1679)
      .setThumbnail(msg.author.avatarURL())
      .addFields(
        {
          name: "Xp",
          value: TXp + "/" + NXp,
          inline: true,
        },
        {
          name: "levels",
          value: lvl,
          inline: true,
        },
        {
          name: "Nummber of messages ",
          value: xp.get(`${msg.author.id}.msgs`),
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
  console.log("7");
};

function FTXP(uid) {
  let lvl = xp.get(`${uid}.lvl`);
  if (lvl === 0) {
    TXp = xp.get(`${uid}.xp`);
  } else {
    TXp = xp.get(`${uid}.xp`) + (5 * (lvl * lvl) + 50 * lvl + 100);
  }
  return TXp;
}

module.exports.help = {
  name: "rank",
};
