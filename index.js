const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World! this is \nKyle the bot'));
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));



const Discord = require("discord.js");
const {Client, Attachment} = require("discord.js");
const bot = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"]});
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
const version = "1.1.0";
const helplink = "https://sites.google.com/view/kyle-bot/home";
const auther = "alide123321#9518";
const queue = new Map();
var funhelp = [
  "**" + prefix + "memes_________for the best memes**",
  "**" + prefix + "spam__________will spam whatever you tell it to 5X**",
  "**" + prefix + "shhdm<@><msg>_Send a anonymous message to someone**",
  "**" + prefix + "oof___________to show the oof**", 
  "**" + prefix + "emilie________STFU emilie**",
  "**" + prefix + "Simp__________Simp bucks**",
  "**" + prefix + "haram_________Haram**",
  "**" + prefix + "blue__________Scary blue**",
  "**" + prefix + "our___________Our stuff**",
  "**" + prefix + "smh___________disappointed**",
  "**" + prefix + "kith__________gimme kith**",
  "**" + prefix + "wtf___________wtf?**",
  "**" + prefix + "bruh__________that face**",
  "**" + prefix + "pardon________PARDON.**"
];
var modshelp = [
  "**" + prefix + "help__________will bring up this page**",
  "**" + prefix + "website_______Do you to check put our website?**",
  "**" + prefix + "ping__________will tell you if the bot is online**",
  "**" + prefix + "clear <#>_____clears the messages above it by #**", 
  "**" + prefix + "info__________more information about the bot**",
  "**" + prefix + "Report________to report anything related to this server DM me**",
  "**" + prefix + "announce <#><title>_after that the bot will ask for the description**"
];
var VChelp = [
  "**" + prefix + "okok__________PopSmoke's OK OK**",
  "**" + prefix + "woo___________Woo back**",
  "**" + prefix + "hamood________Arab**", 
  "**" + prefix + "itis__________IT IS WHAT IT ISSS**",
  "**" + prefix + "stop__________just stop**",
  "**" + prefix + "cough_________Weed cough**",
  "**" + prefix + "kanye_________shut the fuck up!**",
  "**" + prefix + "rock__________Shut up bitch!**",
  "**" + prefix + "mad___________HOES MAD!!!**",
  "**" + prefix + "gay___________HES GAY!!!**",
  "**" + prefix + "sad___________it's actually changes by x**",
  "**" + prefix + "smoothie______im about to try my smoothie**",
  "**" + prefix + "itsme_________its me im **"
];



bot.once("ready", () => {
  console.log("Ready!");
  console.log("prefix:" + prefix);
  console.log("version:" + version);
  bot.user.setActivity(" DM me "+prefix+"Help");
});

bot.on('guildMemberAdd', member => {
  member.guild.channels.cache.get('716939268504813578').send("Welcome to "+member.guild.name+", <@" + member.user.id + ">! To get started, visit <#709238410732240906> and react then go on to <#716212510398873651>. Enjoy your stay! <:goodnight:716209532233318472> <:cheemspray:716217215275237427>"); 
  serverstats(member);
});


bot.on("guildMemberRemove", (member) => {
  serverstats(member)
});



bot.on('messageReactionAdd', async (reaction, user) => {
  if(!user || user.bot || !reaction.message.channel.guild) 
    return;

    if(reaction.message.channel.id === "709238410732240906")
        await reaction.message.guild.members.cache.get(user.id).roles.add("716092067243098174")

    
    if(reaction.message.channel.id === "740809935247507566"){
      if(reaction.emoji.name === 'movie_night')
        await reaction.message.guild.members.cache.get(user.id).roles.add("740828341069676594")

      if(reaction.emoji.name === 'game_night')
        await reaction.message.guild.members.cache.get(user.id).roles.add("740828344794349658")

      if(reaction.emoji.name === 'pc')
        await reaction.message.guild.members.cache.get(user.id).roles.add("740828981179318343")
        
      if(reaction.emoji.name === 'ps')
        await reaction.message.guild.members.cache.get(user.id).roles.add("740828983071080470")

      if(reaction.emoji.name === 'xbox')
        await reaction.message.guild.members.cache.get(user.id).roles.add("740828984660590672")
    }
    
})

