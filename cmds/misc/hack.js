module.exports.run = async (bot, msg, args) => {
	const sleep = require('../../assets/functions/sleep.js').sleep;
	const user = msg.mentions.members.first();
	let hacked;
	if (user) {
		hacked = user;
	} else {
		msg.channel.send('Woaaah slow down, who are we hacking?').then((msgl) => {
			msgl.delete({ timeout: 5000 });
		});
		return;
	}

	const prompt = await msg.channel.send(`Hacking ${user ? hacked.user.username : hacked} now...`);
	sleep(1500);

	await prompt.edit('Finding discord login...');
	sleep(1700);
	await prompt.edit(
		`Found:\n**Email**: \`${user.user.username}***@gmail.com\`\n**Password**: \`*******\``
	);
	sleep(1700);
	await prompt.edit('Fetching dms');
	sleep(1000);
	await prompt.edit('Listing most common words...');
	sleep(1000);
	await prompt.edit(`Injecting virus into discriminator <@ ${hacked.id}>`);
	sleep(1000);
	await prompt.edit('Virus injected');
	sleep(1000);

	await prompt.edit('Finding IP address');
	sleep(2000);
	await prompt.edit('Spamming email...');
	sleep(1000);
	await prompt.edit('Selling data to facebook...');
	sleep(1000);
	await prompt.edit(
		`Finished hacking ${
			user ? hacked.user.username : hacked
		}\nThe totally real and dangerous hack is complete`
	);
};

module.exports.help = {
	name: 'hack',
};
