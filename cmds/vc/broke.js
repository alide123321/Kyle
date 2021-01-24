module.exports.run = async (bot, msg, args) => {
	const vc = require('../../assets/functions/vc.js').vc;

	vc('broke', 0.7, msg);
	msg.channel.send(
		'https://cdn.discordapp.com/attachments/707451317626470455/792804969954017330/zeaTkam9s9nd1ohs.mp4'
	);
};

module.exports.help = {
	name: 'broke',
	description: 'When someone is broke',
};
