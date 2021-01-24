module.exports.run = async (bot, msg, args) => {
	const vc = require('../../assets/functions/vc.js').vc;

	vc('jazzy', 1.5, msg);
	msg.channel.send(
		'https://cdn.discordapp.com/attachments/752042865349230662/756065344724140032/video0.mp4'
	);
};

module.exports.help = {
	name: 'jazzy',
	description: 'When the horny takes over',
};
