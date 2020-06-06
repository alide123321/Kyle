const Discord = require('discord.js');
const fs = require('fs');
const botconfig = require("./botconfig.json");

module.exports.run = async (bot, msg, args) => {
    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json","utf8"));
    if(!prefixes[msg.guild.id]) {
        prefixes[msg.guild.id] = {
            prefix: botconfig.prefix
        }
    }
    let prefix = prefixes[msg.guild.id].prefix;

    if(!msg.member.hasPermission("MAnage_GUILD")) return msg.channel.send("you do not have the correct permissions");
    
    if(!args[0]) return msg.channel.send("please enter a prefix");

    prefixes[msg.guild.id] = {
        prefix: args[0]
    }

    fs.writeFile("./prefixes.json",JSON.stringify(prefixes), (err) => {
            if (err) console.log(err)
    });

    let embed = new Discord.MessageEmbed()
        embed.setColor();
        embed.setTitle("prefix Set!");
        embed.setDescription('set to ${args[0]}');
}

module.exports.help = {
    name: "prefix",
    aliases: []
}