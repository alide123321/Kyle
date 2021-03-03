module.exports.run = async (bot, msg, args) => {
	const vc = require('../../assets/functions/vc.js').vc;

	vc('shani', 0.7, msg);
	msg.channel.send(
		'https://cdn.discordapp.com/attachments/707451317626470455/816583669439266856/v07044a30000c0m1hhm1dqa55fje2clg.mov'
	);
};

module.exports.help = {
	name: 'shani',
	description: 'Shit Bustin',
};
