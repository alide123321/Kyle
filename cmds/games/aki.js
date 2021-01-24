module.exports.run = async (bot, msg, args) => {
	const sleep = require('../../assets/functions/sleep.js').sleep;
	const playingGame = require('../../assets/functions/playingGame.js').playingGame;

	const Discord = require('discord.js');
	const { Aki } = require('aki-api');

	if (playingGame.has(msg.author.id))
		return msg.channel.send('You are already playing a game finish it to start a new one');

	playingGame.add(msg.author.id);

	if (args[1] === '--clean') {
		var childMode = 'pseudo';
	} else {
		var childMode = false;
	}

	let end = false;
	let CertaintyWait = 3;

	msg.channel.send('`This takes a second please wait    *`').then((m) => {
		sleep(250);
		m.delete();
	});

	const aki = new Aki('en', childMode);
	await aki.start();

	while (!end) {
		var answer = 0;
		let QuestionEmbed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('**React to one**')
			.setURL('https://discord.gg/z4FpxSJ')
			.setThumbnail(msg.author.avatarURL())
			.addFields(
				{
					name: '**Question**',
					value: aki.question,
					inline: true,
				},
				{
					name: '**Certainty**',
					value: `%${aki.progress}`,
					inline: true,
				},
				{
					name: '\u200B',
					value: '\u200B',
				},
				{
					name: '**Yes**',
					value: '1️⃣',
					inline: true,
				},
				{
					name: '**No**',
					value: '2️⃣',
					inline: true,
				},
				{
					name: "**Don't know**",
					value: '3️⃣',
					inline: true,
				},
				{
					name: '**Probably**',
					value: '4️⃣',
					inline: true,
				},
				{
					name: '**Probably not**',
					value: '5️⃣',
					inline: true,
				}
			);

		await msg.channel.send(QuestionEmbed).then(async (sentmsg) => {
			sentmsg.react('1️⃣');
			sentmsg.react('2️⃣');
			sentmsg.react('3️⃣');
			sentmsg.react('4️⃣');
			sentmsg.react('5️⃣');

			const filter = (reaction, user) => {
				return (
					['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣'].includes(reaction.emoji.name) && user.id === msg.author.id
				);
			};

			await sentmsg
				.awaitReactions(filter, { max: 1, time: 15000, errors: ['time'] })
				.then(async (collected) => {
					const reaction = collected.first();

					if (reaction.emoji.name === '1️⃣') {
						answer = 0;
					} else if (reaction.emoji.name === '2️⃣') {
						answer = 1;
					} else if (reaction.emoji.name === '3️⃣') {
						answer = 2;
					} else if (reaction.emoji.name === '4️⃣') {
						answer = 3;
					} else if (reaction.emoji.name === '5️⃣') {
						answer = 4;
					}

					await aki.step(answer);
				})
				.catch((error) => {
					end = true;
					msg.reply('Time ended bye');
				});
		});

		if (aki.progress >= 70 || aki.currentStep >= 100) {
			if (CertaintyWait === 3) {
				await aki.win();

				let EndEmbed = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('**React to one**')
					.setURL('https://discord.gg/z4FpxSJ')
					.setImage(aki.answers[0].absolute_picture_path)
					.setDescription(
						`**Is it "${aki.answers[0].name}"?** (%${Math.floor(
							aki.answers[0].proba * 100
						)} certain)`
					);

				await msg.channel.send(EndEmbed).then(async (sentmsg) => {
					sentmsg.react('✅');
					sentmsg.react('❌');

					const filter = (reaction, user) => {
						return ['✅', '❌'].includes(reaction.emoji.name) && user.id === msg.author.id;
					};
					await sentmsg
						.awaitReactions(filter, { max: 1, time: 15000, errors: ['time'] })
						.then((collected) => {
							const reaction = collected.first();
							if (reaction.emoji.name === '✅') {
								end = true;
								msg.channel.send('GG thank you for playing');
							} else if (reaction.emoji.name === '❌') {
								end = false;
							}
						})
						.catch((error) => {
							end = true;
							msg.reply('Time ended bye');
						});
				});

				CertaintyWait = 0;
			} else {
				++CertaintyWait;
			}
		}
	}

	playingGame.delete(msg.author.id);
};

module.exports.help = {
	name: 'akinator',
	Alias: 'aki',
	description: 'Play akinator',
};
