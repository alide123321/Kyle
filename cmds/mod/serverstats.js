module.exports.run = async (bot, msg, args) => {
  if (msg.guild.id !== "599061990828277770") return;
  let Total = msg.guild.memberCount;
  let bots = msg.guild.members.cache.filter((m) => m.user.bot).size;
  msg.guild.channels.cache.get("715444945602740244").setName(`Total Members: ${Total}`); // 770998780404957235
  msg.guild.channels.cache.get("715444948568244305").setName(`Users: ${Total - bots}`); // 770998825677488178
  msg.guild.channels.cache.get("715444951332290591").setName(`Bots: ${bots}`); // 770998873937805383
};

module.exports.help = {
  name: "serverstats",
};
