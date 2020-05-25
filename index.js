const Discord = require('discord.js');
const bot = new Discord.Client();
const token = "NzEzODc4MTA5NTA5Nzc5NTE2.Xsml-w.Tbs0Ig4yy2Z27UZYF79CRSSPltQ";
const version = "1.0.0";
const prefix = '.';
const auther = "alide123321#9518";


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
            msg.channel.send("*"+prefix+"help \t will bring up this page*");
            msg.channel.send("*"+prefix+"ping \t will tell you if the bot is online*");
            msg.channel.send("*"+prefix+"memes \t for the best memes*");
            msg.channel.send("*"+prefix+"spam \t will spam whatever you tell it to 5X*");
            msg.channel.send("*"+prefix+"clear <#> \t clears the messages above it by # (only works with The Homie role)*");
            msg.channel.send("*"+prefix+"info \t more information about the bot*");

            msg.channel.send("*If you need additional help dm *"+auther);
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
                msg.channel.send("version"+version);
            if (args[1] === "auther")
                msg.channel.send(auther);
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
        
        case 'embed':
                const embed = new Discord.MessageEmbed()
                .addField('Player Name', Message.auther.auther);

                msg.channel.send(embed);
                break;


            
        
    }
})
bot.login(token) // turn bot online