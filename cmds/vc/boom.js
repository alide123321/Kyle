module.exports.run = async (bot, msg, args) => {
	const vc = require('../../assets/functions/vc.js').vc;

	vc('boom', 0.7, msg);
	msg.channel.send('https://emojis.wiki/emoji-pics/apple/flushed-face-apple.png');
};

module.exports.help = {
	name: 'boom',
	description: 'Dramatic Boom',
};
