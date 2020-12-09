module.exports.run = async (bot, msg, args) => {
	const Discord = require('discord.js');
	const db = require('quick.db');
	var economy = new db.table('economy');
	let author = msg.author.id;
	let mentioned = msg.mentions.members.first();
	let Money = args[1];

	if (author !== '698051518754062387') {
		msg.channel.send('Only Alide can use this command, try using .pay');
		return;
	}

	if (!Money || isNaN(Money) || !mentioned) {
		let ErrorEmbed = new Discord.MessageEmbed()
			.setTitle('**ERROR**')
			.setColor(0xff0000)
			.setThumbnail(msg.author.avatarURL())
			.setDescription('Please specify an amount/user to give. (.give <#> <@>)');
		msg.channel.send(ErrorEmbed);
		return;
	}

	if (Money.includes('.')) {
		let ErrorEmbed = new Discord.MessageEmbed()
			.setTitle('**ERROR**')
			.setColor(0xff0000)
			.setThumbnail(msg.author.avatarURL())
			.setDescription('Please specify an integer value greater than 0. (.pay <#> <@>)');
		msg.channel.send(ErrorEmbed);
		return;
	}

	let menacc = economy.get(mentioned.id);

	let SuccessEmbed = new Discord.MessageEmbed()
    .setTitle("**SUCCESS**")
    .setColor(0x32cd32)
    .setThumbnail(mentioned.user.avatarURL())
    .setDescription("You have given $" +Money +"<:chip:751730576918315048> to " +mentioned.user.username); // prettier-ignore

	if (!menacc) {
		economy.set(`${mentioned.id}.bal`, Money);
		return msg.channel.send(SuccessEmbed);
	}

	economy.add(`${mentioned.id}.bal`, Money);
	msg.channel.send(SuccessEmbed);
};

module.exports.help = {
	name: 'give',
};
