module.exports.run = async (bot, msg, args) => {
	const vc = require("../../assets/functions/vc.js").vc;

	vc("smoothie", 0.7, msg);
	msg.channel.send(
		"https://cdn.discordapp.com/attachments/608207237667749908/748466554097631291/Im_about_to_try_my_smoothie.mp4"
	);
};

module.exports.help = {
	name: "smoothie",
};
