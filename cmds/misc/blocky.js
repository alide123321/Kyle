const sleep = require("../../assets/functions/sleep.js").sleep;
const playingGame = require("../../assets/functions/playingGame.js").playingGame;
const Discord = require("discord.js");
const db = require("quick.db");
var game = new db.table("Game");

let winPos = null;
let moverPos = null;
let playerPos = null;
let blockerNum = 0;
let map = [];
let wining = false;

module.exports.run = async (bot, msg, args) => {
	if (playingGame.has(msg.author.id))
		return msg.channel.send("You are already playing a game finish it to start a new one");

	playingGame.add(msg.author.id);

	winPos = [0, 0]; //  Win pos 4
	moverPos = [0, 0]; //  Mover is 2
	playerPos = [0, 0]; //  Player is 1

	map = [
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	];

	if (!game.has(`${msg.author.id} blocky_level`)) {
		// if first time
		game.set(`${msg.author.id} blocky_level`, 0);
		game.set(`${msg.author.id} blocky_moves`, 0);
	}

	if (args[1] === "reset") {
		//if user wants to rest stats
		game.set(`${msg.author.id} blocky_level`, 0);
		game.set(`${msg.author.id} blocky_moves`, 0);
		return msg.channel.send("done");
	} else if (args[1] === "stats") {
		let mentioned = msg.mentions.members.first();

		let StatsEmbed = new Discord.MessageEmbed()
			.setTitle(`**Blocky**`)
			.setURL("https://discord.gg/z4FpxSJ")
			.setColor("#0099ff")
			.setThumbnail(msg.author.avatarURL())
			.addFields(
				{
					name: "Level",
					value: game.get(`${msg.author.id} blocky_level`),
					inline: true,
				},
				{
					name: "Moves made",
					value: game.get(`${msg.author.id} blocky_moves`),
					inline: true,
				}
			);

		if (mentioned) StatsEmbed.setThumbnail(mentioned.user.avatarURL());

		return msg.channel.send(StatsEmbed);
	}

	// map init (40 spaces)
	blockerNum = Math.floor(game.get(`${msg.author.id} blocky_level`) / 25);
	if (blockerNum > 10) blockerNum = 10;

	Generate(1);
	Generate(2);
	Generate(3);
	Generate(4);

	while (!wining) {
		sleep(50);
		await send(msg);
	}
	if (winPos[0] === moverPos[0] && winPos[1] === moverPos[1]) {
		game.add(`${msg.author.id} blocky_level`, 1);

		let embed = new Discord.MessageEmbed()
			.setTitle(`**Blocky**`)
			.setURL("https://discord.gg/z4FpxSJ")
			.setColor("#32cd32")
			.setThumbnail(msg.author.avatarURL())
			.setFooter(`GG you leveled up to ${game.get(`${msg.author.id} blocky_level`)}`);
		await embed.setDescription(PrettyMap()) // prettier-ignore

		await msg.channel.send(embed);
	}

	wining = false;
	playingGame.delete(msg.author.id);
};

async function send(msg) {
	let embed = new Discord.MessageEmbed()
		.setTitle(`**Blocky**`)
		.setURL("https://discord.gg/z4FpxSJ")
		.setColor("#0099ff")
		.setThumbnail(msg.author.avatarURL())
		.setFooter(`Use W(Up) A(Left) S(Down) D(Right) || WASD (15 Sec)`);
	await embed.setDescription(PrettyMap()) // prettier-ignore

	await msg.channel.send(embed).then(async (Smsg) => {
		try {
			const filter = (m) => {
				return (
					m.author.id == msg.author.id &&
					(m.content.toLowerCase() == "a" ||
						m.content.toLowerCase() == "w" ||
						m.content.toLowerCase() == "s" ||
						m.content.toLowerCase() == "d")
				);
			};

			await msg.channel
				.awaitMessages(filter, { max: 1, time: 15000, errors: ["time"] })
				.then(async (collected) => {
					let input = collected.first();
					let reaction = input.content.toLowerCase().split(/\s+/g);

					if (reaction[0].startsWith("a")) move(1, msg);
					else if (reaction[0].startsWith("w")) move(2, msg);
					else if (reaction[0].startsWith("s")) move(3, msg);
					else if (reaction[0].startsWith("d")) move(4, msg);

					game.add(`${msg.author.id} blocky_moves`, 1);

					try {
						await input.delete();
						Smsg.delete();
					} catch (error) {
						return;
					}

					return;
				});
		} catch (error) {
			wining = true;
			return msg.channel.send("Time ran out. Bye");
		}
	});
}

