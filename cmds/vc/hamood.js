module.exports.run = async (bot, msg, args) => {
	const vc = require('../../assets/functions/vc.js').vc;

	vc('hamood', 0.5, msg);
	msg.channel.send(
		'https://cdn.discordapp.com/attachments/707451317626470455/738867948495568976/Hamood_habibi.mp4'
	);
};

module.exports.help = {
	name: 'hamood',
};
