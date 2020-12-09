module.exports.run = async (bot, msg, args) => {
	const vc = require('../../assets/functions/vc.js').vc;

	vc('boing', 0.5, msg);
	msg.channel.send(
		'https://cdn.discordapp.com/attachments/707451317626470455/767339717326667806/video0.mp4'
	);
};

module.exports.help = {
	name: 'boing',
};