function Generate(x) {
	if (x === 1) {
		while (playerPos[0] === 0) {
			for (var r = 0; r < map.length; ++r) {
				for (var c = 0; c < map[r].length; ++c) {
					let taken = false;
					if (Math.floor(Math.random() * 40) + 1 === 1) {
						if (map[r][c] !== 0) taken = true;

						if (!taken) {
							map[r][c] = 1;
							playerPos[0] = r;
							playerPos[1] = c;
							return;
						}
					}
				}
			}
		}
	} else if (x === 2) {
		while (moverPos[0] === 0) {
			for (var r = 1; r < map.length - 1; ++r) {
				for (var c = 1; c < map[r].length - 1; ++c) {
					let taken = false;
					if (Math.floor(Math.random() * 40) + 1 === 1) {
						if (map[r][c] !== 0) taken = true;

						if (!taken) {
							map[r][c] = 2;
							moverPos[0] = r;
							moverPos[1] = c;
							return;
						}
					}
				}
			}
		}
	} else if (x === 3) {
		let newRowPosBlocker = 0;

		while (newRowPosBlocker < blockerNum) {
			for (var r = 0; r < map.length; ++r) {
				for (var c = 0; c < map[r].length; ++c) {
					let taken = false;
					if (Math.floor(Math.random() * 40) + 1 === 1) {
						if (map[r][c] !== 0) taken = true;

						if (!taken) {
							map[r][c] = 3;
							++newRowPosBlocker;
						}
						if (newRowPosBlocker >= blockerNum) return;
					}
				}
			}
		}
	} else if (x === 4) {
		while (winPos[0] === 0) {
			for (var r = 0; r < map.length; ++r) {
				for (var c = 0; c < map[r].length; ++c) {
					let taken = false;
					if (Math.floor(Math.random() * 40) + 1 === 1) {
						if (map[r][c] !== 0) taken = true;

						if (!taken) {
							map[r][c] = 4;
							winPos[0] = r;
							winPos[1] = c;
							return;
						}
					}
				}
			}
		}
	}
}

/*
	Row = Y axis
	Collom = X axis

	playerPos[0] r
	playerPos[1] c

	player		1
	mover		2
	blocker		3
	win			4

	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],

*/

