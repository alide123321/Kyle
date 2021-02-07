module.exports.run = async (bot, msg, args) => {
	const Discord = require('discord.js');
	const Fs = require('fs');
	const prefix = process.env.PREFIX;

	let musichelp = new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setTitle('**Music commands**')
		.setURL('https://sites.google.com/view/kyle-bot/home')
		.setThumbnail(
			'https://cdn.discordapp.com/attachments/739019780576641096/739022260857470981/Discord_Rose.png'
		)
		.addFields({ name: '**Music commands**', value: 'Check out the commands on our website' });

	Fs.readdir('./cmds/music/', (err, files) => {
		if (err) console.error(err);

		let jsfiles = files.filter((f) => f.split('.').pop() === 'js');

		jsfiles.forEach((f, i) => {
			let props = require(`../music/${f}`);
			let name = props.help.Alias ? `${props.help.name} [${props.help.Alias}]` : props.help.name;
			let disc = props.help.description ? props.help.description : i + 1;
			musichelp.addFields({ name: `**${prefix}${name}**`, value: disc, inline: true });
		});

		msg.channel.send(musichelp);
	});
};

module.exports.help = {
	name: 'musichelp',
	description: 'List of music commands',
};
