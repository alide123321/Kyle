module.exports.run = async (bot, msg, args) => {
	const Discord = require('discord.js');
	let db = require('quick.db');
	let vcName = new db.table('vcName');
	require('dotenv').config();

	let AllowedRoles = [
		'Head Admins',
		'Developer',
		'Admins',
		'Moderators',
		'VIP',
		'Nitro Booster',
		'[50+] Gods',
		'Streamers',
	];

	if (msg.member.roles.cache.some((r) => AllowedRoles.includes(r.name))) {
		let name = msg.content.substring(process.env.PREFIX.length + 7); // 7 bc vcname is 6 long + one space

		if (args[1] === 'reset') {
			vcName.delete(`${msg.author.id}`);
			return msg.channel.send('Done!');
		}

		if (name.length > 85)
			return msg.channel.send(
				`Sorry but the name has to be below 85 characters you have ${name.length()}`
			);

		if (name.length <= 0)
			return msg.channel.send('Sorry but the name has to be above 0 characters');

		let SucsessEmbed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('**Preview**')
			.setURL('https://discord.gg/z4FpxSJ')
			.setThumbnail(msg.author.avatarURL())
			.addFields(
				{
					name: '**Private Room**',
					value: name,
				},
				{
					name: '**Waiting Room**',
					value: `${name} [waiting room]`,
				}
			)
			.setFooter('If you dont like it you can do `.vcname reset`');

		await vcName.set(`${msg.author.id}`, name);
		msg.channel.send(SucsessEmbed);
	} else {
		let ErrorEmbed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('**Sorry**')
			.setURL('https://discord.gg/z4FpxSJ')
			.setImage(aki.answers[0].absolute_picture_path)
			.setDescription(`Sorry but you need one of these roles \n${AllowedRoles}`);

		msg.channel.send(ErrorEmbed);
	}
};

module.exports.help = {
	name: 'vcname',
};
