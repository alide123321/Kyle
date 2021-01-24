module.exports.run = async (bot, msg, args) => {
	const vc = require('../../assets/functions/vc.js').vc;

	vc('1234', 0.7, msg);
	msg.channel.send(
		'https://cdn.discordapp.com/attachments/752042865349230662/761928030020829184/videoplayback.mp4'
	);
};

module.exports.help = {
	name: '1234',
	description: 'How many are in your store?',
};
