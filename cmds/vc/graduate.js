module.exports.run = async (bot, msg, args) => {
	const vc = require('../../assets/functions/vc.js').vc;

	vc('graduate', 0.5, msg);
	msg.channel.send(
		'https://cdn.discordapp.com/attachments/739448495634645002/751762869716254721/videoplayback.mp4'
	);
};

module.exports.help = {
	name: 'graduate',
};
