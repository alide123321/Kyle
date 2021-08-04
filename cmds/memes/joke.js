module.exports.run = async (bot, msg, args) => {
	const Discord = require('discord.js');
	var unirest = require('unirest');

	var req = unirest('GET', 'https://manatee-jokes.p.rapidapi.com/manatees/random');

	req.headers({
		'x-rapidapi-key': '73d301f3eemshb03e814d13d59d4p105050jsn9c11ec6d87e2',
		'x-rapidapi-host': 'manatee-jokes.p.rapidapi.com',
		useQueryString: true,
	});

	req.end(function (res) {
		if (res.error) return msg.channel.send('shit broken tell alide to fix it');

		msg.channel.send(res.body.setup);
		msg.channel.send(res.body.punchline);
	});
};

module.exports.help = {
	name: 'joke',
	description: 'A random joke',
};
