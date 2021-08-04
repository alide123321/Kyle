module.exports.run = async (bot, msg, args) => {
	var unirest = require('unirest');

	var req = unirest('GET', 'https://manatee-jokes.p.rapidapi.com/manatees/random');

	req.headers({
		'x-rapidapi-key': process.env.RAPIDAPI,
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
