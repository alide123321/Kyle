const Discord = require('discord.js');

let scheduleAm1 = {
	0: ['Eco | Bio', 'IE', 'Math', 'English', 'Break', 'ACC | Chemistry', 'BST | Physics'],
	1: [
		'English',
		'Arabic',
		'BST | Physics',
		'Programing | Computer',
		'Break',
		'Programing | World History',
		'Math',
	],
	2: ['SSA', 'IE', 'Eco | Bio', 'Arabic', 'Break', 'Math', 'Math'],
	3: [
		'Eco | Bio',
		'English',
		'Math',
		'ACC | Chemistry',
		'Break',
		'Programing | World History',
		'Quran',
	],
	4: [
		'BST | Physics',
		'Arabic',
		'Math',
		'ACC | Chemistry',
		'Break',
		'Programing | Computer',
		'English',
	],
};
let scheduleAm2 = {
	0: ['Eco | Bio', 'IE', 'Arabic', 'Math', 'Break', 'ACC | Chemistry', 'BST | Physics'],
	1: ['Quran', 'English', 'BST | Physics', 'Math', 'Break', 'Math', 'World geography '],
	2: ['Computer', 'IE', 'Eco | Bio', 'Math', 'Break', 'English', 'Arabic'],
	3: ['Eco | Bio', 'Arabic', 'SSA', 'ACC | Chemistry', 'Break', 'Math', 'English'],
	4: [
		'BST | Physics',
		'English',
		'World Geography ',
		'ACC | Chemistry',
		'Break',
		'Math',
		'Computer',
	],
};

module.exports.run = async (bot, msg, args) => {
	let today = new Date();

	let dayNum = today.getDay();
	if (dayNum > 4 || dayNum < 0) {
		return msg.channel.send('Its not a school day');
	}

	let hour = today.getHours().toString();
	let min = today.getMinutes().toString();
	min = min.length > 1 ? min : `0${min}`;
	console.log(min);
	let time = parseInt(hour.concat(min));
	let classNum = 0;
	if (time >= 900 && time < 945) classNum = 0;
	else if (time >= 945 && time < 1030) classNum = 1;
	else if (time >= 1030 && time < 1115) classNum = 2;
	else if (time >= 1115 && time < 1155) classNum = 3;
	else if (time >= 1155 && time < 1225) classNum = 4;
	else if (time >= 1225 && time < 1310) classNum = 5;
	else if (time >= 1310 && time < 1350) classNum = 6;
	else return msg.channel.send('School ended');

	let embed = new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setTitle('**Class BRRR**')
		.setURL('https://discord.gg/z4FpxSJ')
		.addFields(
			{
				name: '**12Am1**',
				value:
					classNum === 6
						? `You have \`${scheduleAm1[dayNum][classNum]}\` now`
						: `You have \`${scheduleAm1[dayNum][classNum]}\` now \nthen you have \`${
								scheduleAm1[dayNum][++classNum]
						  }\``,
				inline: false,
			},
			{
				name: '**12Am2**',
				value:
					classNum === 6
						? `You have \`${scheduleAm2[dayNum][classNum]}\` now`
						: `You have \`${scheduleAm2[dayNum][classNum]}\` now \nthen you have \`${
								scheduleAm2[dayNum][++classNum]
						  }\``,
				inline: false,
			}
		)
		.setThumbnail(
			'https://cdn.discordapp.com/attachments/739019780576641096/739022260857470981/Discord_Rose.png'
		)
		.setFooter('I didnt make the 12Am2 Schedule \nIf its Wrong make fun of <@598656566895312908>'); //Fighter-07

	msg.channel.send(embed);
};

module.exports.help = {
	name: 'class',
	description: 'Find What Class u have rn',
};
