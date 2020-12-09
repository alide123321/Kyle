module.exports.run = async (bot, msg, args) => {
	const vc = require('../../assets/functions/vc.js').vc;

	vc('stop', 0.5, msg);
	msg.channel.send(
		'https://cdn.discordapp.com/attachments/707451317626470455/740483382173237299/JoeBuddenstopmeme.mp4'
	);
};

module.exports.help = {
	name: 'stop',
};
