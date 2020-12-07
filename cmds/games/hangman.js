const Discord = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
var game = new db.table("Game");

var Guessed = [];
var tries = 0;
var end = false;
var word = "";
module.exports.run = async (bot, msg, args) => {
	const obj = JSON.parse(fs.readFileSync("assets/util/wordlist.json"));
	const sleep = require("../../assets/functions/sleep.js").sleep;
	const playingGame = require("../../assets/functions/playingGame.js").playingGame;

	if (playingGame.has(msg.author.id))
		return "You are already playing a game finish it to start a new one";

	if (!game.has(`${msg.author.id} hm_level`)) {
		game.set(`${msg.author.id} hm_level`, 0);
		game.set(`${msg.author.id} hm_letters`, 0);
	}

	if (args[1] === "reset") {
		game.set(`${msg.author.id} hm_level`, 0);
		game.set(`${msg.author.id} hm_letters`, 0);
		return msg.channel.send("done");
	} else if (args[1] === "stats") {
		let mentioned = msg.mentions.members.first();

		let StatsEmbed = new Discord.MessageEmbed()
			.setTitle(`**HangMan**`)
			.setURL("https://discord.gg/z4FpxSJ")
			.setColor("#0099ff");

		if (mentioned) {
			StatsEmbed.setThumbnail(mentioned.user.avatarURL());
			StatsEmbed.addFields(
				{
					name: "Level",
					value: game.get(`${mentioned.id} hm_level`),
					inline: true,
				},
				{
					name: "Letters Guessed",
					value: game.get(`${mentioned.id} hm_letters`),
					inline: true,
				}
			);
		} else {
			StatsEmbed.setThumbnail(msg.author.avatarURL());
			StatsEmbed.addFields(
				{
					name: "Level",
					value: game.get(`${msg.author.id} hm_level`),
					inline: true,
				},
				{
					name: "Letters Guessed",
					value: game.get(`${msg.author.id} hm_letters`),
					inline: true,
				}
			);
		}

		return msg.channel.send(StatsEmbed);
	}

	playingGame.add(msg.author.id);

	Guessed = [];
	tries = 0;
	word = "";

	let DiffEmbed = new Discord.MessageEmbed()
		.setColor("#0099ff")
		.setTitle("**React to one**")
		.setURL("https://discord.gg/z4FpxSJ")
		.setThumbnail(msg.author.avatarURL())
		.addFields(
			{
				name: "**Easy**",
				value: "Easy (3-4) 1️⃣",
				inline: true,
			},
			{
				name: "**Normal**",
				value: "Normal (5-8) 2️⃣",
				inline: true,
			},
			{
				name: "**Hard**",
				value: "Hard (9-12) 3️⃣",
				inline: true,
			}
		)
		.setFooter("Difficultes for HangMan (Easy-Normal-Hard)");

	await msg.channel.send(DiffEmbed).then(async (sentmsg) => {
		sentmsg.react("1️⃣");
		sentmsg.react("2️⃣");
		sentmsg.react("3️⃣");

		const filter = (reaction, user) => {
			return ["1️⃣", "2️⃣", "3️⃣"].includes(reaction.emoji.name) && user.id === msg.author.id;
		};

		await sentmsg
			.awaitReactions(filter, { max: 1, time: 10000, errors: ["time"] })
			.then((collected) => {
				const reaction = collected.first();

				if (reaction.emoji.name === "1️⃣") {
					let WordNumPos = Math.floor(Math.random() * obj.easy.length);
					word = obj.easy[WordNumPos];
				} else if (reaction.emoji.name === "2️⃣") {
					let WordNumPos = Math.floor(Math.random() * obj.normal.length);
					word = obj.normal[WordNumPos];
				} else if (reaction.emoji.name === "3️⃣") {
					let WordNumPos = Math.floor(Math.random() * obj.hard.length);
					word = obj.hard[WordNumPos];
				}
			})
			.catch((error) => {
				msg.reply("Time out");
			});
	});

	word = word.toLocaleLowerCase();

	while (!end) {
		sleep(50);
		await play(msg);
	}
	end = false;
	playingGame.delete(msg.author.id);
};

