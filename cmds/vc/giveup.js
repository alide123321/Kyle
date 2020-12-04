module.exports.run = async (bot, msg, args) => {
	const vc = require("../../assets/functions/vc.js").vc;

	vc("giveup", 0.5, msg);
	msg.channel.send(
		"https://cdn.discordapp.com/attachments/669930315170447373/763674759237206026/video0.mp4"
	);
};

module.exports.help = {
	name: "giveup",
};
