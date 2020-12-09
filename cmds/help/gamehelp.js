module.exports.run = (bot, msg, args) => {
	const Discord = require('discord.js');
	const Fs = require('fs');
	const prefix = process.env.PREFIX;

	let gamhelp = new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setTitle('**Game commands**')
		.setURL('https://sites.google.com/view/kyle-bot/home')
		.setThumbnail(
			'https://cdn.discordapp.com/attachments/739019780576641096/739022260857470981/Discord_Rose.png'
		)
		.addFields(
			{
				name: 'Check out the commands on our website',
				value: '`_____________________________________`',
			},
			{ name: '**Game commands**', value: '`_________________`' }
		);

	Fs.readdir('./cmds/games/', (err, files) => {
		if (err) console.error(err);

		let jsfiles = files.filter((f) => f.split('.').pop() === 'js');

		jsfiles.forEach((f, i) => {
			f = f.slice(0, f.length - 3);
			gamhelp.addFields({ name: `**${prefix}${f}**`, value: i + 1, inline: true });
		});

		msg.channel.send(gamhelp);
	});
};

module.exports.help = {
	name: 'gamehelp',
};
