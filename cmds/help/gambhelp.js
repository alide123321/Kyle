module.exports.run = async (bot, msg, args) => {
  const Discord = require("discord.js");
  const Fs = require("fs");
  bot.commands = new Discord.Collection();
  const prefix = '.';
  
  const helplink = "https://sites.google.com/view/kyle-bot/home";

  msg.channel.send("sry this makes the bot go brrrrr so u cant use this command for now")
  return;

  var gambhelp = [];


  Fs.readdir("./cmds/gamble/", (err,files) => {
    if(err) console.error(err);
    
      let jsfiles = files.filter(f => f.split(".").pop() === "js");
    
      jsfiles.forEach((f,i) => {
        let cmdname = f;
        cmdname = cmdname.slice(0,(cmdname.length-3))
        gambhelp.push(`**${prefix}${cmdname}**`)
      });

    let gamhelp = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle("**Gambling commands**")
      .setURL(helplink)
      .setThumbnail('https://cdn.discordapp.com/attachments/739019780576641096/739022260857470981/Discord_Rose.png')
      .addFields(
        {name: "Check out the commands on our website", value: helplink}, 
        {name: "**Gambling  commands**", value: gambhelp}
      )
    msg.channel.send(gamhelp);
    });

    
}

module.exports.help = {
    name: "gambhelp"
}