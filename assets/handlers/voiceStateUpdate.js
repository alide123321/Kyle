const { bot } = require('../../index');
let db = require('quick.db');
let vcName = new db.table('vcName');

var temporary = []; // private vc
var temporaryw = []; // private vc waitting room
let ParentId = '707452089453903943';
let CreationVcId = '793133170311823391';
bot.on('voiceStateUpdate', async (oldState, newState) => {
	let PrivName = `${newState.member.user.username} [private room]`;
	let WaitName = `${newState.member.user.username}`;

	if (vcName.has(`${newState.id}`)) {
		PrivName = vcName.get(`${newState.id}`);
		WaitName = PrivName;
	}

	if (newState.channelID === CreationVcId) {
		newState.guild.channels
			.create(`${PrivName}`, {
				type: 'voice',
				parent: ParentId,
			})
			.then((vc) => {
				vc.overwritePermissions([
					{
						id: newState.id,
						type: 'member',
						allow: 19924480,
						deny: 0,
					},
					{
						id: bot.user.id,
						type: 'member',
						allow: 286262288,
						deny: 0,
					},
					{
						id: newState.guild.id,
						type: 'role',
						allow: 0,
						deny: 1048576,
					},
				]);
				newState.setChannel(vc);
				temporary.push(vc);
			});

		newState.guild.channels
			.create(`${WaitName} [waiting room]`, {
				type: 'voice',
				parent: ParentId,
			})
			.then((vc) => {
				vc.overwritePermissions([
					{
						id: newState.id,
						type: 'member',
						allow: 16777216,
						deny: 0,
					},
					{
						id: bot.user.id,
						type: 'member',
						allow: 286262288,
						deny: 0,
					},
					{
						id: newState.guild.id,
						type: 'role',
						allow: 1049600,
						deny: 2097153,
					},
				]);
				temporaryw.push(vc);
			});
	}
	if (temporary.length > 0) {
		for (let i = 0; i < temporary.length; i++) {
			let ch = temporary[i];
			let chw = temporaryw[i];

			if (ch.members.size <= 0) {
				try {
					await ch.delete();
					await chw.delete();
				} catch (error) {
					console.log(`cant delete vc ${error}`);
				}

				temporary.splice(i, 1);
				temporaryw.splice(i, 1);
			}
		}
	}
});
