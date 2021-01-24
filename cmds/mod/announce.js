module.exports.run = async (bot, msg, args) => {
	const Discord = require('discord.js');

	let chat = bot.channels.cache.get('707451011471507466');

	if (!msg.member.hasPermission('ADMINISTRATOR'))
		return msg.channel.send("Dumb, dumb, you're not an admin.");

	if (!args[1])
		return msg.channel.send(
			'The format for this command is .announce <0/1/2/3> <title>\n0-no one\n1-everyone\n2-gamenight\n3-movienight'
		);

	if (!args[2])
		return msg.channel.send(
			'The format for this command is .announce <0/1/2/3> <title>\n0-no one\n1-everyone\n2-gamenight\n3-movienight'
		);

	if (isNaN(args[1]))
		return msg.channel.send(
			'The format for this command is .announce <0/1/2/3> <title>\n0-no one\n1-everyone\n2-gamenight\n3-movienight'
		);

	if (args[1] !== '0' && args[1] !== '1' && args[1] !== '2' && args[1] !== '3')
		return msg.channel.send(
			'The format for this command is .announce <0/1/2/3> <title>\n0-no one\n1-everyone\n2-gamenight\n3-movienight'
		);

	let mention = ' ';
	if (args[1] === '1') mention = '@everyone';
	if (args[1] === '2') mention = '<@&740828344794349658>';
	if (args[1] === '3') mention = '<@&740828341069676594>';

	let text = msg.content;
	let title = text.slice(12);

	msg.channel.send('What do you want the description to be? You have 60 seconds to type it.');
	let disc = ' ';
	msg.channel
		.awaitMessages((m) => m.author.id == msg.author.id, { max: 1, time: 60000 })
		.then((collected) => {
			disc = collected.first().content;

			let announce = new Discord.MessageEmbed()
        		.setColor("#0099ff")
        		.setTitle("**" + title + "**")
        		.setURL("https://discord.gg/z4FpxSJ")
        		.setDescription(disc)
        		.setThumbnail("https://cdn.discordapp.com/attachments/739019780576641096/739022260857470981/Discord_Rose.png"); // prettier-ignore

			if (args[1] !== 0) chat.send(`|| ${mention} ||`);
			chat.send(announce);
			chat.send({ files: ['./assets/images/bar.gif'] });
		});
};

module.exports.help = {
	name: 'announce',
	description: 'Send a announcement message that looks good',
};
