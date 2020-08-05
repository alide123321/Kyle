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
var opusscript = require("opusscript");
require('dotenv').config();

const talkedRecently = new Set();

const moment = require("moment");
const Console = console;
let options = {
    total: "channel id",
    users: "channel id",
    bots: "channel id"
};

const token = process.env.TOKEN;
const prefix = '.';
const version = "1.0.5";
const helplink = "https://sites.google.com/view/kyle-bot/home";
const auther = "alide123321#9518";
const queue = new Map();
var funhelp = [
  "**" + prefix + "memes_________for the best memes**",
  "**" + prefix + "spam__________will spam whatever you tell it to 5X**",
  "**" + prefix + "shhdm<@><msg>_Send a anonymous message to someone**",
  "**" + prefix + "oof___________to show the oof**", 
  "**" + prefix + "emilie________STFU emilie**",
  "**" + prefix + "okok__________PopSmoke's OK OK**",
  "**" + prefix + "Simp__________Simp bucks**",
  "**" + prefix + "haram_________Haram**",
  "**" + prefix + "blue__________Scary blue**",
  "**" + prefix + "our___________Our stuff**",
  "**" + prefix + "woo___________Woo back**",
  "**" + prefix + "smh___________disappointed**",
  "**" + prefix + "hamood________Arab**",
  "**" + prefix + "kith__________gimme kith**",
  "**" + prefix + "wtf___________wtf?**",
  "**" + prefix + "itis__________IT IS WHAT IT ISSS**",
  "**" + prefix + "stop__________just stop**"
];

var modshelp = [
  "**" + prefix + "help__________will bring up this page**",
  "**" + prefix + "website_______Do you to check put our website?**",
  "**" + prefix + "ping__________will tell you if the bot is online**",
  "**" + prefix + "clear <#>_____clears the messages above it by #**", 
  "**" + prefix + "info__________more information about the bot**",
  "**" + prefix + "Report________to report anything related to this server DM me**",
  "**" + prefix + "announce <title>_after that the bot will ask for the description**"
];



bot.once("ready", () => {
  console.log("Ready!");
  console.log("prefix:" + prefix);
  bot.user.setActivity(" "+prefix+"Help");
});


bot.on("guildMemberAdd", (member) => {
  serverstats(member)
});

bot.on("guildMemberRemove", (member) => {
  serverstats(member)
});

