module.exports.run = async (bot, msg, args) => {
	const vc = require("../../assets/functions/vc.js").vc;

	var VC = msg.member.voice.channel;
	vc("sharmota", 0.7, VC, msg.author.id, msg.channel);
	msg.channel.send(
		"https://cdn.discordapp.com/attachments/669931327797067807/778891070310318100/videoplayback.mp4"
	);
};

module.exports.help = {
	name: "sharmota",
};
