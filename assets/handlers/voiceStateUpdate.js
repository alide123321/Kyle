const { bot } = require("../../index");
const db = require("quick.db");
var vcName = new db.table("vcName");

var temporary = []; // private vc
var temporaryw = []; // private vc waitting room
let ParentId = "757169664848691271";
let CreationVcId = "785515396430037022";
let PrivName = "[private room]";
let WaitName = "[waiting room]";
bot.on("voiceStateUpdate", async (oldState, newState) => {
	if (newState.channelID === CreationVcId) {
		newState.guild.channels
			.create(`${newState.member.user.username} ${PrivName}`, {
				type: "voice",
				parent: ParentId,
			})
			.then((vc) => {
				vc.overwritePermissions([
					{
						id: newState.id,
						type: "member",
						allow: 19924480,
						deny: 0,
					},
					{
						id: bot.user.id,
						type: "member",
						allow: 286262288,
						deny: 0,
					},
					{
						id: newState.guild.id,
						type: "role",
						allow: 0,
						deny: 1048576,
					},
				]);
				newState.setChannel(vc);
				temporary.push(vc);
			});

		newState.guild.channels
			.create(`${newState.member.user.username} ${WaitName}`, {
				type: "voice",
				parent: ParentId,
			})
			.then((vc) => {
				vc.overwritePermissions([
					{
						id: newState.id,
						type: "member",
						allow: 16777216,
						deny: 0,
					},
					{
						id: bot.user.id,
						type: "member",
						allow: 286262288,
						deny: 0,
					},
					{
						id: newState.guild.id,
						type: "role",
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
				return;
			}
		}
	}
});
