module.exports.run = async (bot, msg, args) => {
	const vc = require("../../assets/functions/vc.js").vc;

	var VC = msg.member.voice.channel;
	vc("alide", 0.7, VC, msg.author.id, msg.channel);
	msg.channel.send(
		"https://cdn.discordapp.com/attachments/707451317626470455/783074628159406090/me.gif"
	);
};

module.exports.help = {
	name: "alide",
};
