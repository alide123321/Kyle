let schedule = {
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

module.exports.run = async (bot, msg, args) => {
	let today = new Date();

	let dayNum = today.getDay();
	if (dayNum > 4 || dayNum < 0) {
		return msg.channel.send('You dont have a class now');
	}

	let hour = today.getHours().toString();
	let min = today.getMinutes().toString();
	min.length > 1 ? min : `0${min}`;
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

	msg.channel.send(
		classNum === 6
			? `You have \`${schedule[dayNum][classNum]}\` now`
			: `You have \`${schedule[dayNum][classNum]}\` now \nthen you have \`${
					schedule[dayNum][++classNum]
			  }\``
	);
};

module.exports.help = {
	name: 'class',
	description: 'Find What Class u have rn',
};
