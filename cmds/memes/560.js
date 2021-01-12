module.exports.run = async (bot, msg, args) => {
	if (args[0] === 'pepper') {
		msg.channel
			.send(
				'https://cdn.discordapp.com/attachments/797563220020822038/798580702580047912/videoplayback.mp4'
			)
			.then((Smsg) => {
				Smsg.react('🧂');
			});
		return;
	}
};

module.exports.help = {
	name: '560',
};
