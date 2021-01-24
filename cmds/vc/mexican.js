module.exports.run = async (bot, msg, args) => {
	const vc = require('../../assets/functions/vc.js').vc;

	vc('mexican', 0.7, msg);
	msg.channel.send(
		'https://cdn.discordapp.com/attachments/707451317626470455/786940197916901406/shadow.png'
	);
};

module.exports.help = {
	name: 'mexican',
	description: 'Mexican music',
};
