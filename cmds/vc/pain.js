module.exports.run = async (bot, msg, args) => {
	const vc = require('../../assets/functions/vc.js').vc;

	vc('pain', 0.5, msg);
	msg.channel.send(
		'https://cdn.discordapp.com/attachments/707451317626470455/810907346338971648/image0.jpg'
	);
};

module.exports.help = {
	name: 'pain',
	Alias: 'painguin',
	description: 'Pain.',
};
