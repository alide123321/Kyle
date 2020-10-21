const { bot } = require("../../index");
const db = require("quick.db");
var xp = new db.table("xp");
var words = new db.table("words");
const Fs = require("fs");

const cooldown = require("../functions/cool.js").cooldown;
const XpTimeOut = require("../util/xptimeout.js").XpTimeOut;
const sleep = require("../../assets/functions/sleep.js").sleep;
require("dotenv").config();

bot.on("message", async (msg) => {
  if (msg.author.bot) return;

  let args = msg.content.toLowerCase().substring(process.env.PREFIX.length).split(" ");
  let argwords = msg.content.toLocaleLowerCase().split(/\s+/g);
  let text = msg.content.toLowerCase();
  let msgarray = msg.content.split(/\s+/g);
  let command = msgarray[0];

  if (msg.guild === null) {
    if (text.charAt(0) !== process.env.PREFIX)
      msg.author.send(`LOL stupid thats not a command try ${process.env.PREFIX}help`);

    var dmhelp = [
      "**" + process.env.PREFIX + "help__________will bring up this page**",
      "**" + process.env.PREFIX + "report________to report someone/something in the Wonderland server**", //prettier-ignore
      "**" + process.env.PREFIX + "join__________send you a server invite link**",
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

        msg.author.send(help);

        break;
      }

      case "report": {
        if (!args[1]) {
          const embed = new Discord.MessageEmbed()
            .setColor(0xde3333)
            .setTitle("404")
            .setDescription(
              "What do you want to report (only administrators will see your report)"
            );
          msg.author.send(embed);
        } else {
          let msgArgs = args.slice(1).join(" ");

          let Wonderland = bot.channels.cache.get("719454080543490058"); // Wonderland channelReports

          let embed = new Discord.MessageEmbed()
            .setColor(0x71b3f5)
            .setTitle("Report status:")
            .setDescription("Your report has been successfully filed! :upside_down:");
          msg.author.send(embed);

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
          .setURL("https://discord.gg/z4FpxSJ")
          .setThumbnail(
            "https://cdn.discordapp.com/attachments/739019780576641096/739022260857470981/Discord_Rose.png"
          )
          .setFooter("I have diffrent commands if use me inside a server");
        msg.author.send(joinem);

        break;
      }
    }
    return;
  }

  let discordInvite = /(https:\/\/)?(www\.)?(discord\.gg|discord\.me|discordapp\.com\/invite|discord\.com\/invite)\/([a-z0-9-.]+)?/i; //checks for links
  if (discordInvite.test(text) && !msg.member.hasPermission("ADMINISTRATOR")) {
    msg.delete();
    return;
  }

  if (text.includes("kys") || text.includes("i wanna die") || text.includes("kms")) {
    msg.channel.send("https://www.healthscience.org/");
  }

  //xp start

  if (!xp.has(`${msg.guild.id}_${msg.author.id}.msgs`)) {
    xp.set(`${msg.guild.id}_${msg.author.id}.xp`, 0);
    xp.set(`${msg.guild.id}_${msg.author.id}.lvl`, 0);
    xp.set(`${msg.guild.id}_${msg.author.id}.msgs`, 0);
  }
  xp.add(`${msg.guild.id}_${msg.author.id}.msgs`, 1);

  if (!XpTimeOut.has(`${msg.guild.id}_${msg.author.id}`)) {
    let newxp = Math.floor(Math.random() * 25) + 15;
    xp.add(`${msg.guild.id}_${msg.author.id}.xp`, newxp);

    let lvl = xp.get(`${msg.guild.id}_${msg.author.id}.lvl`);
    let NXp = 0;
    let nLevel = JSON.parse(Fs.readFileSync("./assets/util/levels.json"));
    if (lvl >= 100) {
      NXp = 1899250;
    } else {
      NXp = nLevel[lvl + 1];
    }

    if (xp.get(`${msg.guild.id}_${msg.author.id}.xp`) >= NXp && lvl !== 100) {
      xp.add(`${msg.guild.id}_${msg.author.id}.lvl`, 1);
      lvl = xp.get(`${msg.guild.id}_${msg.author.id}.lvl`);

      msg.channel.send(`GG <@${msg.author.id}>, you just advanced to level ${lvl}!`); // prettier-ignore

      //giving roles

      if (lvl === 5) {
        let role = msg.guild.roles.cache.find((r) => r.name === "[5+] Slimes");
        msg.member.roles.add(role).catch(console.error);
      }
      if (lvl === 10) {
        let role = msg.guild.roles.cache.find((r) => r.name === "[10+] Elites");
        msg.member.roles.add(role).catch(console.error);
      }
      if (lvl === 20) {
        let role = msg.guild.roles.cache.find((r) => r.name === "[20+] Warriors"); // prettier-ignore
        msg.member.roles.add(role).catch(console.error);
      }
      if (lvl === 30) {
        let role = msg.guild.roles.cache.find((r) => r.name === "[30+] Kings");
        msg.member.roles.add(role).catch(console.error);
      }
      if (lvl === 50) {
        let role = msg.guild.roles.cache.find((r) => r.name === "[50+] Gods");
        msg.member.roles.add(role).catch(console.error);
      }
    }

    XpTimeOut.add(`${msg.guild.id}_${msg.author.id}`);
    setTimeout(() => {
      XpTimeOut.delete(`${msg.guild.id}_${msg.author.id}`);
    }, 60000);
  }

  //xp end

  //most used word start

  if (!words.has(`${msg.author.id}.sent`)) words.set(`${msg.author.id}.sent`, true);

  for (var n = 0; n < argwords.length; ++n) {
    if (argwords[n].startsWith(process.env.PREFIX))
      argwords[n] = argwords[n].slice(process.env.PREFIX.length);

    if (words.has(`${msg.author.id}.word_${argwords[n]}`)) {
      words.add(`${msg.author.id}.word_${argwords[n]}`, 1);
    } else {
      words.set(`${msg.author.id}.word_${argwords[n]}`, 1);
    }
  }

  //most used word end

  if (msg.guild.id === "599061990828277770" && msg.channel.id === "716206448970825799") {
    //removes !d bump
    if (text.slice(0, 7) == "!d bump") {
      sleep(3000);
      try {
        msg.channel.bulkDelete(2);
      } catch (error) {
        msg.channel.send(`error ${error}`);
      }
    } else if (text.slice(0, 4) == "redo") {
      msg.delete();
      let doneem = new Discord.MessageEmbed()
        .setTitle("**!D BUMP**")
        .setDescription("Help grow the server by using the command **!d bump** - it helps other people find and join the server to grow the fam!"); // prettier-ignore
      msg.channel.send(doneem);
    } else {
      msg.channel.bulkDelete(1);
      return response(1);
    }
  }

  if (!command.startsWith(process.env.PREFIX)) return;

  if (cooldown.has(msg.author.id) && msg.author.id !== "698051518754062387") {
    msg.channel.send("Cooldown 3 sec").then((msge) => {
      msge.delete({ timeout: 5000 });
    });
    return;
  }

  cooldown.add(msg.author.id);
  setTimeout(() => {
    cooldown.delete(msg.author.id);
  }, 3000);

  let cmd = bot.commands.get(command.slice(process.env.PREFIX.length));

  if (cmd) cmd.run(bot, msg, args);
});

module.exports.help = {
  name: "msg",
};
