module.exports.run = async (bot, msg, args) => {
	const vc = require('../../assets/functions/vc.js').vc;

	vc('notme', 0.7, msg);
	msg.channel.send(
		'https://cdn.discordapp.com/attachments/707451317626470455/751540044476710982/not_me.mp4'
	);
};

module.exports.help = {
	name: 'notme',
};
