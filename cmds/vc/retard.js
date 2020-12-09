module.exports.run = async (bot, msg, args) => {
	const vc = require('../../assets/functions/vc.js').vc;

	vc('retard', 0.5, msg);
	msg.channel.send(
		'https://cdn.discordapp.com/attachments/724055819548622968/768747697376198666/120862237_329041051492571_197292215089316325_n.mp4'
	);
};

module.exports.help = {
	name: 'retard',
};
