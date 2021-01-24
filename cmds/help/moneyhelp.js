module.exports.run = async (bot, msg, args) => {
	const Discord = require('discord.js');
	const Fs = require('fs');
	const prefix = process.env.PREFIX;

	let balhelp = new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setTitle('**Money Commands**')
		.setURL('https://sites.google.com/view/kyle-bot/home')
		.setThumbnail(
			'https://cdn.discordapp.com/attachments/739019780576641096/739022260857470981/Discord_Rose.png'
		)
		.addFields({ name: '**Money Commands**', value: 'Check out the commands on our website' });

	Fs.readdir('./cmds/money/', (err, files) => {
		if (err) console.error(err);

		let jsfiles = files.filter((f) => f.split('.').pop() === 'js');

		jsfiles.forEach((f, i) => {
			let props = require(`../money/${f}`);
			let name = props.help.Alias ? `${props.help.name} [${props.help.Alias}]` : props.help.name;
			let disc = props.help.description ? props.help.description : i + 1;
			balhelp.addFields({ name: `**${prefix}${name}**`, value: disc, inline: true });
		});

		msg.channel.send(balhelp);
	});
};

module.exports.help = {
	name: 'moneyhelp',
};
