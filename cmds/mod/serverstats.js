module.exports.run = async (bot, msg, args) => {
	const moment = require('moment');
	try {
		const Discord = require('discord.js');
		let Total = await msg.guild.memberCount;
		let bots = await msg.guild.members.cache.filter((m) => m.user.bot).size;
		let icon, splash;
		let Voice = 0;
		const voiceChannels = await msg.guild.channels.cache.filter((c) => c.type === 'voice');
		for (const [id, voiceChannel] of voiceChannels) Voice += voiceChannel.members.size;

		let Stats = new Discord.MessageEmbed().setTitle('**Server Stats**').setColor(0x5fb4f5);

		if (msg.guild.iconURL) {
			icon = `[Click](${msg.guild.iconURL()})`;
			Stats.setThumbnail(msg.guild.iconURL());
		} else icon = 'None';

		if (msg.guild.splash) {
			let splashURL = `https://cdn.discordapp.com/icons/${guild.id}/${guild.splash}.png?size=4096`;
			splash = `[Click](${splashURL})`;
			Stats.setImage(splashURL);
		} else splash = 'None';

		if (args[1] > 0) {
			Stats.addFields(
				{
					name: 'Name',
					value: msg.guild.name,
					inline: true,
				},
				{
					name: 'ID',
					value: msg.guild.id,
					inline: true,
				},
				{
					name: 'Owner',
					value: msg.guild.owner,
					inline: true,
				},
				{
					name: 'Created on',
					value: moment(msg.guild.createdTimestamp).format('M/D/YY h:mm:ss A'),
					inline: true,
				},
				{
					name: 'AFK Timeout',
					value: msg.guild.afkChannel ? msg.guild.afkTimeout : 'None',
					inline: true,
				},
				{
					name: 'Region',
					value: msg.guild.region,
					inline: true,
				},
				{
					name: 'Icon',
					value: icon,
					inline: true,
				},
				{
					name: 'Splash',
					value: splash,
					inline: true,
				}
			);
		}

		if (args[1] > 1) {
			Stats.addFields(
				{
					name: 'Verification',
					value: msg.guild.verificationLevel,
					inline: true,
				},
				{
					name: '2FA Requirement',
					value: msg.guild.mfaLevel ? 'On' : 'Off',
					inline: true,
				},
				{
					name: 'Content Filter',
					value: msg.guild.explicitContentFilter,
					inline: true,
				}
			);
		}

		Stats.addFields(
			{
				name: 'Channels',
				value: msg.guild.channels.cache.size,
				inline: true,
			},
			{
				name: 'In Voice: ',
				value: Voice,
				inline: true,
			},
			{
				name: 'Emojis',
				value: msg.guild.emojis.cache.size,
				inline: true,
			},
			{
				name: 'Roles',
				value: msg.guild.roles.cache.size,
				inline: true,
			},
			{
				name: 'Members',
				value: Total - bots,
				inline: true,
			},
			{
				name: 'Bots',
				value: bots,
				inline: true,
			},
			{
				name: 'Total users',
				value: Total,
				inline: true,
			}
		);

		msg.channel.send(Stats);

		if (msg.guild.id !== '599061990828277770') return; //wonderland server
		msg.guild.channels.cache.get('715444945602740244').setName(`Total Members: ${Total}`); // 770998780404957235
		msg.guild.channels.cache.get('715444948568244305').setName(`Users: ${Total - bots}`); // 770998825677488178
		msg.guild.channels.cache.get('715444951332290591').setName(`Bots: ${bots}`); // 770998873937805383
	} catch (error) {
		return console.log(error);
	}
};

module.exports.help = {
	name: 'serverstats',
	description: 'Show the server stats',
};
