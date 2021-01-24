module.exports.run = async (bot, msg, args) => {
	const vc = require('../../assets/functions/vc.js').vc;

	vc('pizza', 0.5, msg);
	msg.channel.send(
		'https://cdn.discordapp.com/attachments/741866598289375342/796457981159538738/image0.jpg'
	);
};

module.exports.help = {
	name: 'pizza',
	description: 'Pizza music',
};