bot.on("message", async msg => {

  

  

  if (msg.author.bot || !msg.content.startsWith(prefix)) return; // Ignore the message if it's from a bot or doesn't start with the prefix.

  let args = msg.content.substring(prefix.length).split(" ");
  let text = msg.content;




  if (msg.guild === null) {
    switch (args[0]) {

      case "report":{

        let sender = msg.author;

        if(!args[1]) {
          const embed = new Discord.MessageEmbed()
          .setColor(0xde3333)
          .setTitle('404')
          .setDescription('What do you want to report (only administrators will see your report)')
          sender.send(embed)
        }else {
          let msgArgs = args.slice(1).join(" ");
      
          
          let Wonderland = bot.channels.cache.get('719454080543490058'); // Wonderland channelReports
        
        
          let embed = new Discord.MessageEmbed()
          .setColor(0X71b3f5)
          .setTitle('Report status:')
          .setDescription('Your report has been successfully filed! :upside_down:')
          sender.send(embed);
          
        
          let reportData = new Discord.MessageEmbed()
          .setColor(0X71b3f5)
          .setTitle(msg.author.username + '\'s Report:')
          .setDescription(msgArgs)
          .setFooter("at: "+msg.createdAt)
        
          
              Wonderland.send(reportData);
          
        }
      break;}

    }}

    if (msg.guild === null) return;


    let serverID = msg.guild.id;


  let SWonderland = '599061990828277770'; // Wonderland server ID
  if (serverID == SWonderland && msg.channel.id == "715457095406714931"){

    if (msg.author.bot) return;

    let Wonderland = bot.channels.cache.get('730388529171136522');
      
    let ok = new Discord.MessageEmbed()
      .setColor(0x008000)
      .setTitle("Thank You!\n your message was sent")
    msg.channel.send(ok);


    msg.channel.bulkDelete(99);
    
  }

  switch (args[0]) {

    case "help": {
      let helpem = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle("All the commands")
        .setURL(helplink)
        .setThumbnail('https://cdn.discordapp.com/attachments/739019780576641096/739022260857470981/Discord_Rose.png')
        .addFields(
          {name: "Check out the commands on our website", value: helplink}, 
          {name: "**Meme commands**", value: prefix+"memehelp", inline: true},
          {name: "**Meme commands**", value: prefix+"modhelp", inline: true}
        )
        .setImage('https://cdn.discordapp.com/attachments/739019780576641096/739022260857470981/Discord_Rose.png')
      msg.channel.send(helpem);

      break;}
    
    case "memehelp":{
      let memehelp = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle("Meme commands")
      .setURL(helplink)
      .setThumbnail('https://cdn.discordapp.com/attachments/739019780576641096/739022260857470981/Discord_Rose.png')
      .addFields(
        {name: "Check out the commands on our website", value: helplink}, 
        {name: "**Meme commands**", value: funhelp}
      )
      .setImage('https://cdn.discordapp.com/attachments/739019780576641096/739022260857470981/Discord_Rose.png')
    msg.channel.send(memehelp);
    break;}

    case "modhelp":{
      let modhelp = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle("mod commands")
        .setURL(helplink)
        .setThumbnail('https://cdn.discordapp.com/attachments/739019780576641096/739022260857470981/Discord_Rose.png')
        .addFields(
          {name: "Check out the commands on our website", value: helplink}, 
          {name: "**Moderatorcommands**", value: modshelp}
    )
        .setImage('https://cdn.discordapp.com/attachments/739019780576641096/739022260857470981/Discord_Rose.png')
    msg.channel.send(modhelp);
    break;}

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
      if (text.includes("@") && msg.author.id !== "698051518754062387") {
        msg.channel.send("no!");
        break;
      }
      for (var i = 0; i !== 5; ++i) msg.reply(" said: " + text.slice(5) + " ");
      break;}

    case "info": {
      if (args[1] === "version") msg.channel.send("version: " + version);
      if (args[1] === "auther") msg.channel.send("auther: " + auther);
      if (args[1] !== "version" && args[1] !== "auther") {
        msg.channel.send("What do you want more information about?");
        msg.channel.send("*" + prefix + "info version*");
        msg.channel.send("*" + prefix + "info auther*");
      }
      break;}

    case "clear": {
      if (msg.member.hasPermission('ADMINISTRATOR')) {
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
          "sorry you dont have the correct role to use the command"
        );
    break;}

    case "website": {
      msg.channel.send(helplink);
    break;}

    case "report": {
      msg.channel.send("Please DM me to report");
    break;}

    case "shhdm": {
      let mention = msg.mentions.users.first();


      if(text.includes("@here") ||text.includes("@everyone"))
      {
        msg.channel.send("NO!");
        return;
      }

      if(!args[1])
      {
        msg.channel.send("Who do you want to Dm anonymous?");
        return;
      }

      if(!args[1].includes("@"))
      {
        msg.channel.send("Who do you want to Dm anonymous?");
        return;
      }
      

      const embed = new Discord.MessageEmbed()
          .setColor(0xb33076)
          .setTitle("Anonymous Message")
          .setDescription(text.slice(6))
          mention.send(embed)

      msg.channel.bulkDelete(1);
    break;}

    case "announce": {
      let chat = bot.channels.cache.get('707451011471507466');

      if (!(msg.member.hasPermission('ADMINISTRATOR'))) {
        msg.channel.send("dumb dumb ur not a admin");
        return;
      }

      if(!(args[1])){
        msg.channel.send("you didnt enter the title try again");
        return;
      }

      let title = text.slice(9);

      msg.channel.send("What do you want the discription to be? you have 60 seconds to type it"); 
      let disc = " ";      
      msg.channel.awaitMessages(m => m.author.id == msg.author.id,
        {max: 1 , time: 60000}).then(collected => {
          disc = collected.first().content;

          let announce = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle("**"+title+"**")
            .setURL("https://discord.gg/hpcxUFy")
            .setDescription(disc)
            .setThumbnail('https://cdn.discordapp.com/attachments/739019780576641096/739022260857470981/Discord_Rose.png')
          chat.send(announce);
          
        })
        

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

      if (talkedRecently.has(msg.author.id)) {
        msg.channel.send("Cooldown 120 sec");
        sleep(1000)
        msg.delete();
        return;
      }
    
      talkedRecently.add(msg.author.id);
      setTimeout(() => {
        talkedRecently.delete(msg.author.id);
      }, 120000);

      msg.channel.send("https://cdn.discordapp.com/attachments/608295365384339457/737059292930375780/video0.mov");
      
      var VC = msg.member.voice.channel;
        if (VC){
          VC.join()
            .then(connection => {
          const dispatcher = connection.play('./sounds/okok.mp3', { volume: 0.5 });
          dispatcher.on("end", end => {VC.leave()});
        })
        .catch(console.error);
      }
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
      if (talkedRecently.has(msg.author.id)) {
        msg.channel.send("Cooldown 120 sec");
        sleep(1000)
        msg.delete();
        return;
      }
    
      talkedRecently.add(msg.author.id);
      setTimeout(() => {
        talkedRecently.delete(msg.author.id);
      }, 120000);

      msg.channel.send("https://cdn.discordapp.com/attachments/737775095828709508/738086389358264391/woo.gif");

      var VC = msg.member.voice.channel;
        if (VC){
          VC.join()
            .then(connection => {
          const dispatcher = connection.play('./sounds/woo.mp3', { volume: 0.5 });
          dispatcher.on("end", end => {VC.leave()});
        })
        .catch(console.error);
      }
    break;}

    case "smh":{
      msg.channel.send("https://cdn.discordapp.com/attachments/707451317626470455/738346577369759825/smh.PNG");
    break;}

    case "hamood":{
      
      if (talkedRecently.has(msg.author.id)) {
        msg.channel.send("Cooldown 120 sec");
        sleep(1000)
        msg.delete();
        return;
      }
    
      talkedRecently.add(msg.author.id);
      setTimeout(() => {
        talkedRecently.delete(msg.author.id);
      }, 120000);

      msg.channel.send("https://cdn.discordapp.com/attachments/707451317626470455/738867948495568976/Hamood_habibi.mp4");

      var VC = msg.member.voice.channel;
        if (VC){
          VC.join()
            .then(connection => {
          const dispatcher = connection.play('./sounds/hamood.mp3', { volume: 0.5 });
          dispatcher.on("end", end => {VC.leave()});
        })
        .catch(console.error);
      }
    break;}

    case "kith":{
      msg.channel.send("https://cdn.discordapp.com/attachments/707451317626470455/739689711898984468/image0.jpg");
    break;}

    case "wtf":{
      msg.channel.send("https://cdn.discordapp.com/attachments/707451317626470455/739689656467062914/image0.jpg");
    break;}

    case "itis":{
      
      if (talkedRecently.has(msg.author.id)) {
        msg.channel.send("Cooldown 120 sec");
        sleep(1000)
        msg.delete();
        return;
      }
    
      talkedRecently.add(msg.author.id);
      setTimeout(() => {
        talkedRecently.delete(msg.author.id);
      }, 120000);

      msg.channel.send("https://cdn.discordapp.com/attachments/608207237667749908/740063663502786670/video0.mov");

      var VC = msg.member.voice.channel;
        if (VC){
          VC.join()
            .then(connection => {
          const dispatcher = connection.play('./sounds/itis.mp3', { volume: 0.5 });
          dispatcher.on("end", end => {VC.leave()});
        })
        .catch(console.error);
      }
    break;}

    case "stop":{
      
      if (talkedRecently.has(msg.author.id)) {
        msg.channel.send("Cooldown 120 sec");
        sleep(1000)
        msg.delete();
        return;
      }
    
      talkedRecently.add(msg.author.id);
      setTimeout(() => {
        talkedRecently.delete(msg.author.id);
      }, 120000);

      msg.channel.send("https://cdn.discordapp.com/attachments/707451317626470455/740483382173237299/JoeBuddenstopmeme.mp4");

      var VC = msg.member.voice.channel;
        if (VC){
          VC.join()
            .then(connection => {
          const dispatcher = connection.play('./sounds/stop.mp3', { volume: 0.5 });
          dispatcher.on("end", end => {VC.leave()});
        })
        .catch(console.error);
      }
    break;}
  }
});

function serverstats(member){
  sleep(2000)
  member.guild.channels.cache.get("715444945602740244").setName(`Total Members: ${member.guild.memberCount}`); 
  member.guild.channels.cache.get("715444951332290591").setName(`Bots: ${member.guild.members.cache.filter(m => m.user.bot).size}`); 
  member.guild.channels.cache.get("715444948568244305").setName(`Users: ${member.guild.members.cache.filter(m => !m.user.bot).size}`); 
}

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
bot.login("NzEzODc4MTA5NTA5Nzc5NTE2.XsmgzA.cfnc84TIW_KWXnyOyNVpDeuADJ0"); // turn bot online
