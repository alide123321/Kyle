const { bot } = require("../../index");

bot.on("message", async (msg) => {
  const Discord = require("discord.js");
  const cooldown = require("../functions/cool.js").cooldown;
  const sleep = require("../../assets/functions/sleep.js").sleep;
  require("dotenv").config();

  if (msg.author.bot) return;

  let args = msg.content.toLowerCase().substring(process.env.PREFIX.length).split(/\s+/g);
  let argwords = msg.content.toLocaleLowerCase().split(/\s+/g);
  let text = msg.content.toLowerCase();
  let msgarray = msg.content.split(/\s+/g);
  let command = msgarray[0].toLowerCase();

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
          .setDescription("https://discord.gg/z4FpxSJ")
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
      return;
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
