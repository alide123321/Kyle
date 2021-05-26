module.exports.run = async (bot, msg, args) => {
	msg.channel.send('Please DM me to report.');
};

module.exports.help = {
	name: 'report',
	description: 'Report something for staff to see',
	AllowModest: true,
};
