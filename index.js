const Discord = require('discord.js');
const bot = new Discord.Client();
const token = "NzEzODc4MTA5NTA5Nzc5NTE2.Xsml-w.Tbs0Ig4yy2Z27UZYF79CRSSPltQ";
const version = "1.0.1";
const prefix = '.';
const auther = "alide123321#9518";
const WebLink = "https://sites.google.com/view/kool-kitties-klub";
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

bot.on('message', msg=>
{
    let args = msg.content.substring(prefix.length).split(" ");
    let text = msg.content;

    switch(args[0])
    {
        case 'help':
            const embed = new Discord.MessageEmbed()
            .setTitle("All the commands")
            .addField("Check out the commands on our website \n"+WebLink+"\n some off our commands are",help)
            .setColor(0X5DADE2)
            msg.channel.send(embed);
            break;

        case 'ping':
            msg.channel.send("Im alive");
            break;
        
        case 'memes':
            msg.channel.send("if you wanted memes follow @saudinigga123 on instagram");
            break;

        case 'spam':
            msg.reply(" said: "+text.slice(5,)+" ");
            msg.reply(" said: "+text.slice(5,)+" ");
            msg.reply(" said: "+text.slice(5,)+" ");
            msg.reply(" said: "+text.slice(5,)+" ");
            msg.reply(" said: "+text.slice(5,)+" ");
            break;

        case 'info':
            if (args[1] === "version")
                msg.channel.send("version: "+version);
            if (args[1] === "auther")
                msg.channel.send("auther: "+auther);
            if (args[1] !== "version" && args[1] !== "auther")
            {
                msg.channel.send("sorry that isnt a command try these");
                msg.channel.send("*"+prefix+"info version*");
                msg.channel.send("*"+prefix+"info auther*");
            }
            break;

        case 'clear':
            if (msg.member.roles.cache.find(r => r.name === "The Homies")) 
            {
                if(!args[1]) return msg.reply("Error please define how many messages do you want to delete");
                msg.channel.bulkDelete(args[1]);
                break;
            }
            if (msg.member.roles.cache.find(r => r.name !== "The Homies")) 
                msg.channel.send("sorry you dont have the correct role to exacute the command");
            break;
        
        case 'website':
            msg.channel.send(WebLink);
            break;
        
        case 'report':
            msg.channel.send("We handle all of our reports online check out our website \nyou can use the command "+prefix+"website for the link");
            break;



            
        
    }
})
bot.login(token) // turn bot online