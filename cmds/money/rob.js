module.exports.run = async (bot, msg, args) => {
  const Discord = require("discord.js");
  const db = require("quick.db");
  var economy = new db.table("economy");
  let mentioned = msg.mentions.members.first();
  let ammount = args[2];

  if (!ammount || isNaN(ammount) || !mentioned) return msg.channel.send(".rob <@> <$>");

  if (!economy.has(`${msg.author.id}.bal`)) return msg.channel.send("you are not in the economy");
  if (!economy.has(`${mentioned.id}.bal`))
    return msg.channel.send("they are not in the economy tell them to do .newbal");

  let rand = Math.floor(Math.random() * 100) + 1;
  let probability =
    economy.get(`${msg.author.id}.bal`) /
    (economy.get(`${msg.author.id}.bal`) + economy.get(`${mentioned.id}.bal`)); // probability of falling

  console.log(rand);
  if (probability <= rand) {
    msg.channel.send(`lol it worked. The odds were ${100 - probability}/100`);
    // successful rob
    economy.subtract(`${mentioned.id}.bal`, ammount);
    economy.add(`${msg.author.id}.bal`, ammount);
  } else {
    msg.channel.send(
      `lol you failed. The odds were ${100 - probability}/100 \nyou lost ${ammount / 2}`
    );
    economy.subtract(`${msg.author.id}.bal`, ammount / 2);
  }
};

module.exports.help = {
  name: "rob",
  Alias: "steal",
};
