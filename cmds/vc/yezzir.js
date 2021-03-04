module.exports.run = async (bot, msg, args) => {
	const vc = require('../../assets/functions/vc.js').vc;

	vc('yezzir', 0.7, msg);
	msg.channel.send(
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMrNQ4_2AhO2lNtQrFl14O79bwPkJUV_y7Bg&usqp=CAU'
	);
};

module.exports.help = {
	name: 'yezzir',
	Alias: 'yessir',
	description: 'YES SIRR.',
};
