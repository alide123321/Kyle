module.exports.run = async (bot, msg, args) => {
	const vc = require("../../assets/functions/vc.js").vc;

	vc("itis", 0.5, msg);
	msg.channel.send(
		"https://cdn.discordapp.com/attachments/608207237667749908/740063663502786670/video0.mov"
	);
};

module.exports.help = {
	name: "itis",
};
