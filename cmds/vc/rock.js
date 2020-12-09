module.exports.run = async (bot, msg, args) => {
	const vc = require('../../assets/functions/vc.js').vc;

	vc('rock', 0.6, msg);
	msg.channel.send(
		'https://cdn.discordapp.com/attachments/707451317626470455/748035445140619264/rock.mp4'
	);
};

module.exports.help = {
	name: 'rock',
};
