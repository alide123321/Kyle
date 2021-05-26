module.exports.run = async (bot, msg, args) => {
	const Discord = require('discord.js');
	const db = require('quick.db');
	var economy = new db.table('economy');

	if (msg.author.id !== '698051518754062387')
		return msg.channel.send('Only Alide can use this command');

	if (args[1] !== '-y')
		return msg.channel.send('Are you sure you want to reset everyone? if so use the tag -y');

	var allusers = (await msg.guild.members.fetch()).keyArray('id');
	var send = [];

	for (let x = 0; x <= allusers.length; ++x) {
		if (economy.get(`${allusers[x]}.lc`)) {
			economy.set(`${allusers[x]}.lc`, 0);
			economy.set(`${allusers[x]}.lcW`, 0);
			send.push((await msg.guild.members.fetch(allusers[x])).displayName);
		}
	}

	let resetem = new Discord.MessageEmbed()
		.setTitle('**Reseted Users**')
		.setColor('#0099ff')
		.setDescription(send);
	msg.channel.send(resetem);
};

module.exports.help = {
	name: 'resetlc',
	description: 'No.',
	AllowModest: true,
};
