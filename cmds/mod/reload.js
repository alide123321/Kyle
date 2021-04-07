const Fs = require('fs');
const sleep = require('../../assets/functions/sleep.js').sleep;
require('dotenv').config();

module.exports.run = async (bot, msg, args) => {
	if (msg.author.id != process.env.ALIDEID)
		return msg.channel.send(`only ${process.env.ALIDE} Can use this command`);

	Fs.readdir(`./cmds/`, async (err, folders) => {
		if (err) return console.error(err);
		for (let dir of folders) {
			Fs.readdir(`./cmds/${dir}/`, (ierr, files) => {
				if (ierr) return console.error(ierr);
				let jsfiles = files.filter((f) => f.split('.').pop() === 'js');
				if (jsfiles.length <= 0) return;

				jsfiles.forEach((f) => {
					if (bot.commands.get(f.slice(0, f.length - 3)))
						delete require.cache[require.resolve(`../${dir}/${f}`)];

					try {
						const props = require(`../${dir}/${f}`);
						bot.commands.set(props.help.name, props);
						if (props.help.Alias) bot.commands.set(props.help.Alias, props);
					} catch (error) {
						return console.log(error);
					}
				});
			});
		}
	});

	await sleep(1000);
	try {
		msg.channel
			.send('Attempting to reload commands...')
			.then((smsg) => {
				setTimeout(function () {
					smsg.react('🆗');
					smsg.edit('Done all commands reloaded');
				}, 5000);
			})
			.then(bot.destroy())
			.then(bot.login(process.env.TOKEN));
	} catch (e) {
		return console.log(`ERROR: ${e}`);
	}
};

function wait(timeout) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, timeout);
	});
}

module.exports.help = {
	name: 'reload',
	description: 'Reload commands',
};
