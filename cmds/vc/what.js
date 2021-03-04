module.exports.run = async (bot, msg, args) => {
	const vc = require('../../assets/functions/vc.js').vc;

	vc('what', 0.5, msg);
	msg.channel.send(
		'https://cdn.discordapp.com/attachments/669931327797067807/816946898958942218/video0.mp4'
	);
};

module.exports.help = {
	name: 'what',
	description: 'WHAT DID HE SAYYY',
};
