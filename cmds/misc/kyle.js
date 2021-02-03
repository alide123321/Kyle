require('dotenv').config();
var fs = require('fs');
const ChatBotObj = JSON.parse(fs.readFileSync('assets/util/ChatBot.json'));
const Derieri = require('derieri');
const timeout = 180000; //3 min
const deri = new Derieri.Client({
	islearning: true,
});

module.exports.run = async (bot, msg, args) => {
	let text = msg.content.substring(process.env.PREFIX.length + 5);
	if (!args[1]) return msg.channel.send('What?');

	if (!ChatBotObj[msg.author.id]) {
		deri.reply(text).then((response) => {
			msg.channel.send(response);
		});
		ChatBotObj[msg.author.id] = {
			Previous: [text],
			LM: new Date().getTime(),
		};
		fs.writeFileSync('assets/util/ChatBot.json', JSON.stringify(ChatBotObj));
	} else {
		if (timeout - (Date.now() - ChatBotObj[msg.author.id].LM) <= 0) {
			deri.reply(text).then((response) => {
				msg.channel.send(response);
			});
			ChatBotObj[msg.author.id] = {
				Previous: [text],
				LM: new Date().getTime(),
			};
			return fs.writeFileSync('assets/util/ChatBot.json', JSON.stringify(ChatBotObj));
		}
		let PreviousArr = ChatBotObj[msg.author.id].Previous;

		deri.reply(text, PreviousArr).then((response) => {
			msg.channel.send(response);
		});
		PreviousArr.push(text);
		ChatBotObj[msg.author.id] = {
			Previous: PreviousArr,
			LM: new Date().getTime(),
		};
		fs.writeFileSync('assets/util/ChatBot.json', JSON.stringify(ChatBotObj));
	}
};

module.exports.help = {
	name: 'kyle',
	description: 'Talk to me',
};
