const Fs = require('fs');

module.exports = (bot) => {
	Fs.readdir('./assets/handlers/', (err, files) => {
		console.log('____________Handlers_______________');
		if (err) console.error(err);

		let jsfiles = files.filter((f) => f.split('.').pop() === 'js');
		if (jsfiles.length <= 0) return console.log('There are no events to load...');

		jsfiles.forEach((f, i) => {
			require(`./assets/handlers/${f}`);
			console.log(`${i + 1}: ${f} loaded!`);
		});
	});

	//loading all commands

	Fs.readdir(`./cmds/`, async (err, folders) => {
		if (err) return console.error(err);
		for (let dir of folders) {
			Fs.readdir(`./cmds/${dir}/`, (ierr, files) => {
				console.log(`| __________________${dir}_____________________`);
				if (ierr) return console.error(ierr);

				let jsfiles = files.filter((f) => f.split('.').pop() === 'js');
				if (jsfiles.length <= 0) return console.log('No commands to load in games!');

				jsfiles.forEach((f, i) => {
					let props = require(`./cmds/${dir}/${f}`);
					bot.commands.set(props.help.name, props);
					if (props.help.Alias) bot.commands.set(props.help.Alias, props);
					props.help.description
						? console.log(`| ${f} loaded With no Errors ✅`)
						: console.log(`| ${f} Does not have Description ❌`);
				});
			});
		}
	});
};
