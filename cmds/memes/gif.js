module.exports.run = async (bot, msg, args) => {
	const fetch = require('node-fetch');

	if (!args[1]) {
		let ErrorEmbed = new Discord.MessageEmbed()
			.setTitle('**ERROR**')
			.setColor(0xff0000)
			.setThumbnail(msg.author.avatarURL())
			.setDescription('What do you want to search? `.gif Your_mom`');
		return msg.channel.send(ErrorEmbed);
	}

	let response = await fetch(
		`https://api.tenor.com/v1/search?q=${args[1]}&key=${process.env.TENOR_API_KEY}&contentfilter=high`
	);
	let json = await response.json();
	let index = Math.floor(Math.random() * json.results.length);

	msg.channel.send(
		json.results[index] ? json.results[index].url : 'No gif was found with your search parameters.'
	);
};

module.exports.help = {
	name: 'gif',
};
