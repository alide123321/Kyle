module.exports.run = async (bot, msg, args) => {
	const talkedRecently = require('../../assets/functions/talked.js').talkedRecently;
	const sleep = require('../../assets/functions/sleep.js').sleep;

	if (talkedRecently.has(msg.author.id) && msg.author.id !== '698051518754062387') {
		msg.channel.send('Cooldown 120 sec');
		sleep(1000);
		return msg.delete();
	}

	talkedRecently.add(msg.author.id);
	setTimeout(() => {
		talkedRecently.delete(msg.author.id);
	}, 120000);

	if (msg.content.includes('@') && msg.author.id !== '698051518754062387')
		return msg.channel.send('No.');

	for (var i = 0; i !== 5; ++i) msg.reply(` said: ${msg.content.slice(5)} `);
};

module.exports.help = {
	name: 'spam',
};
