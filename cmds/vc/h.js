module.exports.run = async (bot, msg, args) => {
	const vc = require("../../assets/functions/vc.js").vc;

	vc("h", 0.5, msg);
	msg.channel.send(
		"https://cdn.discordapp.com/attachments/680928395399266314/785252917048377394/video0.mov"
	);
};

module.exports.help = {
	name: "h",
};
