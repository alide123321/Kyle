const { bot } = require('../../index');
const sleep = require('../../assets/functions/sleep.js').sleep;

function OnGuildMemberRemove(member) {
	if (member.guild.id === '599061990828277770') serverstats(member);
}
module.exports = { OnGuildMemberRemove: OnGuildMemberRemove };

function serverstats(member) {
	sleep(2000);
	member.guild.channels.cache
		.get('715444945602740244')
		.setName(`Total Members: ${member.guild.memberCount}`);
	member.guild.channels.cache
      .get("715444948568244305")
      .setName(`Users: ${member.guild.memberCount - member.guild.members.cache.filter((m) => m.user.bot).size}`); // prettier-ignore
	member.guild.channels.cache
		.get('715444951332290591')
		.setName(`Bots: ${member.guild.members.cache.filter((m) => m.user.bot).size}`);
}
