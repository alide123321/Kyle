module.exports.run = async (bot, msg, args) => {
  var unirest = require("unirest");

  const WIKIHOWAPI = process.env.WIKIHOWAPI;

  var req = unirest("GET", "https://hargrimm-wikihow-v1.p.rapidapi.com/images");

  req.query({
    count: "1",
  });

  req.headers({
    "x-rapidapi-host": "hargrimm-wikihow-v1.p.rapidapi.com",
    "x-rapidapi-key": WIKIHOWAPI,
    useQueryString: true,
  });

  req.end(function (res) {
    if (res.error) throw new Error(res.error);

    if (res.status != 200) {
      message.reply("An error occurred while trying to make the API request!");
    } else {
      var json = JSON.parse(JSON.stringify(res.body));
      var array = json;
      msg.channel.send(array[1]);
    }
  });
};

module.exports.help = {
  name: "wikihow",
};
