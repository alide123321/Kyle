module.exports.run = async (bot, msg, args) => {
	const vc = require("../../assets/functions/vc.js").vc;

	vc("itsme", 0.7, msg);
	msg.channel.send(
		"https://cdn.discordapp.com/attachments/599061991281131531/749542094783381624/Its_me_Im_niggas.mp4"
	);
};

module.exports.help = {
	name: "itsme",
};
