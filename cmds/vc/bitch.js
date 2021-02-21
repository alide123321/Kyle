module.exports.run = async (bot, msg, args) => {
	const vc = require('../../assets/functions/vc.js').vc;

	vc('bitch', 0.5, msg);
	msg.channel.send(
		'https://cdn.discordapp.com/attachments/752042865349230662/813146723659546634/nigga_you_a_bitch__jojo_siwa.mp4'
	);
};

module.exports.help = {
	name: 'bitch',
	description: 'Dababy Call you a bitch',
};
