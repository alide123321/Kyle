module.exports.run = async (bot, msg, args) => {
	const vc = require("../../assets/functions/vc.js").vc;

	vc("laugh", 0.5, msg);
	msg.channel.send(
		"https://cdn.discordapp.com/attachments/707451317626470455/752965725517250561/videoplayback.mp4"
	);
};

module.exports.help = {
	name: "laugh",
};
