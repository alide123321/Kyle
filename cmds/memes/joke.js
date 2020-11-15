module.exports.run = async (bot, msg, args) => {
  var unirest = require("unirest");

  var req = unirest("GET", "https://joke3.p.rapidapi.com/v1/joke");

  req.headers({
    "x-rapidapi-host": "joke3.p.rapidapi.com",
    "x-rapidapi-key": process.env.RAPIDAPI,
    useQueryString: true,
  });

  req.end(function (res) {
    if (res.error) throw new Error(res.error);

    if (res.status != 200) {
      message.reply("An error occurred while trying to make the API request!");
    } else {
      var json = JSON.parse(JSON.stringify(res.body));
      msg.channel.send(json.content);
    }
  });
};

module.exports.help = {
  name: "joke",
};
