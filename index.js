const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/', (req, res) => res.send('Chad the bot'));
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));



const Discord = require("discord.js");
const {Client, Attachment} = require("discord.js");
const bot = new Discord.Client();
const fetch = require("node-fetch");
const fs = require("fs");
const ytdl = require("ytdl-core");
var opusscript = require("opusscript");
require('dotenv').config();

const token = process.env.TOKEN;
const prefix = '.';
const version = "1.0.5";
const helplink = "https://sites.google.com/view/chadthebot/home";
const auther = "alide123321#9518";
const queue = new Map();
var help = [
  "*" + prefix + "website_______Do you to check put our website?*",
  "*" + prefix + "memes_________for the best memes*",
  "*" + prefix + "spam__________will spam whatever you tell it to 5X*",
  "*" + prefix + "info__________more information about the bot*",
  "*" + prefix + "Report________to report anything related to this server*",
  "*" + prefix + "shhdm<@><msg>_Send a anonymous message to someone*",
  "*" + prefix + "oof___________to show the oof*", 
  "*" + prefix + "emilie________STFU emilie*",
  "*" + prefix + "okok__________PopSmoke's OK OK*",
  "*" + prefix + "Simp__________Simp bucks*",
  "*" + prefix + "haram_________Haram*",
  "*" + prefix + "blue__________Scary blue*",
  "*" + prefix + "our___________Our stuff*",
  "*" + prefix + "woo___________Woo back*"
];



bot.once("ready", () => {
  console.log("Ready!");
  console.log("prefix:" + prefix);
  bot.user.setActivity(" "+prefix+"Help");
});


bot.on("message", msg => {

  if (msg.author.bot || !msg.content.startsWith(prefix)) return; // Ignore the message if it's from a bot or doesn't start with the prefix.

  let args = msg.content.substring(prefix.length).split(" ");
  let text = msg.content;

  let serverID = msg.guild.id;

  let SWonderland = '599061990828277770'; // Wonderland server ID
  if (serverID == SWonderland && msg.channel.id == "715457095406714931"){

    if (msg.author.bot) return;

    let Wonderland = bot.channels.cache.get('730388529171136522');
      
    let ok = new Discord.MessageEmbed()
      .setColor(0x008000)
      .setTitle("Thank You!\n your message was sent")
    msg.channel.send(ok);

    let sugData = new Discord.MessageEmbed()
      .setColor(0x008000)
      .setTitle(msg.author.username + "'s suggestion:")
      .setDescription(text)
      .setFooter("at: " + msg.createdAt)
    Wonderland.send(sugData);

    msg.channel.bulkDelete(99);
    
  }



  switch (args[0]) {


    case "help": {
      let embed = new Discord.MessageEmbed()
        .setTitle("All the commands")
        .addField(
          "Check out the commands on our website \n" +
            helplink +
            "\n some off our commands are",
          help
        )
        .setColor(0x5dade2);
      msg.channel.send(embed);
      break;
    }

    case "ping": {
      msg.channel.send("Im alive");
      break;
    }

    case "memes": {
      fetch("https://meme-api.herokuapp.com/gimme")
        .then(res => res.json())
        .then(json => {
          let embed = new Discord.MessageEmbed()
            .setTitle(json.title)
            .setImage(json.url)
            .setFooter("Link: " + json.postLink + " | Subreddit : " + json.subreddit +"\nfor better memes follow @saudinigga123 on isntagram");
          msg.channel.send(embed);
        });
      break;
    }

    case "spam": {
      if (text.includes("@")) {
        msg.channel.send("no!");
        break;
      }
      for (var i = 0; i !== 5; ++i) msg.reply(" said: " + text.slice(5) + " ");
      break;
    }

    case "info": {
      if (args[1] === "version") msg.channel.send("version: " + version);
      if (args[1] === "auther") msg.channel.send("auther: " + auther);
      if (args[1] !== "version" && args[1] !== "auther") {
        msg.channel.send("What do you want more information about?");
        msg.channel.send("*" + prefix + "info version*");
        msg.channel.send("*" + prefix + "info auther*");
      }
      break;
    }

    case "clear": {
      if (msg.member.roles.cache.find(r => r.name === "Cleaner")) {
        if (!args[1])
          return msg.reply(
            "Error please define how many msgs do you want to delete"
          );
        if (args[1] > 100)
          return msg.channel.send("you can only delete 100 messages at a time");
        msg.channel.bulkDelete(args[1]);
        break;
      }
      if (msg.member.roles.cache.find(r => r.name !== "Cleaner"))
        msg.channel.send(
          "sorry you dont have the correct role to exacute the command"
        );
    break;}

    case "website": {
      msg.channel.send(helplink);
    break;}

    case "report": {
      if(!args[1]) {
          const embed = new Discord.MessageEmbed()
          .setColor(0xde3333)
          .setTitle('404')
          .setDescription('What do you want to report (only administrators will see your report)')
          msg.channel.send(embed)
      }else {
          let msgArgs = args.slice(1).join(" ");

          let SEgerms = '701088567971152043'; // Egerms server ID
          let Egerms = bot.channels.cache.get('719159607377002497'); // Egerms channelReports

          let Wonderland = bot.channels.cache.get('719454080543490058'); // Wonderland channelReports


          let embed = new Discord.MessageEmbed()
          .setColor(0X71b3f5)
          .setTitle('Report status:')
          .setDescription('Your report has been successfully filed! :upside_down:')
          msg.channel.send(embed);
          

          let reportData = new Discord.MessageEmbed()
          .setColor(0X71b3f5)
          .setTitle(msg.author.username + '\'s Report:')
          .setDescription(msgArgs)
          .setFooter("at: "+msg.createdAt)

          if(serverID == SEgerms){
              Egerms.send(reportData);
          }

          if(serverID == SWonderland)
              Wonderland.send(reportData);
          
          if(serverID !== SWonderland && serverID !== SEgerms)
              msg.channel.send("Reporting isnt setup on this server")
          
      }
    break;}

    case "shhdm": {
      var count = 1;
      let mention = msg.mentions.users.first();

  

      const embed = new Discord.MessageEmbed()
          .setColor(0xFFFF00)
          .setTitle("Anonymous Message")
          .setDescription(text.slice(6))
          mention.send(embed)

      msg.channel.bulkDelete(count);
      count = 1;
    break;}


    case "oof": {

      num= 3;
      imageNum = Math.floor(Math.random() * (num - 1 + 1)) + 1;
      msg.channel.send ({files: ["./images/oof" + imageNum + ".jpg"]})
    break;}

    case "emilie": {
      msg.channel.send("https://cdn.discordapp.com/attachments/599061991281131531/736649467045871616/emiliestfu.gif");
    break;}

    case "okok": {
      msg.channel.send("https://cdn.discordapp.com/attachments/608295365384339457/737059292930375780/video0.mov");
    break;}

    case "simp": {
      msg.channel.send("https://cdn.discordapp.com/attachments/707451317626470455/737305776468656258/image0.jpg");
    break;}

    case "haram": {
      msg.channel.send("https://cdn.discordapp.com/attachments/599061991281131531/737255123121733652/haram.mp4");
    break;}

    case "our": {
      msg.channel.send("https://cdn.discordapp.com/attachments/707451317626470455/737306931290570802/Our.png")
      break;}

    case "blue": {
      msg.channel.send("https://cdn.discordapp.com/attachments/707451317626470455/737791880355381308/blue.jpg");
    break;}

    case "woo": {
      msg.channel.send("https://cdn.discordapp.com/attachments/737775095828709508/738086389358264391/woo.gif");
    break;}
  }
});


function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}


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
