const { bot } = require("../../index");
var temporary = []; // private vc
var temporaryw = []; // private vc waitting room

bot.on("voiceStateUpdate", async (oldState, newState) => {
  if (newState.channelID === "746447827055673434") {
    newState.guild.channels
      .create(newState.member.user.username + " [private room] ", {
        type: "voice",
        parent: "707452089453903943",
      })
      .then((vc) => {
        vc.overwritePermissions([
          {
            id: newState.id,
            allow: ["MOVE_MEMBERS"],
          },
          {
            id: newState.id,
            allow: ["CONNECT"],
          },
          {
            id: "599061990828277770",
            deny: ["CONNECT"],
          },
        ]);

        newState.setChannel(vc);
        temporary.push(vc);
      });

    newState.guild.channels
      .create(newState.member.user.username + " [waiting room] ", {
        type: "voice",
        parent: "707452089453903943",
      })
      .then((vc) => {
        vc.overwritePermissions([
          {
            id: newState.id,
            allow: ["MOVE_MEMBERS"],
          },
          {
            id: "599061990828277770",
            deny: ["SPEAK"],
          },
          {
            id: "599061990828277770",
            allow: ["CONNECT"],
          },
          {
            id: newState.id,
            allow: ["CONNECT"],
          },
        ]);
        temporaryw.push(vc);
      });
  }

  if (temporary.length > 0) {
    for (let i = 0; i < temporary.length; i++) {
      let ch = temporary[i];
      let chw = temporaryw[i];

      if (ch.members.size <= 0) {
        await ch.delete();
        await chw.delete();

        temporary.splice(i, 1);
        temporaryw.splice(i, 1);
        return;
      }
    }
  }
});
