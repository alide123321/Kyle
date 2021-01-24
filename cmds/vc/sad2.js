module.exports.run = async (bot, msg, args) => {
	const vc = require('../../assets/functions/vc.js').vc;

	vc('sad2', 0.9, msg);
	msg.channel.send(
		'https://cdn.discordapp.com/attachments/707451317626470455/760052929360429106/video0.mov'
	);
};

module.exports.help = {
	name: 'sad2',
	description: 'PAIN',
};
