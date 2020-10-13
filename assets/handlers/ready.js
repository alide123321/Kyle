const { bot } = require("../../index");
require("dotenv").config();

bot.once("ready", () => {
  console.log("Ready!");
  console.log("prefix:" + process.env.PREFIX);
  console.log("version:" + process.env.VERSION);
  console.log("______________________");
  bot.user.setActivity("Im also mod mail DM me");
});
