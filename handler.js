const Fs = require("fs");

module.exports = (bot) => {
	Fs.readdir("./assets/handlers/", (err, files) => {
		console.log("____________Handler start_______________");
		if (err) console.error(err);
		let jsfiles = files.filter((f) => f.split(".").pop() === "js");
		if (jsfiles.length <= 0) return console.log("There are no events to load...");
		jsfiles.forEach((f, i) => {
			require(`./assets/handlers/${f}`);
			console.log(`${i + 1}: ${f} loaded!`);
		});
	});

	//loading all commands

	Fs.readdir("./cmds/games/", (err, files) => {
		console.log("____________Games_______________");
		if (err) console.error(err);

		let jsfiles = files.filter((f) => f.split(".").pop() === "js");
		if (jsfiles.length <= 0) {
			console.log("No commands to load in games!");
			return;
		}

		jsfiles.forEach((f, i) => {
			let props = require(`./cmds/games/${f}`);
			console.log(`${i + 1}: ${f} loaded in games!`);
			bot.commands.set(props.help.name, props);
			if (props.help.Alias) bot.commands.set(props.help.Alias, props);
		});
	});

	Fs.readdir("./cmds/help/", (err, files) => {
		console.log("____________Help_______________");
		if (err) console.error(err);

		let jsfiles = files.filter((f) => f.split(".").pop() === "js");
		if (jsfiles.length <= 0) {
			console.log("No commands to load in help!");
			return;
		}

		jsfiles.forEach((f, i) => {
			let props = require(`./cmds/help/${f}`);
			console.log(`${i + 1}: ${f} loaded in help!`);
			bot.commands.set(props.help.name, props);
			if (props.help.Alias) bot.commands.set(props.help.Alias, props);
		});
	});

	Fs.readdir("./cmds/memes/", (err, files) => {
		console.log("____________Memes_______________");
		if (err) console.error(err);

		let jsfiles = files.filter((f) => f.split(".").pop() === "js");
		if (jsfiles.length <= 0) {
			console.log("No commands to load in memes!");
			return;
		}

		jsfiles.forEach((f, i) => {
			let props = require(`./cmds/memes/${f}`);
			console.log(`${i + 1}: ${f} loaded in memes!`);
			bot.commands.set(props.help.name, props);
			if (props.help.Alias) bot.commands.set(props.help.Alias, props);
		});
	});

	Fs.readdir("./cmds/misc/", (err, files) => {
		console.log("____________Misc_______________");
		if (err) console.error(err);

		let jsfiles = files.filter((f) => f.split(".").pop() === "js");
		if (jsfiles.length <= 0) {
			console.log("No commands to load in misc!");
			return;
		}

		jsfiles.forEach((f, i) => {
			let props = require(`./cmds/misc/${f}`);
			console.log(`${i + 1}: ${f} loaded in misc!`);
			bot.commands.set(props.help.name, props);
			if (props.help.Alias) bot.commands.set(props.help.Alias, props);
		});
	});

	Fs.readdir("./cmds/mod/", (err, files) => {
		console.log("____________Mod_______________");
		if (err) console.error(err);

		let jsfiles = files.filter((f) => f.split(".").pop() === "js");
		if (jsfiles.length <= 0) {
			console.log("No commands to load in mod!");
			return;
		}

		jsfiles.forEach((f, i) => {
			let props = require(`./cmds/mod/${f}`);
			console.log(`${i + 1}: ${f} loaded in mod!`);
			bot.commands.set(props.help.name, props);
			if (props.help.Alias) bot.commands.set(props.help.Alias, props);
		});
	});

	Fs.readdir("./cmds/money/", (err, files) => {
		console.log("____________Money_______________");
		if (err) console.error(err);

		let jsfiles = files.filter((f) => f.split(".").pop() === "js");
		if (jsfiles.length <= 0) {
			console.log("No commands to load in money!");
			return;
		}

		jsfiles.forEach((f, i) => {
			let props = require(`./cmds/money/${f}`);
			console.log(`${i + 1}: ${f} loaded in money!`);
			bot.commands.set(props.help.name, props);
			if (props.help.Alias) bot.commands.set(props.help.Alias, props);
		});
	});

	Fs.readdir("./cmds/music/", (err, files) => {
		console.log("____________Music_______________");
		if (err) console.error(err);

		let jsfiles = files.filter((f) => f.split(".").pop() === "js");
		if (jsfiles.length <= 0) {
			console.log("No commands to load in music!");
			return;
		}

		jsfiles.forEach((f, i) => {
			let props = require(`./cmds/music/${f}`);
			console.log(`${i + 1}: ${f} loaded in music!`);
			bot.commands.set(props.help.name, props);
			if (props.help.Alias) bot.commands.set(props.help.Alias, props);
		});
	});

	Fs.readdir("./cmds/vc/", (err, files) => {
		console.log("____________Vc_______________");
		if (err) console.error(err);

		let jsfiles = files.filter((f) => f.split(".").pop() === "js");
		if (jsfiles.length <= 0) {
			console.log("No commands to load in vc!");
			return;
		}

		jsfiles.forEach((f, i) => {
			let props = require(`./cmds/vc/${f}`);
			console.log(`${i + 1}: ${f} loaded in vc!`);
			bot.commands.set(props.help.name, props);
			if (props.help.Alias) bot.commands.set(props.help.Alias, props);
		});
	});
};
