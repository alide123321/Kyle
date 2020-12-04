module.exports.run = async (bot, msg, args) => {
	const vc = require("../../assets/functions/vc.js").vc;

	vc("cough", 0.7, msg);
	msg.channel.send(
		"https://cdn.discordapp.com/attachments/707451317626470455/740721964531974244/videoplayback.mp4"
	);
};

module.exports.help = {
	name: "cough",
};
