const { bot } = require("../../index");
require("dotenv").config();

bot.once("ready", () => {
	let index = 1;
	console.log("______________________");
	console.log("Ready!");
	console.log("prefix:" + process.env.PREFIX);
	console.log("version:" + process.env.VERSION);
	console.log("Servers:");
	bot.guilds.cache.forEach((guild) => {
		console.log(`   ${index}) ${guild.name}`);
		++index;
	});
	console.log("‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾");
	bot.user.setActivity("Im also mod mail DM me");
});
