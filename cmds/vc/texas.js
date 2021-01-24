module.exports.run = async (bot, msg, args) => {
	const vc = require('../../assets/functions/vc.js').vc;

	vc('texas', 0.7, msg);
	msg.channel.send(
		'https://cdn.discordapp.com/attachments/740514553531465769/792871038866030603/Texas.mp4'
	);
};

module.exports.help = {
	name: 'texas',
	description: 'Everything is bigger in texas',
};
