module.exports.run = async (bot, msg, args) => {
	const vc = require("../../assets/functions/vc.js").vc;

	vc("alide", 0.7, msg);
	msg.channel.send(
		"https://cdn.discordapp.com/attachments/707451317626470455/783074628159406090/me.gif"
	);
};

module.exports.help = {
	name: "alide",
};