function move(x, msg) {
	if (x === 1) {
		//  left
		// unable to move
		if (playerPos[1] === 0) {
			msg.channel.send("You cant move to the left").then((Smsg) => {
				try {
					Smsg.delete({ timeout: 1500 });
				} catch (error) {
					return;
				}
			});
			return;
		} else if (winPos[0] === playerPos[0] && winPos[1] + 1 === playerPos[1]) {
			msg.channel
				.send("You cant move to the left the winning spot is in the way")
				.then((Smsg) => {
					try {
						Smsg.delete({ timeout: 1500 });
					} catch (error) {
						return;
					}
				});
			return;
		} else if (map[playerPos[0]][playerPos[1] - 1] === 3) {
			msg.channel.send("You cant move to the left a blocker is in the way").then((Smsg) => {
				try {
					Smsg.delete({ timeout: 1500 });
				} catch (error) {
					return;
				}
			});
			return;
		}

		//mover
		if (moverPos[0] === playerPos[0] && moverPos[1] + 1 === playerPos[1]) {
			if (moverPos[1] === 0) {
				msg.channel
					.send("You cant move to the left the mover reached the edge")
					.then((Smsg) => {
						try {
							Smsg.delete({ timeout: 1500 });
						} catch (error) {
							return;
						}
					});
				return;
			} else if (map[moverPos[0]][moverPos[1] - 1] === 3) {
				msg.channel.send("You cant move to the left a blocker is in the way").then((Smsg) => {
					try {
						Smsg.delete({ timeout: 1500 });
					} catch (error) {
						return;
					}
				});
				return;
			}

			map[moverPos[0]][moverPos[1]] = 0;
			moverPos[1] -= 1;
			map[moverPos[0]][moverPos[1]] = 2;
		}

		if (winPos[0] === moverPos[0] && winPos[1] === moverPos[1]) wining = true;

		map[playerPos[0]][playerPos[1]] = 0;
		playerPos[1] -= 1;
		map[playerPos[0]][playerPos[1]] = 1;
	} else if (x === 2) {
		//  up
		// unable to move
		if (playerPos[0] === 0) {
			msg.channel.send("You cant move to up").then((Smsg) => {
				try {
					Smsg.delete({ timeout: 1500 });
				} catch (error) {
					return;
				}
			});
			return;
		} else if (winPos[0] + 1 === playerPos[0] && winPos[1] === playerPos[1]) {
			msg.channel.send("You cant move up the winning spot is in the way").then((Smsg) => {
				try {
					Smsg.delete({ timeout: 1500 });
				} catch (error) {
					return;
				}
			});
			return;
		} else if (map[playerPos[0] - 1][playerPos[1]] === 3) {
			msg.channel.send("You cant move up a blocker is in the way").then((Smsg) => {
				try {
					Smsg.delete({ timeout: 1500 });
				} catch (error) {
					return;
				}
			});
			return;
		}

		//mover
		if (moverPos[0] + 1 === playerPos[0] && moverPos[1] === playerPos[1]) {
			if (moverPos[0] === 0) {
				msg.channel.send("You cant move up the mover reached the edge").then((Smsg) => {
					try {
						Smsg.delete({ timeout: 1500 });
					} catch (error) {
						return;
					}
				});
				return;
			} else if (map[moverPos[0] - 1][moverPos[1]] === 3) {
				msg.channel.send("You cant move up a blocker is in the way").then((Smsg) => {
					try {
						Smsg.delete({ timeout: 1500 });
					} catch (error) {
						return;
					}
				});
				return;
			}

			map[moverPos[0]][moverPos[1]] = 0;
			moverPos[0] -= 1;
			map[moverPos[0]][moverPos[1]] = 2;
		}

		if (winPos[0] === moverPos[0] && winPos[1] === moverPos[1]) wining = true;

		map[playerPos[0]][playerPos[1]] = 0;
		playerPos[0] -= 1;
		map[playerPos[0]][playerPos[1]] = 1;
	} else if (x === 3) {
		//  down
		// unable to move
		if (playerPos[0] === map.length - 1) {
			msg.channel.send("You cant move to the bottom").then((Smsg) => {
				try {
					Smsg.delete({ timeout: 1500 });
				} catch (error) {
					return;
				}
			});
			return;
		} else if (winPos[0] - 1 === playerPos[0] && winPos[1] === playerPos[1]) {
			msg.channel
				.send("You cant move to the bottom the winning spot is in the way")
				.then((Smsg) => {
					try {
						Smsg.delete({ timeout: 1500 });
					} catch (error) {
						return;
					}
				});
			return;
		} else if (map[playerPos[0] + 1][playerPos[1]] === 3) {
			msg.channel.send("You cant move to the bottom a blocker is in the way").then((Smsg) => {
				try {
					Smsg.delete({ timeout: 1500 });
				} catch (error) {
					return;
				}
			});
			return;
		}

		//mover
		if (moverPos[0] - 1 === playerPos[0] && moverPos[1] === playerPos[1]) {
			if (moverPos[0] === map.length - 1) {
				msg.channel
					.send("You cant move to the bottom the mover reached the edge")
					.then((Smsg) => {
						try {
							Smsg.delete({ timeout: 1500 });
						} catch (error) {
							return;
						}
					});
				return;
			} else if (map[moverPos[0] + 1][moverPos[1]] === 3) {
				msg.channel.send("You cant move to the bottom a blocker is in the way").then((Smsg) => {
					try {
						Smsg.delete({ timeout: 1500 });
					} catch (error) {
						return;
					}
				});
				return;
			}

			map[moverPos[0]][moverPos[1]] = 0;
			moverPos[0] += 1;
			map[moverPos[0]][moverPos[1]] = 2;
		}

		if (winPos[0] === moverPos[0] && winPos[1] === moverPos[1]) wining = true;

		map[playerPos[0]][playerPos[1]] = 0;
		playerPos[0] += 1;
		map[playerPos[0]][playerPos[1]] = 1;
	} else if (x === 4) {
		//  right
		// unable to move
		if (playerPos[1] === map[0].length - 1) {
			msg.channel.send("You cant move to the right").then((Smsg) => {
				try {
					Smsg.delete({ timeout: 1500 });
				} catch (error) {
					return;
				}
			});
			return;
		} else if (winPos[0] === playerPos[0] && winPos[1] - 1 === playerPos[1]) {
			msg.channel
				.send("You cant move to the right the winning spot is in the way")
				.then((Smsg) => {
					try {
						Smsg.delete({ timeout: 1500 });
					} catch (error) {
						return;
					}
				});
			return;
		} else if (map[playerPos[0]][playerPos[1] + 1] === 3) {
			msg.channel.send("You cant move to the right a blocker is in the way").then((Smsg) => {
				try {
					Smsg.delete({ timeout: 1500 });
				} catch (error) {
					return;
				}
			});
			return;
		}

		//mover
		if (moverPos[0] === playerPos[0] && moverPos[1] - 1 === playerPos[1]) {
			if (moverPos[1] === map[0].length - 1) {
				msg.channel
					.send("You cant move to the right the mover reached the edge")
					.then((Smsg) => {
						try {
							Smsg.delete({ timeout: 1500 });
						} catch (error) {
							return;
						}
					});
				return;
			} else if (map[moverPos[0]][moverPos[1] + 1] === 3) {
				msg.channel.send("You cant move to the right a blocker is in the way").then((Smsg) => {
					try {
						Smsg.delete({ timeout: 1500 });
					} catch (error) {
						return;
					}
				});
				return;
			}

			map[moverPos[0]][moverPos[1]] = 0;
			moverPos[1] += 1;
			map[moverPos[0]][moverPos[1]] = 2;
		}

		if (winPos[0] === moverPos[0] && winPos[1] === moverPos[1]) wining = true;

		map[playerPos[0]][playerPos[1]] = 0;
		playerPos[1] += 1;
		map[playerPos[0]][playerPos[1]] = 1;
	}

	return;
}