bot.on('messageReactionRemove', async (reaction, user) => {
  if(!user || user.bot || !reaction.message.channel.guild) 
    return;

    if(reaction.message.channel.id === "709238410732240906")
        await reaction.message.guild.members.cache.get(user.id).roles.remove("716092067243098174")

    
    if(reaction.message.channel.id === "740809935247507566"){
      if(reaction.emoji.name === 'movie_night')
        await reaction.message.guild.members.cache.get(user.id).roles.remove("740828341069676594")

      if(reaction.emoji.name === 'game_night')
        await reaction.message.guild.members.cache.get(user.id).roles.remove("740828344794349658")

      if(reaction.emoji.name === 'pc')
        await reaction.message.guild.members.cache.get(user.id).roles.remove("740828981179318343")
        
      if(reaction.emoji.name === 'ps')
        await reaction.message.guild.members.cache.get(user.id).roles.remove("740828983071080470")

      if(reaction.emoji.name === 'xbox')
        await reaction.message.guild.members.cache.get(user.id).roles.remove("740828984660590672")
    }
    
})



var temporary = [] // private vc
var temporaryw = [] // private vc waitting room

bot.on('voiceStateUpdate', async (oldState, newState,) => {

  if (newState.channelID === '746447827055673434') {
      newState.guild.channels.create(newState.member.user.username + " [private room] ", {

        type: 'voice',
        parent: '707452089453903943',
        
      }).then(vc => {

        vc.overwritePermissions([
          {
            id: newState.id,
            allow: ['MOVE_MEMBERS']
          },
          {
            id: newState.id,
            allow: ['CONNECT']
          },
          {
            id: '599061990828277770',
            deny: ['CONNECT']
          }
        ]);

        newState.setChannel(vc);
        temporary.push(vc);
      });

      newState.guild.channels.create(newState.member.user.username + " [waiting room] ", {

        type: 'voice',
        parent: '707452089453903943'

      }).then(vc => {
        vc.overwritePermissions([
          {
            id: newState.id,
            allow: ['MOVE_MEMBERS']
          },
          {
            id: '599061990828277770',
            deny: ['SPEAK']
          },
          {
            id: '599061990828277770',
            allow: ['CONNECT']
          },
          {
            id: newState.id,
            allow: ['CONNECT']
          }
          
        ]);
        temporaryw.push(vc);
      });

      
}



if(temporary.length > 0) {

  for(let i = 0; i < temporary.length; i++) {

    let ch = temporary[i]
    let chw = temporaryw[i]
      
    if(ch.members.size <= 0){

      await ch.delete();
      await chw.delete();

      temporary.splice(i, 1);
      temporaryw.splice(i, 1);
      return;
      
      }
    }
  }
});


