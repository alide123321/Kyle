const { MessageEmbed, splitMessage, escapeMarkdown } = require('discord.js');
const parseMilliseconds = require('parse-ms');

module.exports.run = async (bot, msg, args) => {
	let serverQueue = msg.client.queue.get(msg.guild.id);
	if (!serverQueue) return msg.reply('There is nothing playing.').catch(console.error);

	let description = '';

	for (let index in serverQueue.songs) {
		let song = serverQueue.songs[index];
		let time = parseMilliseconds(song.duration * 1000);
		let min = time.minutes;
		let sec = time.seconds;
		if (min < 10) min = `0${min}`;
		if (sec < 10) sec = `0${sec}`;

		description = description.concat(
			`${parseInt(index) + 1}.  **${song.title}** [${min}:${sec}]\n\n`
		);
	}

	let queueEmbed = new MessageEmbed()
		.setTitle('Music Queue')
		.setDescription(description)
		.setColor('#F8AA2A');

	let splitDescription = splitMessage(description, {
		maxLength: 2048,
		char: '\n',
		prepend: '',
		append: '',
	});

	splitDescription.forEach(async (m) => {
		queueEmbed.setDescription(m);
		msg.channel.send(queueEmbed);
	});
};

module.exports.help = {
	name: 'queue',
	Alias: 'q',
};
