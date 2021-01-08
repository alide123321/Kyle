const Discord = require('discord.js');
const { bot } = require('../../index');
const db = require('quick.db');
var economy = new db.table('economy');
const cron = require('cron');
var fs = require('fs');
var winerId, ammount;
// todo send winn msg
module.exports.run = async (bot, msg, args) => {
	if (args[1] === '--forceend' && msg.author.id === '698051518754062387') {
		await End();

		return;
	}

	if (!economy.has(msg.author.id)) {
		let JoinEmbed = new Discord.MessageEmbed()
			.setTitle('**ERORR**')
			.setColor(0x0099ff)
			.setThumbnail(msg.author.avatarURL())
			.setDescription('You are not in the economy, try .newbal');
		return msg.channel.send(JoinEmbed);
	}

	let today = new Date();
	let dayNum = today.getDay();
	let daysToFri = 5 - (dayNum < 5 ? dayNum : dayNum - 7);
	let daysToSat = 6 - (dayNum < 6 ? dayNum : dayNum - 7);

	if (dayNum === 5) {
		const obj = JSON.parse(fs.readFileSync('assets/util/givwaway.json'));

		let saturdayMorning = new Date(+today);
		saturdayMorning.setDate(saturdayMorning.getDate() + daysToSat);
		saturdayMorning.setHours(0, 0, 0, 0);

		let ms = Math.ceil((saturdayMorning - today) / 1000) * 1000;
		let d = (ms / 8.64e7) | 0;
		let h = ((ms % 8.64e7) / 3.6e6) | 0;
		let m = ((ms % 3.6e6) / 6e4) | 0;
		let s = ((ms % 6e4) / 1e3) | 0;

		if (obj.entered.includes(`${msg.author.id}`)) {
			msg.channel.send(
				`Your already in. There is **${d}d ${h}h ${m}m ${s}s** left the prize pool so far is ${Math.floor(
					economy.get(`Prizepool`) / 2
				)}💰`
			);
		} else {
			obj.entered.push(`${msg.author.id}`);

			fs.writeFileSync('assets/util/givwaway.json', JSON.stringify(obj));
			msg.channel.send(
				`You joined the give away good luck winner will be announced in **${d}d ${h}h ${m}m ${s}** the prize pool so far is ${Math.floor(
					economy.get(`Prizepool`) / 2
				)}💰`
			);
		}
	} else {
		let fridayMorning = new Date(+today);
		fridayMorning.setDate(fridayMorning.getDate() + daysToFri);
		fridayMorning.setHours(0, 0, 0, 0);

		let ms = Math.ceil((fridayMorning - today) / 1000) * 1000;
		let d = (ms / 8.64e7) | 0;
		let h = ((ms % 8.64e7) / 3.6e6) | 0;
		let m = ((ms % 3.6e6) / 6e4) | 0;
		let s = ((ms % 6e4) / 1e3) | 0;

		msg.channel.send(
			`Its not friday yet wait **${d}d ${h}h ${m}m ${s}s** the prize pool so far is ${Math.floor(
				economy.get(`Prizepool`) / 2
			)}💰`
		);
	}
};

var Fri = new cron.CronJob('00 00 * * 5', () => {
	try {
		let guild = bot.guilds.cache.get('599061990828277770'); //Guild Id

		let StartEmbed = new Discord.MessageEmbed()
			.setTitle('**GIVEAWAY**')
			.setColor(0x0099ff)
			.setDescription(`The Giveaway Started `);
		guild.channels.cache.get('740514553531465769').send(StartEmbed); //Channel Id
	} catch (error) {
		console.log(error);
	}
});

var Sat = new cron.CronJob('00 00 * * 6', () => {
	End();
});
Sat.start();
Fri.start();

function End() {
	const obj = JSON.parse(fs.readFileSync('assets/util/givwaway.json'));
	winerId = obj.entered[Math.floor(Math.random() * obj.entered.length)];
	ammount = Math.floor(economy.get(`Prizepool`) / 2);

	if (obj.entered.length === 0) {
		try {
			let guild = bot.guilds.cache.get('599061990828277770'); //Guild Id
			let EndEmbed = new Discord.MessageEmbed()
				.setTitle('**GIVEAWAY ENDED**')
				.setColor(0x0099ff)
				.setDescription(`Nobody entered so the prize of ${ammount}💰 will carry on till next week`);
			guild.channels.cache.get('740514553531465769').send(EndEmbed); //Channel Id
		} catch (error) {
			console.log(error);
		}
		return;
	}

	economy.add(`${winerId}.bal`, ammount);

	try {
		let guild = bot.guilds.cache.get('599061990828277770'); //Guild Id

		let EndEmbed = new Discord.MessageEmbed()
			.setTitle('**GIVEAWAY ENDED**')
			.setColor(0x0099ff)
			.setDescription(`Winner is <@${winerId}> and won ${ammount}💰`);

		guild.channels.cache.get('740514553531465769').send(EndEmbed); //Channel Id
	} catch (error) {
		console.log(error);
	}

	obj.entered.splice(0);

	let emptyObj = {
		entered: [],
	};
	fs.writeFileSync('assets/util/givwaway.json', JSON.stringify(emptyObj));

	winerId = 0;
	ammount = 0;
	economy.set(`Prizepool`, 0);
	return;
}

module.exports.help = {
	name: 'giveaway',
};
