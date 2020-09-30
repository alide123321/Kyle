module.exports.run = async (bot, msg, args) => {
  const Discord = require("discord.js");
  const Fs = require("fs");
  const prefix = process.env.PREFIX;

  const helplink = "https://sites.google.com/view/kyle-bot/home";

  var moneyhelp = [];

  Fs.readdir("./cmds/money/", (err, files) => {
    if (err) console.error(err);

    let jsfiles = files.filter((f) => f.split(".").pop() === "js");

    jsfiles.forEach((f, i) => {
      let cmdname = f;
      cmdname = cmdname.slice(0, cmdname.length - 3);
      moneyhelp.push(`**${prefix}${cmdname}**`);
    });

    let balhelp = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("**BalCommands**")
      .setURL(helplink)
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/739019780576641096/739022260857470981/Discord_Rose.png"
      )
      .addFields(
        { name: "Check out the commands on our website", value: helplink },
        { name: "**Money Commands**", value: moneyhelp }
      );
    msg.channel.send(balhelp);
  });
};

module.exports.help = {
  name: "moneyhelp",
};
