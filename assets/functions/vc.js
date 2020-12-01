const sleep = require("./sleep.js").sleep;
const talkedRecently = require("./talked.js").talkedRecently;
function vc(sound, vol, VC, author, chan) {
  vol += 1;
  const serverQueue = chan.client.queue.get(chan.guild.id);

  if (talkedRecently.has(author) && author !== "698051518754062387") {
    chan.send("Cooldown 60 sec").then((msg) => {
      msg.delete({ timeout: 5000 });
    });
    return;
  }

  talkedRecently.add(author);
  setTimeout(() => {
    talkedRecently.delete(author);
  }, 60000);

  if (VC) {
    if (serverQueue) {
      chan.send("I'm busy playing music in a VC right now. Please try again later.").then((msg) => {
        msg.delete({ timeout: 5000 });
      });
      return;
    }
    VC.join()
      .then((connection) => {
        connection.voice.setSelfDeaf(true);
        const dispatcher = connection.play("./assets/sounds/" + sound + ".mp3", {
          volume: vol,
        });

        dispatcher.on("finish", (end) => {
          sleep(3000);
          VC.leave();
        });
      })
      .catch(console.error);
  }
}
module.exports = { vc: vc };
