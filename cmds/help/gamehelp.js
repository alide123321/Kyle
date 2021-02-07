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
		.addFields({ name: '**Game commands**', value: 'Check out the commands on our website' });

	Fs.readdir('./cmds/games/', (err, files) => {
		if (err) console.error(err);

		let jsfiles = files.filter((f) => f.split('.').pop() === 'js');

		jsfiles.forEach((f, i) => {
			let props = require(`../games/${f}`);
			let name = props.help.Alias ? `${props.help.name} [${props.help.Alias}]` : props.help.name;
			let disc = props.help.description ? props.help.description : i + 1;
			gamhelp.addFields({ name: `**${prefix}${name}**`, value: disc, inline: true });
		});

		msg.channel.send(gamhelp);
	});
};

module.exports.help = {
	name: 'gamehelp',
	description: 'Get a list of all my games',
};
