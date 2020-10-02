const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public"));
app.listen(5000);

app.get("/", (req, res) => {
  res.send("Hello World! this is \nKyle the bot");
});

app.get(`/ranks`, (req, res) => {
  res.send(`use the .ranks to get the ranks link`);
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

const Discord = require("discord.js");
const { Client, Attachment } = require("discord.js");
const bot = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});
require("dotenv").config();

const sleep = require("./assets/functions/sleep.js").sleep;
let options = {
  total: "channel id",
  users: "channel id",
  bots: "channel id",
};

const token = process.env.TOKEN;
const prefix = process.env.PREFIX;
const version = process.env.VERSION;
const Fs = require("fs");
bot.queue = new Map();

var numofcommands = 0;
bot.commands = new Discord.Collection();

Fs.readdir("./cmds/gamble/", (err, files) => {
  if (err) console.error(err);

  let jsfiles = files.filter((f) => f.split(".").pop() === "js");
  if (jsfiles.length <= 0) {
    console.log("No commands to load in gamble!");
    return;
  }

  jsfiles.forEach((f, i) => {
    let props = require(`./cmds/gamble/${f}`);
    console.log(`${i + 1}: ${f} loaded in gamble!`);
    bot.commands.set(props.help.name, props);
    numofcommands++;
  });
});

Fs.readdir("./cmds/help/", (err, files) => {
  if (err) console.error(err);

  let jsfiles = files.filter((f) => f.split(".").pop() === "js");
  if (jsfiles.length <= 0) {
    console.log("No commands to load in help!");
    return;
  }

  jsfiles.forEach((f, i) => {
    let props = require(`./cmds/help/${f}`);
    console.log(`${i + 1}: ${f} loaded in help!`);
    bot.commands.set(props.help.name, props);
    numofcommands++;
  });
});

Fs.readdir("./cmds/memes/", (err, files) => {
  if (err) console.error(err);

  let jsfiles = files.filter((f) => f.split(".").pop() === "js");
  if (jsfiles.length <= 0) {
    console.log("No commands to load in memes!");
    return;
  }

  jsfiles.forEach((f, i) => {
    let props = require(`./cmds/memes/${f}`);
    console.log(`${i + 1}: ${f} loaded in memes!`);
    bot.commands.set(props.help.name, props);
    numofcommands++;
  });
});

Fs.readdir("./cmds/mod/", (err, files) => {
  if (err) console.error(err);

  let jsfiles = files.filter((f) => f.split(".").pop() === "js");
  if (jsfiles.length <= 0) {
    console.log("No commands to load in mod!");
    return;
  }

  jsfiles.forEach((f, i) => {
    let props = require(`./cmds/mod/${f}`);
    console.log(`${i + 1}: ${f} loaded in mod!`);
    bot.commands.set(props.help.name, props);
    numofcommands++;
  });
});

Fs.readdir("./cmds/money/", (err, files) => {
  if (err) console.error(err);

  let jsfiles = files.filter((f) => f.split(".").pop() === "js");
  if (jsfiles.length <= 0) {
    console.log("No commands to load in money!");
    return;
  }

  jsfiles.forEach((f, i) => {
    let props = require(`./cmds/money/${f}`);
    console.log(`${i + 1}: ${f} loaded in money!`);
    bot.commands.set(props.help.name, props);
    numofcommands++;
  });
});

Fs.readdir("./cmds/music/", (err, files) => {
  if (err) console.error(err);

  let jsfiles = files.filter((f) => f.split(".").pop() === "js");
  if (jsfiles.length <= 0) {
    console.log("No commands to load in music!");
    return;
  }

  jsfiles.forEach((f, i) => {
    let props = require(`./cmds/music/${f}`);
    console.log(`${i + 1}: ${f} loaded in music!`);
    bot.commands.set(props.help.name, props);
    numofcommands++;
  });
});

