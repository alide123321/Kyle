module.exports.run = async (bot, msg, args) => {
  const Discord = require("discord.js");
    let Mentioned = msg.mentions.members.first();
    const Fs = require("fs");
      let UserJSON = JSON.parse(Fs.readFileSync("./DataBase/users.json"));
      
      
      if (!(msg.member.hasPermission('ADMINISTRATOR'))) {
        msg.channel.send("dumb dumb ur not a admin");
      return;}
      
      if (!Mentioned) {
        let ErrorEmbed = new Discord.MessageEmbed()
          .setTitle("**ERROR**")
          .setColor(0XFF0000)
          .setDescription("Please mention a user")
        msg.channel.send(ErrorEmbed);
      return;}

      if (!UserJSON[Mentioned.id]) {

        let whois = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle("**"+Mentioned.user.username+"'s info**")
        .addFields(
          {name: "User ID: ", value: (await msg.guild.members.fetch(Mentioned.id)).id, inline: true},
          {name: "Joined at: ", value: (await msg.guild.members.fetch(Mentioned.id)).joinedAt, inline: true},
          {name: "Nickname: ", value: (await msg.guild.members.fetch(Mentioned.id)).nickname, inline: true},
          {name: "Username: ", value: (await msg.guild.members.fetch(Mentioned.id)).user.username, inline: true},
          {name: "Last message in channel: ", value: "<#"+(await msg.guild.members.fetch(Mentioned.id)).lastMessageChannelID+">", inline: true},
          )
        .setImage(Mentioned.user.avatarURL)
        msg.channel.send(whois);
        return;}

      if (UserJSON[msg.author.id]) {
        let whois = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle("**"+Mentioned.user.username+"'s info**")
        .addFields(
          {name: "User ID: ", value: (await msg.guild.members.fetch(Mentioned.id)).id, inline: true},
          {name: "Joined at: ", value: (await msg.guild.members.fetch(Mentioned.id)).joinedAt, inline: true},
          {name: "Nickname: ", value: (await msg.guild.members.fetch(Mentioned.id)).nickname, inline: true},
          {name: "Username: ", value: (await msg.guild.members.fetch(Mentioned.id)).user.username, inline: true},
          {name: "Last message in channel: ", value: "<#"+(await msg.guild.members.fetch(Mentioned.id)).lastMessageChannelID+">", inline: true},
          {name: "Money: ", value: "$"+UserJSON[Mentioned.id].bal, inline: true},
          )
        .setImage(Mentioned.user.avatarURL)
        msg.channel.send(whois);
        return;}
}

module.exports.help = {
    name: "whois"
}