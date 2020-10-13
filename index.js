const express = require("express");
const app = express();
const Discord = require("discord.js");
const bot = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
require("dotenv").config();
bot.queue = new Map();
bot.commands = new Discord.Collection();

app.listen(3000, () => console.log(`Example app listening at http://localhost:${3000}`));
app.get("/", (req, res) => {
  res.send("Hello World! this is \nKyle the bot");
});

require("./handler")(bot);

module.exports = {
  bot: bot,
};

bot.login(process.env.TOKEN); // turn bot online
