module.exports.run = async (bot, msg, args) => {
	const vc = require("../../assets/functions/vc.js").vc;

	vc("sad", 0.9, msg);
	msg.channel.send(
		"https://cdn.discordapp.com/attachments/707451317626470455/746467065577078915/video0.mp4"
	);
};

module.exports.help = {
	name: "sad",
};