bot.on("message", async msg => {

  if (msg.author.bot) return;

  if (msg.guild === null) 
    if (msg.content.charAt(0) !== ".")
      msg.author.send("LOL stupid thats not a command try .help")
    
  

  if (msg.author.bot || !msg.content.startsWith(prefix)) return; // Ignore the message if it's from a bot or doesn't start with the prefix.

  let args = msg.content.substring(prefix.length).split(" ");
  let text = msg.content;


  if (msg.guild === null) {

    let sender = msg.author;

    if (text.charAt(0) !== "."){
      sender.send("LOL stupid thats not a command try .help")
    }


    var dmhelp = [
      "**" + prefix + "help__________will bring up this page**",
      "**" + prefix + "report________to report someone/something in the Wonderland server**"
    ];

    switch (args[0]) {

      case "help":{
        let help = new Discord.MessageEmbed()
          .setColor(0X0099ff)
          .setTitle("All the commands")
          .setURL("https://discord.gg/gBQc5cm")
          .setThumbnail('https://cdn.discordapp.com/attachments/739019780576641096/739022260857470981/Discord_Rose.png')
          .setDescription(dmhelp)
          .setFooter("I have diffrent commands if use me inside a server")
        
        sender.send(help);
          
      break;}

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

      default:{
        sender.send("LOL stupid thats not a command try .help")
      break;}

    }}

    if (msg.guild === null) return;

    let serverID = msg.guild.id;


  let SWonderland = '599061990828277770'; // Wonderland server ID
  if (serverID == SWonderland){
    let Wonderland = bot.channels.cache.get('730388529171136522')
    if (Wonderland === msg.channel.id)
      msg.channel.bulkDelete(2);

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
          {name: "**VC commands**", value: prefix+"vchelp", inline: true},
          {name: "**Mod commands**", value: prefix+"modhelp", inline: true}
          
        )
        .setImage('https://cdn.discordapp.com/attachments/739019780576641096/739022260857470981/Discord_Rose.png')
      msg.channel.send(helpem);

      break;}
    
    case "memehelp":{
      let memehelp = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle("**Meme commands**")
      .setURL(helplink)
      .setThumbnail('https://cdn.discordapp.com/attachments/739019780576641096/739022260857470981/Discord_Rose.png')
      .addFields(
        {name: "Check out the commands on our website", value: helplink}, 
        {name: "**Meme commands**", value: funhelp}
      )
    msg.channel.send(memehelp);
    break;}

    case "modhelp":{
      let modhelp = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle("**Mod commands**")
        .setURL(helplink)
        .setThumbnail('https://cdn.discordapp.com/attachments/739019780576641096/739022260857470981/Discord_Rose.png')
        .addFields(
          {name: "Check out the commands on our website", value: helplink}, 
          {name: "**Moderatorcommands**", value: modshelp}
        )
    msg.channel.send(modhelp);
    break;}

    case "vchelp":{
      let modhelp = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle("**VC commands**")
        .setURL(helplink)
        .setThumbnail('https://cdn.discordapp.com/attachments/739019780576641096/739022260857470981/Discord_Rose.png')
        .addFields(
          {name: "Check out the commands on our website", value: helplink}, 
          {name: "**VCcommands**", value: VChelp}
    )
    msg.channel.send(modhelp);
    break;}

    case "ping": {
      msg.channel.send("Im alive");
      break;}

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
      break;}

    case "spam": {

      if (talkedRecently.has(msg.author.id) && msg.author.id !== '698051518754062387') {
        msg.channel.send("Cooldown 120 sec");
        sleep(1000)
        msg.delete();
        return;
      }
    
      talkedRecently.add(msg.author.id);
      setTimeout(() => {
        talkedRecently.delete(msg.author.id);
      }, 120000);

      if (text.includes("@") && msg.author.id !== "698051518754062387") {
        msg.channel.send("No.");
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
        msg.channel.send("the format for this command is .announce <0/1/2/3> <title>\n0-no one\n1-everyone\n2-gamenight\n3-movienight  1 ");
        return;
      }

      if(!(args[2])){
        msg.channel.send("the format for this command is .announce <0/1/2/3> <title>\n0-no one\n1-everyone\n2-gamenight\n3-movienight   2");
        return;
      }

      if(isNaN(args[1])){
        msg.channel.send("the format for this command is .announce <0/1/2/3> <title>\n0-no one\n1-everyone\n2-gamenight\n3-movienight  3");
        return;
      }
    
      if(args[1] !== "0" && args[1] !== "1" && args[1] !== "2" && args[1] !== "3"){
        msg.channel.send("the format for this command is .announce <0/1/2/3> <title>\n0-no one\n1-everyone\n2-gamenight\n3-movienight  4");
        return;
      }


      let mention = " ";
      if(args[1] === "0")
        mention = "no one";
      if(args[1] === "1")
        mention = "@everyone";
      if(args[1] === "2")
        mention = "<@&740828344794349658>";
      if(args[1] === "3")
        mention = "<@&740828341069676594>";
      

      let title = text.slice(12);

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

          if(!(mention === "no one"))
            chat.send("||"+mention+"||");
          chat.send(announce);
          chat.send({files: ["./bar.gif"]});
          
        })
        
        
    break;}
    


    case "oof": {
      num = 7;
      imageNum = Math.floor(Math.random() * num) + 1;
      msg.channel.send ({files: ["./images/oof" + imageNum + ".jpg"]})
    break;}

    case "emilie": {
      msg.channel.send("https://cdn.discordapp.com/attachments/599061991281131531/736649467045871616/emiliestfu.gif");
    break;}

    case "pardon": {
      msg.channel.send("https://cdn.discordapp.com/attachments/608207237667749908/749520307575980092/image0.jpg");
    break;}

    case "okok": {

      if (talkedRecently.has(msg.author.id) && msg.author.id !== '698051518754062387') {
        msg.channel.send("Cooldown 60 sec");
        sleep(1000)
        msg.delete();
        return;
      }
    
      talkedRecently.add(msg.author.id);
      setTimeout(() => {
        talkedRecently.delete(msg.author.id);
      }, 60000);

      msg.channel.send("https://cdn.discordapp.com/attachments/608295365384339457/737059292930375780/video0.mov");
      
      var VC = msg.member.voice.channel;
        if (VC){
          VC.join()
            .then(connection => {
          let dispatcher = connection.play('./sounds/okok.mp3', { volume: 0.5 });
          dispatcher.on("finish", end => {VC.leave();});
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
      if (talkedRecently.has(msg.author.id) && msg.author.id !== '698051518754062387') {
        msg.channel.send("Cooldown 60 sec");
        sleep(1000)
        msg.delete();
        return;
      }
    
      talkedRecently.add(msg.author.id);
      setTimeout(() => {
        talkedRecently.delete(msg.author.id);
      }, 60000);

      msg.channel.send("https://cdn.discordapp.com/attachments/737775095828709508/738086389358264391/woo.gif");

      var VC = msg.member.voice.channel;
        if (VC){
          VC.join()
            .then(connection => {
          const dispatcher = connection.play('./sounds/woo.mp3', { volume: 0.25 });
          dispatcher.on("finish", end => {VC.leave();});
        })
        .catch(console.error);
      }
    break;}

    case "smh":{
      msg.channel.send("https://cdn.discordapp.com/attachments/707451317626470455/738346577369759825/smh.PNG");
    break;}

    case "hamood":{
      
      if (talkedRecently.has(msg.author.id) && msg.author.id !== '698051518754062387') {
        msg.channel.send("Cooldown 60 sec");
        sleep(1000)
        msg.delete();
        return;
      }
    
      talkedRecently.add(msg.author.id);
      setTimeout(() => {
        talkedRecently.delete(msg.author.id);
      }, 60000);

      msg.channel.send("https://cdn.discordapp.com/attachments/707451317626470455/738867948495568976/Hamood_habibi.mp4");

      var VC = msg.member.voice.channel;
        if (VC){
          VC.join()
            .then(connection => {
          const dispatcher = connection.play('./sounds/hamood.mp3', { volume: 0.5 });
          dispatcher.on("finish", end => {VC.leave();});
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
      
      if (talkedRecently.has(msg.author.id) && msg.author.id !== '698051518754062387') {
        msg.channel.send("Cooldown 60 sec");
        sleep(1000)
        msg.delete();
        return;
      }
    
      talkedRecently.add(msg.author.id);
      setTimeout(() => {
        talkedRecently.delete(msg.author.id);
      }, 60000);

      msg.channel.send("https://cdn.discordapp.com/attachments/608207237667749908/740063663502786670/video0.mov");

      var VC = msg.member.voice.channel;
        if (VC){
          VC.join()
            .then(connection => {
          const dispatcher = connection.play('./sounds/itis.mp3', { volume: 0.5 });
          dispatcher.on("finish", end => {VC.leave();});
        })
        .catch(console.error);
      }
    break;}

    case "stop":{
      
      if (talkedRecently.has(msg.author.id) && msg.author.id !== '698051518754062387') {
        msg.channel.send("Cooldown 60 sec");
        sleep(1000)
        msg.delete();
        return;
      }
    
      talkedRecently.add(msg.author.id);
      setTimeout(() => {
        talkedRecently.delete(msg.author.id);
      }, 60000);

      msg.channel.send("https://cdn.discordapp.com/attachments/707451317626470455/740483382173237299/JoeBuddenstopmeme.mp4");

      var VC = msg.member.voice.channel;
        if (VC){
          VC.join()
            .then(connection => {
          const dispatcher = connection.play('./sounds/stop.mp3', { volume: 0.5 });
          dispatcher.on("finish", end => {VC.leave();});
        })
        .catch(console.error);
      }
    break;}

    case "cough":{
      
      if (talkedRecently.has(msg.author.id) && msg.author.id !== '698051518754062387') {
        msg.channel.send("Cooldown 60 sec");
        sleep(1000)
        msg.delete();
        return;
      }
    
      talkedRecently.add(msg.author.id);
      setTimeout(() => {
        talkedRecently.delete(msg.author.id);
      }, 60000);

      msg.channel.send("https://cdn.discordapp.com/attachments/707451317626470455/740721964531974244/videoplayback.mp4");

      var VC = msg.member.voice.channel;
        if (VC){
          VC.join()
            .then(connection => {
          const dispatcher = connection.play('./sounds/cough.mp3', { volume: 0.7 });
          dispatcher.on("finish", end => {VC.leave();});
        })
        .catch(console.error);
      }
    break;}

    case "kanye":{
      
      if (talkedRecently.has(msg.author.id) && msg.author.id !== '698051518754062387') {
        msg.channel.send("Cooldown 60 sec");
        sleep(1000)
        msg.delete();
        return;
      }
    
      talkedRecently.add(msg.author.id);
      setTimeout(() => {
        talkedRecently.delete(msg.author.id);
      }, 60000);

      msg.channel.send("https://cdn.discordapp.com/attachments/707451317626470455/740725168904601670/videoplayback_1_online-video-cutter.com.mp4");

      var VC = msg.member.voice.channel;
        if (VC){
          VC.join()
            .then(connection => {
          const dispatcher = connection.play('./sounds/Kanye.mp3', { volume: 0.7 });
          dispatcher.on("finish", end => {VC.leave();});
        })
        .catch(console.error);
      }
    break;}

    case "rock":{
      
      if (talkedRecently.has(msg.author.id) && msg.author.id !== '698051518754062387') {
        msg.channel.send("Cooldown 60 sec");
        sleep(1000)
        msg.delete();
        return;
      }
    
      talkedRecently.add(msg.author.id);
      setTimeout(() => {
        talkedRecently.delete(msg.author.id);
      }, 60000);

      msg.channel.send("https://cdn.discordapp.com/attachments/707451317626470455/748035445140619264/rock.mp4");

      var VC = msg.member.voice.channel;
        if (VC){
          VC.join()
            .then(connection => {
          const dispatcher = connection.play('./sounds/rock.mp3', { volume: 0.6 });
          dispatcher.on("finish", end => {VC.leave();});
        })
        .catch(console.error);
      }
    break;}

    case "bruh": {
      msg.channel.send("https://cdn.discordapp.com/attachments/700670516570095677/741569349873303572/image0.jpg")
    break;}

    case "mad":{
      
      if (talkedRecently.has(msg.author.id) && msg.author.id !== '698051518754062387') {
        msg.channel.send("Cooldown 60 sec");
        sleep(1000)
        msg.delete();
        return;
      }
    
      talkedRecently.add(msg.author.id);
      setTimeout(() => {
        talkedRecently.delete(msg.author.id);
      }, 60000);

      msg.channel.send("https://cdn.discordapp.com/attachments/707451317626470455/743726550213460068/HOES_MAD_FULL_VIDEO.mp4");

      var VC = msg.member.voice.channel;
        if (VC){
          VC.join()
            .then(connection => {
          const dispatcher = connection.play('./sounds/mad.mp3', { volume: 0.35 });
          dispatcher.on("finish", end => {VC.leave();});
        })
        .catch(console.error);
      }
    break;}
    
    case "gay":{
      
      if (talkedRecently.has(msg.author.id) && msg.author.id !== '698051518754062387') {
        msg.channel.send("Cooldown 60 sec");
        sleep(1000)
        msg.delete();
        return;
      }
    
      talkedRecently.add(msg.author.id);
      setTimeout(() => {
        talkedRecently.delete(msg.author.id);
      }, 60000);

      msg.channel.send("https://cdn.discordapp.com/attachments/608207237667749908/746398464220463216/video0.mp4");

      var VC = msg.member.voice.channel;
        if (VC){
          VC.join()
            .then(connection => {
          const dispatcher = connection.play('./sounds/gay.mp3', { volume: 0.5 });
          dispatcher.on("finish", end => {VC.leave();});
        })
        .catch(console.error);
      }
    break;}

    case "sad":{
      
      if (talkedRecently.has(msg.author.id) && msg.author.id !== '698051518754062387') {
        msg.channel.send("Cooldown 60 sec");
        sleep(1000)
        msg.delete();
        return;
      }
    
      talkedRecently.add(msg.author.id);
      setTimeout(() => {
        talkedRecently.delete(msg.author.id);
      }, 60000);

      msg.channel.send("https://cdn.discordapp.com/attachments/707451317626470455/746467065577078915/video0.mp4");

      var VC = msg.member.voice.channel;
        if (VC){
          VC.join()
            .then(connection => {
          const dispatcher = connection.play('./sounds/sad.mp3', { volume: 0.7 });
          dispatcher.on("finish", end => {VC.leave();});
        })
        .catch(console.error);
      }
    break;}

    case "smoothie":{
      
      if (talkedRecently.has(msg.author.id) && msg.author.id !== '698051518754062387') {
        msg.channel.send("Cooldown 60 sec");
        sleep(1000)
        msg.delete();
        return;
      }
    
      talkedRecently.add(msg.author.id);
      setTimeout(() => {
        talkedRecently.delete(msg.author.id);
      }, 60000);

      msg.channel.send("https://cdn.discordapp.com/attachments/608207237667749908/748466554097631291/Im_about_to_try_my_smoothie.mp4");

      var VC = msg.member.voice.channel;
        if (VC){
          VC.join()
            .then(connection => {
          const dispatcher = connection.play('./sounds/smoothie.mp3', { volume: 0.7 });
          dispatcher.on("finish", end => {VC.leave();});
        })
        .catch(console.error);
      }
    break;}

    case "itsme":{
      
      if (talkedRecently.has(msg.author.id) && msg.author.id !== '698051518754062387') {
        msg.channel.send("Cooldown 60 sec");
        sleep(1000)
        msg.delete();
        return;
      }
    
      talkedRecently.add(msg.author.id);
      setTimeout(() => {
        talkedRecently.delete(msg.author.id);
      }, 60000);

      msg.channel.send("https://cdn.discordapp.com/attachments/599061991281131531/749542094783381624/Its_me_Im_niggas.mp4");

      var VC = msg.member.voice.channel;
        if (VC){
          VC.join()
            .then(connection => {
          const dispatcher = connection.play('./sounds/itsme.mp3', { volume: 0.7 });
          dispatcher.on("finish", end => {VC.leave();});
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
*/token
bot.login(token); // turn bot online
