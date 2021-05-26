module.exports.run = async (bot, msg, args) => {
	const Discord = require('discord.js');
	const db = require('quick.db');
	var economy = new db.table('economy');

	if (msg.author.id !== '698051518754062387')
		return msg.channel.send('Only Alide can use this command');

	if (args[1] !== '-y')
		return msg.channel.send('Are you sure you want to reset everyone? if so use the tag -y');

	economy.set(`Prizepool`, 0);

	var allusers = (await msg.guild.members.fetch()).keyArray('id');
	var send = [];

	for (let x = 0; x <= allusers.length; ++x) {
		if (economy.get(`${allusers[x]}.bal`)) {
			let mon = economy.get(`${allusers[x]}.bal`);
			economy.subtract(`${allusers[x]}.bal`, mon);
			send.push(`${(await msg.guild.members.fetch(allusers[x])).displayName} -- ${mon}`);
		}
	}

	let resetem = new Discord.MessageEmbed()
		.setTitle('**Reseted Users**')
		.setColor('#0099ff')
		.setDescription(send);
	msg.channel.send(resetem);
};

module.exports.help = {
	name: 'resetbal',
	description: 'No.',
	AllowModest: true,
};
