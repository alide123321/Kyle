module.exports.run = async (bot, msg, args) => {
	const vc = require('../../assets/functions/vc.js').vc;

	vc('egg', 0.7, msg);
	msg.channel.send(
		'https://cdn.discordapp.com/attachments/752042865349230662/752123240226357268/EggMan_Sings_Yi_Jian_Mei_Synced_Up.mp4'
	);
};

module.exports.help = {
	name: 'egg',
	description: 'Asain man',
};
