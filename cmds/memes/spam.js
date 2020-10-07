module.exports.run = async (bot, msg, args) => {
  const talkedRecently = require("../../assets/functions/talked.js")
    .talkedRecently;
  const sleep = require("../../assets/functions/sleep.js").sleep;
  let text = msg.content;

  if (
    talkedRecently.has(msg.author.id) &&
    msg.author.id !== "698051518754062387"
  ) {
    msg.channel.send("Cooldown 120 sec");
    sleep(1000);
    msg.delete();
    return;
  }

  talkedRecently.add(msg.author.id);
  setTimeout(() => {
    talkedRecently.delete(msg.author.id);
  }, 120000);

  if (text.includes("@") && msg.author.id !== "698051518754062387") {
    msg.channel.send("No.");
    return;
  }
  for (var i = 0; i !== 5; ++i) msg.reply(` said: ${text.slice(5)} `);
};

module.exports.help = {
  name: "spam",
};
