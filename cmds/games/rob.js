module.exports.run = async (bot, msg, args) => {
	const Discord = require('discord.js');
	const db = require('quick.db');
	let economy = new db.table('economy');
	const ms = require('parse-ms');
	let mentioned = msg.mentions.members.first();
	let RobTimeout = 10800000; // rob ppl every 6 hours
	let RobedTimeout = 21600000; // get robed once every 12 hours

	if (!mentioned) return msg.channel.send('Sorry, you forgot to mention somebody. \n.rob <@>');
	if (msg.author.id === mentioned.id) return msg.channel.send('Sorry, you cant rob your self');

	if (!economy.has(`${msg.author.id}.bal`)) return msg.channel.send('you are not in the economy');
	if (!economy.has(`${mentioned.id}.bal`)) return msg.channel.send('they are not in the economy');

	if (!economy.has(`${msg.author.id}.lrobed`)) {
		economy.set(`${msg.author.id}.lrobed`, 0);
		economy.set(`${msg.author.id}.lgrobed`, 0);
	}

	if (!economy.has(`${mentioned.id}.lrobed`)) {
		economy.set(`${mentioned.id}.lrobed`, 0);
		economy.set(`${mentioned.id}.lgrobed`, 0);
	}

	let UserLRobed = economy.get(`${msg.author.id}.lrobed`);
	let TargetLGRobed = economy.get(`${mentioned.id}.lgrobed`);

	if (RobTimeout - (Date.now() - UserLRobed) > 0) {
		let time = ms(RobTimeout - (Date.now() - UserLRobed));

		let RobedEmbed = new Discord.MessageEmbed()
			.setTitle('**Rob**')
			.setColor(0xff0000)
			.setThumbnail(msg.author.avatarURL())
			.setDescription(
				`You just robed someone with in 12 hours you need to hide.\n you can rob someone again in **\`\`\`${time.hours}h ${time.minutes}m ${time.seconds}s!\`\`\`**`
			);
		return msg.channel.send(RobedEmbed);
	}

	if (RobedTimeout - (Date.now() - TargetLGRobed) > 0) {
		let time = ms(RobedTimeout - (Date.now() - TargetLGRobed));

		let RobEmbed = new Discord.MessageEmbed()
			.setTitle('**Rob**')
			.setColor(0xff0000)
			.setThumbnail(msg.author.avatarURL())
			.setDescription(
				`They already got robed today.\n you can rob them again in **\`\`\`${time.hours}h ${time.minutes}m ${time.seconds}s!\`\`\`**`
			);
		return msg.channel.send(RobEmbed);
	}

	if (economy.get(`${msg.author.id}.bal`) < 300)
		return msg.channel.send(
			`Bruh you broke asf calm down \nyou need $${300 - economy.get(`${msg.author.id}.bal`)} more`
		);

	if (economy.get(`${mentioned.id}.bal`) < 300)
		return msg.channel.send(
			`Bruh they broke aswell calm down \nthey need $${
				300 - economy.get(`${mentioned.id}.bal`)
			} more`
		);

	if (economy.get(`${msg.author.id}.bal`) < Math.floor(0.1 * economy.get(`${mentioned.id}.bal`)))
		return msg.channel.send(
			`Lol they too rich u cant rob them you need $${
				Math.floor(0.1 * economy.get(`${mentioned.id}.bal`)) - economy.get(`${msg.author.id}.bal`)
			} more coins to rob them`
		);

	if (Math.floor(0.1 * economy.get(`${msg.author.id}.bal`)) > economy.get(`${mentioned.id}.bal`))
		return msg.channel.send(
			`Lol they too poor u cant rob them they need $${
				Math.floor(0.1 * economy.get(`${msg.author.id}.bal`)) - economy.get(`${mentioned.id}.bal`)
			} more coins`
		);

	let rand = Math.floor(Math.random() * 16);
	let ammount = Math.floor(Math.random() * (200 + Math.floor(Math.random() * 51))) + 1;

	if (rand > 0) {
		// successful rob
		if (economy.get(`${mentioned.id}.bal`) < ammount) {
			ammount = economy.get(`${mentioned.id}.bal`);
		}

		economy.set(`${msg.author.id}.lrobed`, new Date().getTime());
		economy.set(`${mentioned.id}.lgrobed`, new Date().getTime());

		economy.subtract(`${mentioned.id}.bal`, ammount);
		economy.add(`${msg.author.id}.bal`, ammount);

		let embed = new Discord.MessageEmbed()
			.setTitle('***Success!***')
			.setDescription(`${msg.author} you robbed ${mentioned} and got away with ${ammount}!`)
			.setColor(0x32cd32)
			.setTimestamp();
		msg.channel.send(embed);
	} else {
		if (economy.get(`${msg.author.id}.bal`) < ammount) {
			ammount = economy.get(`${msg.author.id}.bal`);
		}
		economy.subtract(`${msg.author.id}.bal`, ammount);
		economy.set(`${msg.author.id}.lrobed`, new Date().getTime());
		economy.add(`${mentioned.id}.bal`, Math.floor(ammount / 2));
		economy.add(`Prizepool`, Math.floor(ammount / 2));

		let embed = new Discord.MessageEmbed()
			.setTitle('***Fail!***')
			.setDescription(
				`${msg.author} you tried to robbed ${mentioned} but they cought you and took ${Math.floor(
					ammount / 2
				)}! of your money \n you have $${economy.get(`${msg.author.id}.bal`)} left`
			)
			.setColor(0xffbf00)
			.setTimestamp();
		msg.channel.send(embed);
	}
};

module.exports.help = {
	name: 'rob',
	description: 'Rob anyone in the econamy to fuel your addiction',
};
