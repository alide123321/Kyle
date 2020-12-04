module.exports.run = async (bot, msg, args) => {
	const vc = require("../../assets/functions/vc.js").vc;

	vc("stfu", 0.5, msg);
	msg.channel.send(
		"https://cdn.discordapp.com/attachments/599061991281131531/768847468770230322/video0.mov"
	);
};

module.exports.help = {
	name: "stfu",
};
