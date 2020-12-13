module.exports.run = async (bot, msg, args) => {
	try {
		const Discord = require('discord.js');
		let Total = msg.guild.memberCount;
		let bots = msg.guild.members.cache.filter((m) => m.user.bot).size;
		let users = Total - bots;
		let Voice = 0;
		const voiceChannels = msg.guild.channels.cache.filter((c) => c.type === 'voice');
		for (const [id, voiceChannel] of voiceChannels) Voice += voiceChannel.members.size;

		let Stats = new Discord.MessageEmbed()
			.setTitle('**Server Stats**')
			.setColor(0x5fb4f5)
			.setThumbnail(msg.guild.iconURL())
			.addFields(
				{
					name: 'Total Members: ',
					value: Total,
					inline: true,
				},
				{
					name: 'Users: ',
					value: users,
					inline: true,
				},
				{
					name: 'Bots: ',
					value: bots,
					inline: true,
				},
				{
					name: 'In Voice: ',
					value: Voice,
					inline: true,
				},
				{
					name: 'Owner: ',
					value: `<@${msg.guild.ownerID}>`,
					inline: true,
				}
			);

		msg.channel.send(Stats);

		if (msg.guild.id !== '599061990828277770') return; //wonderland server
		msg.guild.channels.cache.get('715444945602740244').setName(`Total Members: ${Total}`); // 770998780404957235
		msg.guild.channels.cache.get('715444948568244305').setName(`Users: ${Total - bots}`); // 770998825677488178
		msg.guild.channels.cache.get('715444951332290591').setName(`Bots: ${bots}`); // 770998873937805383
	} catch (error) {
		console.log(error);
	}
};

module.exports.help = {
	name: 'serverstats',
};
