module.exports.run = async (bot, msg, args) => {
	const vc = require('../../assets/functions/vc.js').vc;

	vc('unwise', 0.5, msg);
	msg.channel.send(
		'https://cdn.discordapp.com/attachments/608207237667749908/750270119954874397/video0.mp4'
	);
};

module.exports.help = {
	name: 'unwise',
	description: 'Ming dynasty',
};
