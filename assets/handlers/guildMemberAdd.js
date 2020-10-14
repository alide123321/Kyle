const { bot } = require("../../index");
const sleep = require("../../assets/functions/sleep.js").sleep;

bot.on("guildMemberAdd", (member) => {
  if (member.guild.id === "599061990828277770") {
    let role = member.guild.roles.cache.find((r) => r.name === "[0+] Noobs");
    member.roles.add(role).catch(console.error);

    serverstats(member);
    member.guild.channels.cache
      .get("716939268504813578")
      .send(
        "Welcome to " +
          member.guild.name +
          ", <@" +
          member.user.id +
          ">! To get started, visit <#709238410732240906> and react then go on to <#716212510398873651>. Enjoy your stay! <:goodnight:716209532233318472> <:cheemspray:716217215275237427>"
      );
  }
});

function serverstats(member) {
  sleep(2000);
  member.guild.channels.cache
    .get("715444945602740244")
    .setName(`Total Members: ${member.guild.memberCount}`);
  member.guild.channels.cache
      .get("715444948568244305")
      .setName(`Users: ${member.guild.memberCount - member.guild.members.cache.filter((m) => m.user.bot).size}`); // prettier-ignore
  member.guild.channels.cache
    .get("715444951332290591")
    .setName(`Bots: ${member.guild.members.cache.filter((m) => m.user.bot).size}`);
}
