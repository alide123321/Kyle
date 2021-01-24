module.exports.run = async (bot, msg, args) => {
	const vc = require('../../assets/functions/vc.js').vc;

	vc('mad', 0.35, msg);
	msg.channel.send(
		'https://cdn.discordapp.com/attachments/707451317626470455/743726550213460068/HOES_MAD_FULL_VIDEO.mp4'
	);
};

module.exports.help = {
	name: 'mad',
	description: 'Hoes mad',
};
