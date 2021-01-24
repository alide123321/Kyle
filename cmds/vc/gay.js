module.exports.run = async (bot, msg, args) => {
	const vc = require('../../assets/functions/vc.js').vc;

	vc('gay', 0.5, msg);
	msg.channel.send(
		'https://cdn.discordapp.com/attachments/608207237667749908/746398464220463216/video0.mp4'
	);
};

module.exports.help = {
	name: 'gay',
	description: 'When he is homosexual',
};
