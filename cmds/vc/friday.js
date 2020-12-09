module.exports.run = async (bot, msg, args) => {
	const vc = require('../../assets/functions/vc.js').vc;

	vc('friday', 1.0, msg);
	msg.channel.send(
		'https://cdn.discordapp.com/attachments/752042865349230662/754081325144735774/videoplayback.mp4'
	);
};

module.exports.help = {
	name: 'friday',
};
