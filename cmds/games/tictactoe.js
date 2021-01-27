module.exports.run = async (bot, msg, args) => {
	const sleep = require('../../assets/functions/sleep.js').sleep;
	const playingGame = require('../../assets/functions/playingGame.js').playingGame;
	const Discord = require('discord.js');

	if (playingGame.has(msg.author.id))
		return msg.channel.send('You are already playing a game finish it to start a new one');

	playingGame.add(msg.author.id);

	const GameManager = require('nicnacno');
	var gameManager = new GameManager('Player', 'Kyle');
	let tictactoe = require('ai-tic-tac-toe');
	let board = ['', '', '', '', '', '', '', '', ''];
	let end = false;

	while (!end) {
		if (gameManager.game.nextMove == 'X') {
			sleep(50);

			let TTTembed = new Discord.MessageEmbed()
				.setTitle(`**TicTacToe**`)
				.setColor('#0099ff')
				.setURL('https://discord.gg/z4FpxSJ')
				.setThumbnail(msg.author.avatarURL())
				.setFooter(`1 | 2 | 3\n4 | 5 | 6\n7 | 8 | 9`);
			await TTTembed.setDescription(Map());

			await msg.channel.send(TTTembed).then(async (Smsg) => {
				try {
					const filter = (m) => {
						return (
							m.author.id == msg.author.id &&
							(m.content.toLowerCase() == '1' ||
								m.content.toLowerCase() == '2' ||
								m.content.toLowerCase() == '3' ||
								m.content.toLowerCase() == '4' ||
								m.content.toLowerCase() == '5' ||
								m.content.toLowerCase() == '6' ||
								m.content.toLowerCase() == '7' ||
								m.content.toLowerCase() == '8' ||
								m.content.toLowerCase() == '9')
						);
					};

					await msg.channel
						.awaitMessages(filter, { max: 1, time: 15000, errors: ['time'] })
						.then(async (collected) => {
							let input = collected.first();
							let reaction = input.content.toLowerCase().split(/\s+/g);

							if (reaction[0].startsWith('1')) Place(0);
							else if (reaction[0].startsWith('2')) Place(1);
							else if (reaction[0].startsWith('3')) Place(2);
							else if (reaction[0].startsWith('4')) Place(3);
							else if (reaction[0].startsWith('5')) Place(4);
							else if (reaction[0].startsWith('6')) Place(5);
							else if (reaction[0].startsWith('7')) Place(6);
							else if (reaction[0].startsWith('8')) Place(7);
							else if (reaction[0].startsWith('9')) Place(8);
						});
				} catch (error) {
					end = true;
					return msg.channel.send('Time ran out. Bye');
				}
			});
		} else {
			let position = tictactoe.getmove(board, 'o');
			board[position] = 'o';
			gameManager.game.applyMove(position + 1);
		}

		if (gameManager.game.result !== undefined) {
			end = true;
		}
	}

	if (gameManager.game.result === 'draw') {
		let GGembed = new Discord.MessageEmbed()
			.setTitle(`**TicTacToe**`)
			.setColor('#32cd32')
			.setURL('https://discord.gg/z4FpxSJ')
			.setThumbnail(msg.author.avatarURL());
		await GGembed.setDescription(`**GG It was a Draw**\n${Map()}`);

		msg.channel.send(GGembed);
	}

	if (gameManager.game.result === 'X') {
		let GGembed = new Discord.MessageEmbed()
			.setTitle(`**TicTacToe**`)
			.setColor('#32cd32')
			.setURL('https://discord.gg/z4FpxSJ')
			.setThumbnail(msg.author.avatarURL());
		await GGembed.setDescription(`**GG You Won!**\n${Map()}`);

		msg.channel.send(GGembed);
	}

	if (gameManager.game.result === 'O') {
		let GGembed = new Discord.MessageEmbed()
			.setTitle(`**TicTacToe**`)
			.setColor('#ff0000')
			.setURL('https://discord.gg/z4FpxSJ')
			.setThumbnail(msg.author.avatarURL());
		await GGembed.setDescription(`**Dam U suck!**\n${Map()}`);

		msg.channel.send(GGembed);
	}

	playingGame.delete(msg.author.id);

	function Place(pos) {
		if (gameManager.game.isValidMove(pos + 1)) {
			board[pos] = 'x';
			gameManager.game.applyMove(pos + 1);
		}
	}

	function Map() {
		let gameMap = '';
		for (var i = 0; i < 9; ++i) {
			gameMap = board[i] ? gameMap.concat(`** ${board[i]}** `) : gameMap.concat(`** \*** `);
			if (i === 2 || i === 5) gameMap = gameMap.concat('\n');
		}
		return gameMap;
	}
};

module.exports.help = {
	name: 'tictactoe',
	Alias: 'ttt',
	description: 'Play TicTacToe with Kyle',
};