function PrettyMap() {
	let emojiMap = " ";
	if (wining === true) {
		for (var r = 0; r < map.length; ++r) {
			for (var c = 0; c < map[r].length; ++c) {
				//empty square
				if (map[r][c] === 0) {
					let rand = Math.floor(Math.random() * 5) + 1;
					if (rand == 1) emojiMap = emojiMap.concat(`:yellow_square:`);
					if (rand == 2) emojiMap = emojiMap.concat(`:large_blue_diamond:`);
					if (rand == 3) emojiMap = emojiMap.concat(`:white_large_square:`);
					if (rand == 4) emojiMap = emojiMap.concat(`:red_square:`);
					if (rand == 5) emojiMap = emojiMap.concat(`:purple_circle:`);
				}
				//Player
				if (map[r][c] === 1) emojiMap = emojiMap.concat(`:smile:`);
				//Movable
				if (map[r][c] === 2) emojiMap = emojiMap.concat(`:brown_square:`);
				//Blocker
				if (map[r][c] === 3) emojiMap = emojiMap.concat(`:octagonal_sign:`);
				//Win
				if (map[r][c] === 4) emojiMap = emojiMap.concat(`:negative_squared_cross_mark:`);
			}
			emojiMap = emojiMap.concat("\n");
		}
	} else {
		for (var r = 0; r < map.length; ++r) {
			for (var c = 0; c < map[r].length; ++c) {
				//empty square
				if (map[r][c] === 0) emojiMap = emojiMap.concat(`:black_large_square:`);
				//Player
				if (map[r][c] === 1) emojiMap = emojiMap.concat(`:clown:`);
				//Movable
				if (map[r][c] === 2) emojiMap = emojiMap.concat(`:brown_square:`);
				//Blocker
				if (map[r][c] === 3) emojiMap = emojiMap.concat(`:octagonal_sign:`);
				//Win
				if (map[r][c] === 4) emojiMap = emojiMap.concat(`:negative_squared_cross_mark:`);
			}
			emojiMap = emojiMap.concat("\n");
		}
	}
	return emojiMap;
}

module.exports.help = {
	name: "blocky",
};
