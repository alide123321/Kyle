module.exports.run = async (bot, msg, args) => {
	let db = require("quick.db");
	let vcName = new db.table("vcName");
	require("dotenv").config();

	let AllowedRoles = ["Head Admins", "Developer", "Admins", "Moderators", "VIP", "[50+] Gods"];

	if (msg.member.roles.cache.some((r) => AllowedRoles.includes(r.name))) {
		let name = msg.content.substring(process.env.PREFIX.length + 7); // 7 bc vcname is 6 long + one space

		if (name.length > 85)
			return msg.channel.send(
				`Sorry but the name has to be below 85 characters you have ${name.length()}`
			);

		if (name.length <= 0)
			return msg.channel.send("Sorry but the name has to be above 0 characters");

		let SucsessEmbed = new Discord.MessageEmbed()
			.setColor("#0099ff")
			.setTitle("**Preview**")
			.setURL("https://discord.gg/z4FpxSJ")
			.setThumbnail(msg.author.avatarURL())
			.addFields(
				{
					name: "**Private Room**",
					value: name,
				},
				{
					name: "**Waiting Room**",
					value: `${name} [waiting room]`,
				}
			)
			.setFooter("If you dont like it you can restart");

		await vcName.set(`${msg.author.id}`, name);
		msg.channel.send(SucsessEmbed);
	} else {
		msg.channel.send(`Sorry but you need to have one of these roles ${AllowedRoles}`);
	}
};

module.exports.help = {
	name: "vcname",
};
