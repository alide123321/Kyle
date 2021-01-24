module.exports.run = async (bot, msg, args) => {
	const vc = require('../../assets/functions/vc.js').vc;

	vc('woo', 0.25, msg);
	msg.channel.send(
		'https://cdn.discordapp.com/attachments/737775095828709508/738086389358264391/woo.gif'
	);
};

module.exports.help = {
	name: 'woo',
	description: 'BIG09MLBOA',
};
