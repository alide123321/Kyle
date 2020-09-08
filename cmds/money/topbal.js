module.exports.run = async (bot, msg, args) => {
    const Discord = require("discord.js");
    const Fs = require("fs");
    
    let UserJSON = JSON.parse(Fs.readFileSync("./DataBase/users.json"));

      var allusers = (await msg.guild.members.fetch()).keyArray("id")
      var usersplaying = []
      var usersplayingmoney = []
      var send = []

      for(let x = 0; x <= allusers.length ;++x){
        if (UserJSON[allusers[x]]) {
          usersplaying.push(allusers[x])
          }
      }
      
      for(let x = 0; x < usersplaying.length ;++x){
        usersplayingmoney.push(UserJSON[usersplaying[x]].bal)
      }

      usersplayingmoney.sort((a,b)=>a-b);
      usersplayingmoney.reverse();

      var removed = usersplayingmoney.splice(0,5);
      usersplayingmoney = removed


      for(var i = 0 ; i < 5 ; ++i){
        for(var n = 0 ; n < usersplaying.length ; ++n){
          if(usersplayingmoney[i] === UserJSON[usersplaying[n]].bal){
            send.push((await msg.guild.members.fetch(usersplaying[n])).displayName+"--"+usersplayingmoney[i])
            usersplaying.splice(n, 1);
          }
        }
      }
      

      let topbaly = new Discord.MessageEmbed()
        .setTitle("**TOP BALANCE**")
        .setColor('#0099ff')
        .setDescription(send)
      msg.channel.send(topbaly);
}

module.exports.help = {
    name: "topbal"
}