require('dotenv').config();
const fetch = require('node-fetch').default;

module.exports.run = async (bot, msg, args) => {
	let text = msg.content.substring(process.env.PREFIX.length + 5);
	if (!text) return msg.channel.send('Sup?');

	fetch(`https://api.snowflakedev.xyz/api/chatbot?message=${encodeURIComponent(text)}&name=Kyle`, {
		headers: { Authorization: process.env.SnowFlakeToken },
	})
		.then((res) => res.json())
		.then((data) => {
			msg.channel.send(data.message);
		})
		.catch((e) => {
			return msg.channel.send(`**ERROR** ${e}`);
		});
};

module.exports.help = {
	name: 'kyle',
	description: 'Talk to me',
};
