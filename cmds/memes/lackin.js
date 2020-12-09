module.exports.run = async (bot, msg, args) => {
	if (args[1] === '2') {
		return msg.channel.send(
			'https://cdn.discordapp.com/attachments/708429793447772161/779375953255202856/image0.jpg'
		);
	} else {
		return msg.channel.send(
			'https://cdn.discordapp.com/attachments/708429793447772161/779376198878756874/image0.jpg'
		);
	}
};

module.exports.help = {
	name: 'lackin',
};
