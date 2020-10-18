const { bot } = require("../../index");

bot.on("error", (error) => {
  console.error(`client's WebSocket encountered a connection error: ${error}`);
});
