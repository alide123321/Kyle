module.exports.run = async (bot, msg, args) => {
  var asciify = require("asciify-image");
  const fs = require("fs");
  let link = args[1];

  if (!link) return msg.channel.send("Please give me a link");

  if (!link.endsWith(".jpg") && !link.endsWith(".gif") && !link.endsWith(".png"))
    return msg.channel.send("unsuported format");
  var options = {
    fit: "box",
    width: 30,
    height: 30,
    color: false,
  };
  var optionsOut = {
    fit: "box",
    width: 350,
    height: 350,
    color: false,
  };

  asciify(link, options, function (err, asciified) {
    if (err) return msg.channel.send(`*Error ${err}`);
    msg.channel.send("```" + asciified + "```");
  });

  asciify(link, optionsOut, function (err, asciified) {
    if (err) return msg.channel.send(`*Error ${err}`);

    fs.writeFile("./assets/images/HigherQualityAscii.txt", asciified, (err) => {
      if (err) return msg.channel.send(`*Error ${err}`);

      msg.channel.send("A Higher Quality Version", {
        files: ["./assets/images/HigherQualityAscii.txt"],
      });
    });
  });
};

module.exports.help = {
  name: "ascii",
};
