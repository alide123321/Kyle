module.exports.run = async (bot, msg, args) => {
	const vc = require('../../assets/functions/vc.js').vc;

	vc('sharmota', 0.7, msg);
	msg.channel.send(
		'https://cdn.discordapp.com/attachments/669931327797067807/778891070310318100/videoplayback.mp4'
	);
};

module.exports.help = {
	name: 'sharmota',
};
