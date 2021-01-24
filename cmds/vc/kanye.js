module.exports.run = async (bot, msg, args) => {
	const vc = require('../../assets/functions/vc.js').vc;

	vc('kanye', 0.7, msg);
	msg.channel.send(
		'https://cdn.discordapp.com/attachments/707451317626470455/740725168904601670/videoplayback_1_online-video-cutter.com.mp4'
	);
};

module.exports.help = {
	name: 'kanye',
	description: 'STFU',
};
