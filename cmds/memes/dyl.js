module.exports.run = async (bot, msg, args) => {
	msg.channel
		.send('https://cdn.discordapp.com/attachments/707451317626470455/798586756441440266/ali.mp4')
		.then((Smsg) => {
			Smsg.react('😭');
		});
};

module.exports.help = {
	name: 'dyl',
	description: 'Small PP',
};
