const { bot } = require('../../index');
const sleep = require('../../assets/functions/sleep.js').sleep;

function OnGuildMemberAdd(member) {
	if (member.guild.id === '599061990828277770') {
		try {
			let role = member.guild.roles.cache.find((r) => r.name === '[0+] Noobs');
			member.roles.add(role).catch(console.error);
		} catch (error) {
			console.log(`couldn't give roles to ${member.user.username} \n\nError* ${error}`);
		}

		serverstats(member);
		member.guild.channels.cache
			.get('599061991281131531')
			.send(
				'Welcome to ' +
					member.guild.name +
					', <@' +
					member.user.id +
					'>! To get started, visit <#709238410732240906> and react then go on to <#716212510398873651>. Enjoy your stay! <:goodnight:716209532233318472> <:cheemspray:716217215275237427>'
			);
	}
}
module.exports = { OnGuildMemberAdd: OnGuildMemberAdd };

function serverstats(member) {
	sleep(2000);
	member.guild.channels.cache
		.get('715444945602740244')
		.setName(`Members: ${member.guild.memberCount}`);
}