Fs.readdir("./cmds/vc/", (err, files) => {
  if (err) console.error(err);

  let jsfiles = files.filter((f) => f.split(".").pop() === "js");
  if (jsfiles.length <= 0) {
    console.log("No commands to load in vc!");
    return;
  }

  jsfiles.forEach((f, i) => {
    let props = require(`./cmds/vc/${f}`);
    console.log(`${i + 1}: ${f} loaded in vc!`);
    bot.commands.set(props.help.name, props);
    numofcommands++;
  });
});

bot.once("ready", () => {
  console.log("Ready!");
  console.log("prefix:" + prefix);
  console.log("version:" + version);
  console.log("Number of Commands:" + numofcommands);
  console.log("______________________");
  bot.user.setActivity("Im also mod mail DM me");
});

bot.on("guildMemberAdd", (member) => {
  if (member.guild.id === "599061990828277770") {
    serverstats(member);
    member.guild.channels.cache
      .get("716939268504813578")
      .send(
        "Welcome to " +
          member.guild.name +
          ", <@" +
          member.user.id +
          ">! To get started, visit <#709238410732240906> and react then go on to <#716212510398873651>. Enjoy your stay! <:goodnight:716209532233318472> <:cheemspray:716217215275237427>"
      );
  }
});

bot.on("guildMemberRemove", (member) => {
  if (member.guild.id === "599061990828277770") {
    serverstats(member);
  }
});

bot.on("messageReactionAdd", async (reaction, user) => {
  if (!user || user.bot || !reaction.message.channel.guild) return;

  if (reaction.message.channel.id === "709238410732240906")
    await reaction.message.guild.members.cache
      .get(user.id)
      .roles.add("716092067243098174");

  if (reaction.message.channel.id === "740809935247507566") {
    if (reaction.emoji.name === "movie_night")
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.add("740828341069676594");

    if (reaction.emoji.name === "game_night")
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.add("740828344794349658");

    if (reaction.emoji.name === "pc")
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.add("740828981179318343");

    if (reaction.emoji.name === "ps")
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.add("740828983071080470");

    if (reaction.emoji.name === "xbox")
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.add("740828984660590672");
  }
});

bot.on("messageReactionRemove", async (reaction, user) => {
  if (!user || user.bot || !reaction.message.channel.guild) return;

  if (reaction.message.channel.id === "709238410732240906")
    await reaction.message.guild.members.cache
      .get(user.id)
      .roles.remove("716092067243098174");

  if (reaction.message.channel.id === "740809935247507566") {
    if (reaction.emoji.name === "movie_night")
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.remove("740828341069676594");

    if (reaction.emoji.name === "game_night")
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.remove("740828344794349658");

    if (reaction.emoji.name === "pc")
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.remove("740828981179318343");

    if (reaction.emoji.name === "ps")
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.remove("740828983071080470");

    if (reaction.emoji.name === "xbox")
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.remove("740828984660590672");
  }
});

var temporary = []; // private vc
var temporaryw = []; // private vc waitting room

bot.on("voiceStateUpdate", async (oldState, newState) => {
  if (newState.channelID === "746447827055673434") {
    newState.guild.channels
      .create(newState.member.user.username + " [private room] ", {
        type: "voice",
        parent: "707452089453903943",
      })
      .then((vc) => {
        vc.overwritePermissions([
          {
            id: newState.id,
            allow: ["MOVE_MEMBERS"],
          },
          {
            id: newState.id,
            allow: ["CONNECT"],
          },
          {
            id: "599061990828277770",
            deny: ["CONNECT"],
          },
        ]);

        newState.setChannel(vc);
        temporary.push(vc);
      });

    newState.guild.channels
      .create(newState.member.user.username + " [waiting room] ", {
        type: "voice",
        parent: "707452089453903943",
      })
      .then((vc) => {
        vc.overwritePermissions([
          {
            id: newState.id,
            allow: ["MOVE_MEMBERS"],
          },
          {
            id: "599061990828277770",
            deny: ["SPEAK"],
          },
          {
            id: "599061990828277770",
            allow: ["CONNECT"],
          },
          {
            id: newState.id,
            allow: ["CONNECT"],
          },
        ]);
        temporaryw.push(vc);
      });
  }

  if (temporary.length > 0) {
    for (let i = 0; i < temporary.length; i++) {
      let ch = temporary[i];
      let chw = temporaryw[i];

      if (ch.members.size <= 0) {
        await ch.delete();
        await chw.delete();

        temporary.splice(i, 1);
        temporaryw.splice(i, 1);
        return;
      }
    }
  }
});

