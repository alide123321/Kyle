module.exports.run = async (bot, msg, args) => {
	const vc = require('../../assets/functions/vc.js').vc;

	vc('okok', 0.5, msg);
	msg.channel.send(
		'https://cdn.discordapp.com/attachments/608295365384339457/737059292930375780/video0.mov'
	);
};

module.exports.help = {
	name: 'okok',
};
