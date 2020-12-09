module.exports.run = async (bot, msg, args) => {
	const vc = require('../../assets/functions/vc.js').vc;

	vc('yeahyeah', 0.5, msg);
	msg.channel.send('https://i.redd.it/sjknbznq49131.jpg');
};

module.exports.help = {
	name: 'yeahyeah',
};