const db = require("quick.db");
var xp = new db.table("xp");
const XpTimeOut = require("./assets/functions/xptimeout.js").XpTimeOut;

const cooldown = require("./assets/functions/cool.js").cooldown;
bot.on("message", async (msg) => {
  if (msg.author.bot) return;

  let args = msg.content.substring(prefix.length).split(" ");
  let text = msg.content.toLowerCase();
  let msgarray = msg.content.split(/\s+/g);
  let command = msgarray[0];

  if (msg.guild === null) {
    let sender = msg.author;

    if (text.charAt(0) !== ".")
      sender.send("LOL stupid thats not a command try .help");

    var dmhelp = [
      "**" + prefix + "help__________will bring up this page**",
      "**" +
        prefix +
        "report________to report someone/something in the Wonderland server**",
      "**" + prefix + "join__________send you a server invite link**",
    ];

    switch (args[0]) {
      case "help": {
        let help = new Discord.MessageEmbed()
          .setColor(0x0099ff)
          .setTitle("All the commands")
          .setURL("https://discord.gg/gBQc5cm")
          .setThumbnail(
            "https://cdn.discordapp.com/attachments/739019780576641096/739022260857470981/Discord_Rose.png"
          )
          .setDescription(dmhelp)
          .setFooter("I have diffrent commands if use me inside a server");

        sender.send(help);

        break;
      }

      case "report": {
        let Sender = msg.author;

        if (!args[1]) {
          const embed = new Discord.MessageEmbed()
            .setColor(0xde3333)
            .setTitle("404")
            .setDescription(
              "What do you want to report (only administrators will see your report)"
            );
          Sender.send(embed);
        } else {
          let msgArgs = args.slice(1).join(" ");

          let Wonderland = bot.channels.cache.get("719454080543490058"); // Wonderland channelReports

          let embed = new Discord.MessageEmbed()
            .setColor(0x71b3f5)
            .setTitle("Report status:")
            .setDescription(
              "Your report has been successfully filed! :upside_down:"
            );
          Sender.send(embed);

          let reportData = new Discord.MessageEmbed()
            .setColor(0x71b3f5)
            .setTitle(msg.author.username + "'s Report:")
            .setDescription(msgArgs)
            .setFooter("at: " + msg.createdAt);

          Wonderland.send(reportData);
        }
        break;
      }

      case "join": {
        let joinem = new Discord.MessageEmbed()
          .setColor(0x0099ff)
          .setTitle("Click Here to join back")
          .setURL("https://discord.gg/gBQc5cm")
          .setThumbnail(
            "https://cdn.discordapp.com/attachments/739019780576641096/739022260857470981/Discord_Rose.png"
          )
          .setFooter("I have diffrent commands if use me inside a server");
        sender.send(joinem);

        break;
      }
    }
    return;
  }

  //xp

  if (!xp.has(`${msg.author.id}.msgs`)) {
    xp.set(`${msg.author.id}.xp`, 0);
    xp.set(`${msg.author.id}.lvl`, 0);
    xp.set(`${msg.author.id}.msgs`, 0);
  }

  xp.add(`${msg.author.id}.msgs`, 1);

  if (!(XpTimeOut.has(msg.author.id))) {

    let newxp = Math.floor(Math.random() * 26) + 15;
    xp.add(`${msg.author.id}.xp`, newxp);

    let TXp;
    let lvl = xp.get(`${msg.author.id}.lvl`);
    if (lvl === 0) {
      TXp = (xp.get(`${msg.author.id}.xp`));
    } else {
      TXp = (xp.get(`${msg.author.id}.xp`)) + (5 * (lvl * lvl) + 50 * lvl + 100);
    }
    let NXp = (5 * ((lvl + 1) * (lvl + 1)) + 50 * (lvl + 1) + 100);

    if (TXp > NXp) {
      xp.add(`${msg.author.id}.lvl`, 1);
      xp.subtract(`${msg.author.id}.xp`, (xp.get(`${msg.author.id}.xp`)));
      msg.channel.send(
        `GG <@${msg.author.id}>, you just advanced to level ${lvl + 1}!`
      );
    }

    XpTimeOut.add(msg.author.id);
    setTimeout(() => {
      XpTimeOut.delete(msg.author.id);
    }, 60000);
  }

  

  //xp
  if (text.includes("hello")) {
    msg.channel.send("my name is Jeff");
  }

  if (msg.guild.id === "599061990828277770") {
    if (msg.channel.id === "716206448970825799") {
      if (text.slice(0, 7) == "!d bump") {
        sleep(3000);
        msg.channel.bulkDelete(2);
      } else if (text.slice(0, 4) == "redo") {
        msg.delete();
        let doneem = new Discord.MessageEmbed()
          .setTitle("**!D BUMP**")
          .setDescription(
            "Help grow the server by using the command **!d bump** - it helps other people find and join the server to grow the fam!"
          );
        msg.channel.send(doneem);
      } else {
        msg.channel.bulkDelete(1);
        return;
      }
    }
  }

  if (!command.startsWith(prefix)) return;

  if (cooldown.has(msg.author.id) && msg.author.id !== "698051518754062387") {
    msg.channel.send("Cooldown 2 sec").then((msge) => {
      msge.delete({ timeout: 5000 });
    });
    return;
  }

  cooldown.add(msg.author.id);
  setTimeout(() => {
    cooldown.delete(msg.author.id);
  }, 2000);

  let cmd = bot.commands.get(command.slice(prefix.length));

  if (cmd) cmd.run(bot, msg, args);
});

