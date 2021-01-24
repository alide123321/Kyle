module.exports.run = async (bot, msg, args) => {
	const vc = require('../../assets/functions/vc.js').vc;

	vc('shampoo', 1.2, msg);
	msg.channel.send(
		'https://cdn.discordapp.com/attachments/608207237667749908/750757207284645908/video0.mp4'
	);
};

module.exports.help = {
	name: 'shampoo',
	description: 'BRRR',
};
