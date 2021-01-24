module.exports.run = async (bot, msg, args) => {
	let imageNum = Math.floor(Math.random() * 7) + 1;
	msg.channel.send({ files: ['./assets/images/oof' + imageNum + '.jpg'] });
};

module.exports.help = {
	name: 'oof',
	description: 'Pain',
};
