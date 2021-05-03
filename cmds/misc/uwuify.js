module.exports.run = async (bot, msg, args) => {
	const owoify = require('owoify-js').default;
	const prefix = process.env.PREFIX;
	let words = msg.content.substring(prefix.length + 7);

	let faces = ['uwu', 'uvu'];

	if (!words) {
		return msg.channel.send('Need text to uwuify. Send .uwuify <text> ');
	}

	let FinalMsg = await owoify(words, faces[Math.floor(Math.random() * faces.length)]);
	msg.channel.send(FinalMsg);
};

module.exports.help = {
	name: 'uwuify',
	description: 'when you have to catfish a discord mod',
};