async function play(msg) {
	let GuessedLetters = " ";
	for (let letter in Guessed) {
		let tempLet = GuessedLetters.concat(`${Guessed[letter]}, `);
		GuessedLetters = tempLet;
	}

	if (tries > 7) {
		end = true;
		let LoseEmbed = new Discord.MessageEmbed()
			.setTitle(`**HangMan - LOSS**`)
			.setURL("https://discord.gg/z4FpxSJ")
			.setColor("#ff0000")
			.setThumbnail(msg.author.avatarURL())
			.setFooter(`GG You've guessed: ${GuessedLetters} \n The word was \"${word}\"`);
		await LoseEmbed.setDescription(gui());

		return msg.channel.send(LoseEmbed);
	}

	let HMEmbed = new Discord.MessageEmbed()
		.setTitle(`**HangMan**`)
		.setURL("https://discord.gg/z4FpxSJ")
		.setColor("#0099ff")
		.setThumbnail(msg.author.avatarURL())
		.setFooter(
			`Guess a letter you haven't guessed \nYou've guessed: ${GuessedLetters} \n${
				7 - tries
			} Wrong tries left`
		);
	await HMEmbed.setDescription(gui());

	await msg.channel.send(HMEmbed).then(async (Smsg) => {
		try {
			const filter = (m) => {
				return m.author.id == msg.author.id;
			};

			await msg.channel
				.awaitMessages(filter, { max: 1, time: 15000, errors: ["time"] })
				.then(async (collected) => {
					let input = collected.first();
					let reaction = input.content.toLowerCase().split(/\s+/g);

					if (reaction[0].length === 1) {
						if (!word.includes(reaction[0])) ++tries;
						Guessed.push(reaction[0]);
					} else {
						if (word === reaction[0]) {
							let letters = reaction[0].split("");
							for (let letter in letters) {
								if (!Guessed.includes(letters[letter])) Guessed.push(letters[letter]);
							}

							let WonEmbed = new Discord.MessageEmbed()
								.setTitle(`**HangMan - WIN**`)
								.setURL("https://discord.gg/z4FpxSJ")
								.setColor("#32cd32")
								.setThumbnail(msg.author.avatarURL())
								.setFooter(
									`GG You've guessed: ${GuessedLetters} \nand The word was ${word} in ${
										7 - tries
									} tries`
								);
							await WonEmbed.setDescription(gui());

							game.add(`${msg.author.id} hm_level`, 1);
							end = true;
							return msg.channel.send(WonEmbed);
						} else {
							end = true;
							let LoseEmbed = new Discord.MessageEmbed()
								.setTitle(`**HangMan - LOSS**`)
								.setURL("https://discord.gg/z4FpxSJ")
								.setColor("#ff0000")
								.setThumbnail(msg.author.avatarURL())
								.setFooter(`GG You've guessed: ${GuessedLetters} \n The word was ${word}`);
							await LoseEmbed.setDescription(gui());

							return msg.channel.send(LoseEmbed);
						}
					}

					game.add(`${msg.author.id} hm_letters`, 1);

					return;
				});
		} catch (error) {
			end = true;
			return msg.channel.send("Time ran out. Bye");
		}
	});
}

function gui() {
	return (
		"```" +
		"|‾‾‾‾‾‾|   \n|     " +
		(tries > 0 ? "⏳" : " ") +
		"   \n|     " +
		(tries > 1 ? "🎀" : " ") +
		"   \n|     " +
		(tries > 2 ? "🎩" : " ") +
		"   \n|     " +
		(tries > 3 ? "😟" : " ") +
		"   \n|     " +
		(tries > 4 ? "👕" : " ") +
		"   \n|     " +
		(tries > 5 ? "🩳" : " ") +
		"   \n|    " +
		(tries > 6 ? "👞👞" : " ") +
		"   \n|     " +
		(tries >= 7 ? "🎀" : " ") +
		"   \n|     \n|__________\n\n" +
		word
			.split("")
			.map((l) => (Guessed.includes(l) ? l : "_"))
			.join(" ") +
		"```"
	);
}

module.exports.help = {
	name: "hangman",
	Alias: "hm",
};
