const fetch = require('node-fetch');

module.exports.run = async (bot, msg, args) => {
	let doggo = await fetch('https://dog.ceo/api/breeds/image/random')
		.then((res) => res.json())
		.then((json) => json.message);

	msg.channel.send(doggo);
};

module.exports.help = {
	name: 'doggo',
	description: 'Random picture of a dog',
};
