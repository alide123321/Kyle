module.exports.run = async (bot, msg, args) => {
	const vc = require("../../assets/functions/vc.js").vc;

	var VC = msg.member.voice.channel;
	vc("yeahyeah", 0.5, VC, msg.author.id, msg.channel);
	msg.channel.send("https://i.redd.it/sjknbznq49131.jpg");
};

module.exports.help = {
	name: "yeahyeah",
};
