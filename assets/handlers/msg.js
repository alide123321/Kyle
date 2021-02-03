const { bot } = require('../../index');

bot.on('message', async (msg) => {
	const Discord = require('discord.js');
	const cooldown = require('../functions/cool.js').cooldown;
	const sleep = require('../../assets/functions/sleep.js').sleep;
	require('dotenv').config();

	if (msg.author.bot && msg.author.id !== '302050872383242240') return;

	let args = msg.content.toLowerCase().substring(process.env.PREFIX.length).split(/\s+/g);
	let text = msg.content.toLowerCase();
	let msgarray = msg.content.split(/\s+/g);
	let command = msgarray[0].toLowerCase();

	if (msg.guild === null) {
		if (text.charAt(0) !== process.env.PREFIX)
			return msg.author.send(`LOL stupid thats not a command try ${process.env.PREFIX}help`);

		var dmhelp = [
			'**' + process.env.PREFIX + 'help__________will bring up this page**',
			"**" + process.env.PREFIX + "report________to report someone/something in the Wonderland server**", //prettier-ignore
			'**' + process.env.PREFIX + 'join__________send you a server invite link**',
		];

		switch (args[0]) {
			case 'help': {
				let help = new Discord.MessageEmbed()
					.setColor(0x0099ff)
					.setTitle('All the commands')
					.setURL('https://discord.gg/gBQc5cm')
					.setThumbnail(
						'https://cdn.discordapp.com/attachments/739019780576641096/739022260857470981/Discord_Rose.png'
					)
					.setDescription(dmhelp)
					.setFooter('I have diffrent commands if use me inside a server');

				msg.author.send(help);

				break;
			}

			case 'report': {
				if (!args[1]) {
					const embed = new Discord.MessageEmbed()
						.setColor(0xde3333)
						.setTitle('404')
						.setDescription(
							'What do you want to report (only administrators will see your report)'
						);
					msg.author.send(embed);
				} else {
					let msgArgs = args.slice(1).join(' ');

					let Wonderland = bot.channels.cache.get('719454080543490058'); // Wonderland channelReports

					let embed = new Discord.MessageEmbed()
						.setColor(0x71b3f5)
						.setTitle('Report status:')
						.setDescription('Your report has been successfully filed! :upside_down:');
					msg.author.send(embed);

					let reportData = new Discord.MessageEmbed()
						.setColor(0x71b3f5)
						.setTitle(msg.author.username + "'s Report:")
						.setDescription(msgArgs)
						.setFooter('at: ' + msg.createdAt);

					Wonderland.send(reportData);
				}
				break;
			}

			case 'join': {
				let joinem = new Discord.MessageEmbed()
					.setColor(0x0099ff)
					.setTitle('Click Here to join back')
					.setURL('https://discord.gg/z4FpxSJ')
					.setDescription('https://discord.gg/z4FpxSJ')
					.setThumbnail(
						'https://cdn.discordapp.com/attachments/739019780576641096/739022260857470981/Discord_Rose.png'
					)
					.setFooter('I have diffrent commands if use me inside a server');
				msg.author.send(joinem);

				break;
			}
		}
		return;
	}

	let discordInvite = /(https:\/\/)?(www\.)?(discord\.gg|discord\.me|discordapp\.com\/invite|discord\.com\/invite)\/([a-z0-9-.]+)?/i; //checks for links
	if (discordInvite.test(text) && !msg.member.hasPermission('ADMINISTRATOR')) return msg.delete();

	if (text.includes('kys') || text.includes('i wanna die') || text.includes('kms')) {
		msg.channel.send('https://suicidepreventionlifeline.org/');
	}

	if (msg.channel.id === '716206448970825799') {
		//removes !d bump
		if (text.startsWith('redo')) {
			try {
				msg.delete();
				let doneem = new Discord.MessageEmbed()
        		.setTitle("**!D BUMP**")
        		.setDescription("Help grow the server by using the command **!d bump** - it helps other people find and join the server to grow the fam!"); // prettier-ignore
				msg.channel.send(doneem);
			} catch (error) {
				console.log(`*Error ${error}`);
			}
			return;
		} else {
			try {
				sleep(1000);
				msg.delete();
			} catch (error) {
				console.log(`*Error ${error}`);
			}
			return;
		}
	}

	if (msg.author.id === '302050872383242240') return; // d bump bot

	if (
		msg.author.id === '326895102708547585' || //modest
		msg.author.id === '575142986988650506' // mexican
	)
		return;

	if (!command.startsWith(process.env.PREFIX)) return;

	if (cooldown.has(msg.author.id) && msg.author.id !== '698051518754062387')
		return msg.channel.send('Cooldown 2 sec');

	cooldown.add(msg.author.id);
	setTimeout(() => {
		cooldown.delete(msg.author.id);
	}, 2000);

	let cmd = bot.commands.get(command.slice(process.env.PREFIX.length));

	if (cmd) cmd.run(bot, msg, args);
});

module.exports.help = {
	name: 'msg',
};
