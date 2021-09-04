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
		.setName(`Members: ${member.guild.memberCount}`);
}
