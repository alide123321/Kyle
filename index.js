const Discord = require('discord.js');
const bot = new Discord.Client();
const token = "NzEzODc4MTA5NTA5Nzc5NTE2.Xsml-w.Tbs0Ig4yy2Z27UZYF79CRSSPltQ";
const fetch = require('node-fetch');
const version = "1.0.2";
const prefix = '.';
const helplink = "https://sites.google.com/view/chadthebot/home";
const auther = "alide123321#9518";
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
var help =
[
    "*"+prefix+"website_______Do you to check put our website?*",
    "*"+prefix+"memes_________for the best memes*",
    "*"+prefix+"spam__________will spam whatever you tell it to 5X*",
    "*"+prefix+"info__________more information about the bot*",
    "*"+prefix+"Report________to report anything related to this server*"
    
]

bot.on('ready', () =>
{
    console.log("bot is online ");
    console.log("prefix:"+prefix);
})

bot.on('message', msg =>
{
    if (msg.author.bot || !msg.content.startsWith(prefix)) return; // Ignore the message if it's from a bot or doesn't start with the prefix.
    
    let args = msg.content.substring(prefix.length).split(" ");
    let text = msg.content;

    switch(args[0])
    {
        case 'help':{
            let embed = new Discord.MessageEmbed()
                .setTitle("All the commands")
                .addField("Check out the commands on our website \n"+helplink+"\n some off our commands are",help)
                .setColor(0X5DADE2)
            msg.channel.send(embed);
            break;}

        case 'ping':{
            msg.channel.send("Im alive");
            break;}
        
        case 'memes':{
            fetch('https://meme-api.herokuapp.com/gimme')
                .then(res => res.json())
                .then(json => 
                    {
                        let embed = new Discord.MessageEmbed()
                            .setTitle(json.title)
                            .setImage(json.url)
                            .setFooter("Link: "+json.postLink+" | Subreddit : "+json.subreddit+"\nfor better memes follow @saudinigga123 on isntagram")
                            msg.channel.send(embed);
                    });
            break;}

        case 'spam':{
            for(var i = 0 ; i !== 5 ; ++i)
                msg.reply(" said: "+text.slice(5,)+" ");
            break;}

        case 'info':{
            if (args[1] === "version")
                msg.channel.send("version: "+version);
            if (args[1] === "auther")
                msg.channel.send("auther: "+auther);
            if (args[1] !== "version" && args[1] !== "auther")
            {
                msg.channel.send("What do you want more information about?");
                msg.channel.send("*"+prefix+"info version*");
                msg.channel.send("*"+prefix+"info auther*");
            }
            break;}

        case 'clear':{
            if (msg.member.roles.cache.find(r => r.name === "Cleaner")) 
            {

                if(!args[1]) return msg.reply("Error please define how many messages do you want to delete");
                if(args[1] > 100) return msg.channel.send("you can only delete 100 messages at a time");
                msg.channel.bulkDelete(args[1]);
                break;
            }
            if (msg.member.roles.cache.find(r => r.name !== "Cleaner")) 
                msg.channel.send("sorry you dont have the correct role to exacute the command");
            break;}
        
        case 'website':{
            msg.channel.send(helplink);
            break;}
        
        case 'report':{
            if(!args[1]) {
                const embed = new Discord.MessageEmbed()
                .setColor(0xde3333)
                .setTitle('404')
                .setDescription('What do you want to report (only administrators will see your report)')
                msg.channel.send(embed)
            }else {
                var serverID = msg.guild.id;
                let msgArgs = args.slice(1).join(" ");

                let SEgerms = '701088567971152043'; // Egerms server ID
                let Egerms = bot.channels.cache.get('719159607377002497'); // Egerms channelReports

                let SWonderland = '599061990828277770'; // Wonderland server ID
                let Wonderland = bot.channels.cache.get(''); // Wonderland channelReports

                let SSchoolBoys = '669930315170447370'; // server ID
                let SchoolBoys = bot.channels.cache.get('719163068155691039'); // School boys channelReports
                

                let embed = new Discord.MessageEmbed()
                .setColor(0X71b3f5)
                .setTitle('Report status:')
                .setDescription('Your report has been successfully filed! :upside_down:')
                if(!serverID === SWonderland)
                    msg.channel.send(embed);
                if(!serverID === SWonderland)
                    msg.channel.send("ask the server admins to add the command to your server");
                

                let reportData = new Discord.MessageEmbed()
                .setColor(0X71b3f5)
                .setTitle(msg.author.username + '\'s Report:')
                .setDescription(msgArgs)
                .setFooter("at: "+msg.createdAt)

                if(serverID == SEgerms)
                    Egerms.send(reportData);

                if(serverID === SWonderland)
                    Wonderland.send(reportData);
                
                if(serverID === SSchoolBoys)
                    SchoolBoys.send(reportData);
                
            }
            break;}

        case 'image':{
            
            break;}
        
        case '..':
            break;

            default:{
                msg.channel.send("Sry that is not a command, but it could be \nsend a suggestion here https://forms.gle/98EvJmg7JZ41RDkT9")
            }

        
    }

    
})

/*bot.on('messageDelete', msg =>
{
    let embed = new Discord.MessageEmbed()
                .setTitle("A message was deleted here.")
                .addField("Message created at:",msg.createdAt)
                .setColor(0Xb05c4d)
            msg.channel.send(embed);
})
*/
bot.login(token) // turn bot online