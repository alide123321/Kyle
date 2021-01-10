module.exports.run = async (bot, msg, args) => {
	const vc = require('../../assets/functions/vc.js').vc;

	vc('horny', 0.7, msg);
	msg.channel.send(
		'https://cdn.discordapp.com/attachments/752042865349230662/784489221812649994/-horny_indian_man.mp4'
	);
};

module.exports.help = {
	name: 'horny',
	Alias: 'nicwee',
};