function serverstats(member) {
  sleep(2000);
  member.guild.channels.cache
    .get("715444945602740244")
    .setName(`Total Members: ${member.guild.memberCount}`);
  member.guild.channels.cache
    .get("715444948568244305")
    .setName(
      `Users: ${
        member.guild.memberCount -
        member.guild.members.cache.filter((m) => m.user.bot).size
      }`
    );
  member.guild.channels.cache
    .get("715444951332290591")
    .setName(
      `Bots: ${member.guild.members.cache.filter((m) => m.user.bot).size}`
    );
}

/*
case "react": {
      let react = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle("**React to get your role**")
        .setURL("https://discord.gg/e5Pucbh")
        .setThumbnail('https://cdn.discordapp.com/attachments/739019780576641096/739022260857470981/Discord_Rose.png')
        .addFields(
          {name: "**Events**", value: "Movie night: <:movie_night:740837473965572196>\nGame night: <:game_night:740895921969299516>", inline: true},
          {name: "**Platforms**", value: "PC: <:pc:740896282603683903>\nPS: <:ps:740822774712500285>\nXbox: <:xbox:740823180825985066>", inline: true}
        )
        let chan = bot.channels.cache.get('740809935247507566')
        chan.send(react).then(sentEmbed => {
          sentEmbed.react('740837473965572196')
          sentEmbed.react('740895921969299516')
          sentEmbed.react('740896282603683903')
          sentEmbed.react('740822774712500285')
          sentEmbed.react('740823180825985066')
        })
      break;}
*/

/*bot.on('messageDelete', msg =>
{
    let embed = new Discord.MessageEmbed()
                .setTitle("A message was deleted here.")
                .addField("Message created at:",msg.createdAt)
                .setColor(0Xb05c4d)
            msg.channel.send(embed);
})
*/
bot.login(token); // turn bot online
