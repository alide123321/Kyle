module.exports.run = async (bot, msg, args) => {
	const vc = require('../../assets/functions/vc.js').vc;

	vc('dababy', 0.7, msg);
	msg.channel.send(
		'https://cdn.discordapp.com/attachments/752042865349230662/785763872543211541/dababy.mp4'
	);
};

module.exports.help = {
	name: 'dababy',
	description: 'Dababy convertiable',
};
