module.exports.run = async (bot, msg, args) => {
	const Discord = require("discord.js");
	const fetch = require("node-fetch");
	fetch("https://meme-api.herokuapp.com/gimme")
		.then((res) => res.json())
		.then((json) => {
			let embed = new Discord.MessageEmbed()
        .setTitle(json.title)
        .setImage(json.url)
        .setFooter("Link: " +json.postLink +" | Subreddit : " +json.subreddit +"\nfor better memes follow @saudi.nigga on isntagram"); // prettier-ignore
			msg.channel.send(embed);
		});
};

module.exports.help = {
	name: "meme",
};
