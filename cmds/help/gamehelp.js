module.exports.run = async (bot, msg, args) => {
	const sleep = require('../../assets/functions/sleep.js').sleep;
	const Discord = require('discord.js');
	const Fs = require('fs');
	const prefix = process.env.PREFIX;

	Fs.readdir('./cmds/games/', (err, files) => {
		if (err) console.error(err);

		let jsfiles = files.filter((f) => f.split('.').pop() === 'js');
		let cmdArr = [];
		let currentPage = 0;

		var bar = new Promise((resolve, reject) => {
			jsfiles.forEach((f, i, array) => {
				let props = require(`../games/${f}`);
				let obj = {
					name: props.help.Alias
						? ` **${prefix}${props.help.name} [${props.help.Alias}]**`
						: `**${prefix}${props.help.name}**`,
					disc: props.help.description ? props.help.description : i + 1,
				};
				cmdArr.push(obj);

				if (i === array.length - 1) {
					resolve();
				}
			});
		}).then(async () => {
			const embeds = generateQueueEmbed(msg, cmdArr);

			if (embeds.length === 1) {
				return msg.channel.send(embeds[currentPage]);
			}

			const queueEmbed = await msg.channel.send(
				`**Current Page - ${currentPage + 1}/${embeds.length}**`,
				embeds[currentPage]
			);

			try {
				await queueEmbed.react('⬅️');
				await queueEmbed.react('⏹');
				await queueEmbed.react('➡️');
			} catch (error) {
				console.error(error);
				msg.channel.send(error.message).catch(console.error);
			}

			const filter = (reaction, user) =>
				['⬅️', '⏹', '➡️'].includes(reaction.emoji.name) && msg.author.id === user.id;
			const collector = queueEmbed.createReactionCollector(filter, { time: 60000 });

			collector.on('collect', async (reaction, user) => {
				try {
					if (reaction.emoji.name === '➡️') {
						if (currentPage < embeds.length - 1) {
							currentPage++;
							queueEmbed.edit(
								`Current Page - ${currentPage + 1} / ${embeds.length}`,
								embeds[currentPage]
							);
						}
					} else if (reaction.emoji.name === '⬅️') {
						if (currentPage !== 0) {
							--currentPage;
							queueEmbed.edit(
								`Current Page - ${currentPage + 1} / ${embeds.length}`,
								embeds[currentPage]
							);
						}
					} else {
						collector.stop();
						reaction.message.reactions.removeAll();
					}
					await reaction.users.remove(msg.author.id);
				} catch (error) {
					console.error(error);
					return msg.channel.send(error.message).catch(console.error);
				}
			});
		});
	});

	function generateQueueEmbed(msg, arr) {
		let embeds = [];
		let k = 24;

		for (let i = 0; i < arr.length; i += 24) {
			const current = arr.slice(i, k);
			let j = i;
			k += 24;

			const embed = new Discord.MessageEmbed()
				.setTitle('**Game commands**')
				.setThumbnail(msg.guild.iconURL())
				.setColor('#0099ff')
				.setURL('https://sites.google.com/view/kyle-bot/home')
				.setThumbnail(
					'https://cdn.discordapp.com/attachments/739019780576641096/739022260857470981/Discord_Rose.png'
				)
				.addFields({ name: '**Game commands**', value: 'Check out the commands on our website' });

			current.forEach((f) => {
				embed.addFields({ name: f.name, value: f.disc, inline: true });
			});

			embeds.push(embed);
		}

		return embeds;
	}
};

module.exports.help = {
	name: 'gamehelp',
	description: 'Get a list of all my games',
};
