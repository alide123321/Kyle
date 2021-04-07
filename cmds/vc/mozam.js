module.exports.run = async (bot, msg, args) => {
	const vc = require('../../assets/functions/vc.js').vc;

	vc('mozambique', 0.7, msg);
	msg.channel.send(
		'https://cdn.discordapp.com/attachments/752042865349230662/818400963508830248/mozambique_here_voice_lifeline.mp4'
	);
};

module.exports.help = {
	name: 'mozambique',
	Alias: 'mozam',
	description: 'Mozambique HERE',
};
