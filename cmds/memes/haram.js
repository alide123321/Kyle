module.exports.run = async (bot, msg, args) => {
	const Discord = require('discord.js');
	let mentioned = msg.mentions.members.first();
	let haramLevel = Math.floor(Math.random() * 101);

	if (mentioned) {
		if (mentioned.id === '796126990981791784' || mentioned.id === '698051518754062387') {
			haramLevel = 0;
		}

		if (haramLevel === 50) {
			let exampleEmbed = new Discord.MessageEmbed()
				.setTitle(`**Using the Haram detector on ${mentioned.user.username} **`)
				.setColor('#ffffff')
				.setDescription(`perfectly balanced as all things should be: ${haramLevel}%`)
				.setThumbnail(mentioned.user.avatarURL())
				.setImage('https://www.meme-arsenal.com/memes/812145c2c54e73335353c9b9531bd5e1.jpg');

			return msg.channel.send(exampleEmbed);
		}

		if (haramLevel > 50) {
			let exampleEmbed = new Discord.MessageEmbed()
				.setTitle(`**Using the Haram detector on ${mentioned.user.username} **`)
				.setColor('#ffffff')
				.setDescription(`Astagfirullah, go pray: ${haramLevel}%`)
				.setThumbnail(mentioned.user.avatarURL())
				.setImage('https://memegenerator.net/img/instances/66234285.jpg');

			return msg.channel.send(exampleEmbed);
		}

		if (haramLevel < 50) {
			let exampleEmbed = new Discord.MessageEmbed()
				.setTitle(`**Using the Haram detector on ${mentioned.user.username} **`)
				.setColor('#ffffff')
				.setDescription(`Mashallah my brother, see you at friday prayer: ${haramLevel}%`)
				.setThumbnail(mentioned.user.avatarURL())
				.setImage('https://i.kym-cdn.com/photos/images/facebook/001/129/144/1b9.jpg');

			return msg.channel.send(exampleEmbed);
		}
	} else {
		if (msg.author.id === '796126990981791784' || msg.author.id === '698051518754062387') {
			haramLevel = 0;
		}

		if (haramLevel === 50) {
			let exampleEmbed = new Discord.MessageEmbed()
				.setTitle(`**Using the Haram detector on ${msg.author.username} **`)
				.setColor('#ffffff')
				.setDescription(`perfectly balanced as all things should be: ${haramLevel}%`)
				.setThumbnail(msg.author.avatarURL())
				.setImage('https://www.meme-arsenal.com/memes/812145c2c54e73335353c9b9531bd5e1.jpg');

			return msg.channel.send(exampleEmbed);
		}

		if (haramLevel > 50) {
			let exampleEmbed = new Discord.MessageEmbed()
				.setTitle(`**Using the Haram detector on ${msg.author.username} **`)
				.setColor('#ffffff')
				.setDescription(`Astagfirullah, go pray: ${haramLevel}%`)
				.setThumbnail(msg.author.avatarURL())
				.setImage('https://memegenerator.net/img/instances/66234285.jpg');

			return msg.channel.send(exampleEmbed);
		}

		if (haramLevel < 50) {
			let exampleEmbed = new Discord.MessageEmbed()
				.setTitle(`**Using the Haram detector on ${msg.author.username} **`)
				.setColor('#ffffff')
				.setDescription(`Mashallah my brother, see you at friday prayer: ${haramLevel}%`)
				.setThumbnail(msg.author.avatarURL())
				.setImage('https://i.kym-cdn.com/photos/images/facebook/001/129/144/1b9.jpg');

			return msg.channel.send(exampleEmbed);
		}
	}
};

module.exports.help = {
	name: 'haram',
	description: 'Check someones haram level',
};
