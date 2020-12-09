module.exports.run = async (bot, msg, args) => {
	const vc = require('../../assets/functions/vc.js').vc;

	vc('wayup', 0.7, msg);
	msg.channel.send(
		'https://cdn.discordapp.com/attachments/752042865349230662/753350097886249080/videoplayback.mp4'
	);
};

module.exports.help = {
	name: 'wayup',
};
