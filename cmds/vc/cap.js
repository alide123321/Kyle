module.exports.run = async (bot, msg, args) => {
	const vc = require('../../assets/functions/vc.js').vc;

	vc('cap', 0.7, msg);
	msg.channel.send(
		'https://cdn.discordapp.com/attachments/752042865349230662/759799959229825104/Zias_Stop_The_Cap.mp4'
	);
};

module.exports.help = {
	name: 'cap',
	description: 'Put them in there place',
};
