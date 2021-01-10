const playingGame = require('../../assets/functions/playingGame.js').playingGame;

module.exports.run = async (bot, msg, args) => {
	if (playingGame.has(msg.author.id))
		return msg.channel.send('You are already playing a game finish it to start a new one');

	playingGame.add(msg.author.id);

	const Discord = require('discord.js');
	const db = require('quick.db');
	var economy = new db.table('economy');
	let author = msg.author.id;
	let bet = args[1];

	if (!economy.get(`${author}.bal`)) {
		let ErrorEmbed = new Discord.MessageEmbed()
			.setTitle('**ERROR**')
			.setColor(0xff0000)
			.setDescription('You are not in the system, try .newbal');
		msg.channel.send(ErrorEmbed);
		return playingGame.delete(msg.author.id);
	}

	if (!args[1] || isNaN(bet)) {
		let ErrorEmbed = new Discord.MessageEmbed()
			.setTitle('**ERROR**')
			.setColor(0xff0000)
			.setDescription('How much do you want to bet? `.bj <$>`');
		msg.channel.send(ErrorEmbed);
		return playingGame.delete(msg.author.id);
	}

	bet = Math.floor(bet);

	if (bet < 0) {
		let ErrorEmbed = new Discord.MessageEmbed()
			.setTitle('**ERROR**')
			.setColor(0xff0000)
			.setDescription('You must bet 0 or more.');
		msg.channel.send(ErrorEmbed);
		return playingGame.delete(msg.author.id);
	}

	if (bet > 1000) {
		let ErrorEmbed = new Discord.MessageEmbed()
			.setTitle('**ERROR**')
			.setColor(0xff0000)
			.setDescription('Max bet is 1000💰 ')
			.setFooter(`Your bet was chaned from ${bet}💰 to 1000💰`);
		msg.channel.send(ErrorEmbed);

		bet = 1000;
	}

	if (economy.get(`${author}.bal`) < bet) {
		let ErrorEmbed = new Discord.MessageEmbed()
			.setTitle('**ERROR**')
			.setColor(0xff0000)
			.setDescription('You do not have enough money.');
		msg.channel.send(ErrorEmbed);
		return playingGame.delete(msg.author.id);
	}

	var a = 11;
	// prettier-ignore
	var card = [
		2, 2, 2, 2,
		3, 3, 3, 3,
		4, 4, 4, 4,
		5, 5, 5, 5,
		6, 6, 6, 6,
		7, 7, 7, 7, 
		8, 8, 8, 8, 
		9, 9, 9, 9,
		10, 10, 10, 10,
		a, a, a, a
	];

	var c1, c2, c3, c4, c5;
	for (let i = 1; i <= 5; ++i) {
		let cardPos = Math.floor(Math.random() * card.length);

		if (i === 1) {
			c1 = card[cardPos];
		} else if (i === 2) {
			c2 = card[cardPos];
		} else if (i === 3) {
			c3 = card[cardPos];
		} else if (i === 4) {
			c4 = card[cardPos];
		} else if (i === 5) {
			c5 = card[cardPos];
		}

		card.splice(cardPos, 1);
	}
	var cardtotal = c1 + c2;
	var pcards = [];

	if (cardtotal > 21) {
		if (c1 === 11) {
			c1 = 1;
			cardtotal -= 10;
			let index = pcards.indexOf(11);
			if (index !== -1) {
				pcards[index] = 1;
			}
		} else if (c2 === 11) {
			c2 = 1;
			cardtotal -= 10;
			let index = pcards.indexOf(11);
			if (index !== -1) {
				pcards[index] = 1;
			}
		}
	}
	pcards.push(c1, c2);

	var dc1, dc2, dc3, dc4, dc5, dc6, dc7, dc8, dc9, dc10;

	for (let i = 1; i <= 10; ++i) {
		let cardPos = Math.floor(Math.random() * card.length);

		if (i === 1) {
			dc1 = card[cardPos];
		} else if (i === 2) {
			dc2 = card[cardPos];
		} else if (i === 3) {
			dc3 = card[cardPos];
		} else if (i === 4) {
			dc4 = card[cardPos];
		} else if (i === 5) {
			dc5 = card[cardPos];
		} else if (i === 6) {
			dc6 = card[cardPos];
		} else if (i === 7) {
			dc7 = card[cardPos];
		} else if (i === 8) {
			dc8 = card[cardPos];
		} else if (i === 9) {
			dc9 = card[cardPos];
		} else if (i === 10) {
			dc10 = card[cardPos];
		}

		card.splice(cardPos, 1);
	}
	var dcardtotal = dc1;
	var dcards = [];
	dcards.push(dc1);

	let cards = new Discord.MessageEmbed()
		.setTitle('**Black Jack**')
		.setThumbnail(msg.author.avatarURL())
		.setColor(0x0099ff)
		.setDescription(
			'Your cards are a ' +
				pcards +
				' with a total of ' +
				cardtotal +
				'.\nDealers card is a ' +
				dcards +
				'.\n Do you want to hit (:thumbsup:) or stand (:thumbsdown:)?'
		);
	msg.channel.send(cards).then((sentMessage) => {
		if (cardtotal === 21) {
			economy.add(`${author}.bal`, bet);
			let cards = new Discord.MessageEmbed()
				.setTitle('**Black Jack**')
				.setThumbnail(msg.author.avatarURL())
				.setColor(0x0099ff)
				.setDescription(
					'YOU WON!! You got a Black Jack\n\nYour cards are a ' +
						pcards +
						', with a total of ' +
						cardtotal +
						'.\nDealers cards are a ' +
						dcards +
						', with a total of ' +
						dcardtotal +
						'.\n You WON: ' +
						bet +
						' 💰 \n You now have: ' +
						economy.get(`${author}.bal`) +
						' 💰 '
				);
			msg.channel.send(cards);
			return playingGame.delete(msg.author.id);
		}

		if (cardtotal > 21) {
			economy.subtract(`${author}.bal`, bet);
			economy.add(`Prizepool`, bet);
			let cards = new Discord.MessageEmbed()
				.setTitle('**Black Jack\n You Busted**')
				.setThumbnail(msg.author.avatarURL())
				.setColor(0x0099ff)
				.setDescription(
					'**YOU LOST :(** You Busted\n\nYour cards are a ' +
						pcards +
						', with a total of ' +
						cardtotal +
						'.\nDealers cards are a ' +
						dcards +
						', with a total of ' +
						dcardtotal +
						'.\n You LOST: ' +
						bet +
						' 💰 \n You now have: ' +
						economy.get(`${author}.bal`) +
						' 💰 '
				);
			msg.channel.send(cards);
			return playingGame.delete(msg.author.id);
		}

		sentMessage.react('👍');
		sentMessage.react('👎');

		const filter = (reaction, user) => {
			return ['👍', '👎'].includes(reaction.emoji.name) && user.id === msg.author.id;
		};

		sentMessage
			.awaitReactions(filter, { max: 1, time: 15000, errors: ['time'] })
			.then((collected) => {
				const reaction = collected.first();

				if (reaction.emoji.name === '👍') {
					cardtotal += c3;

					if (cardtotal > 21) {
						if (c1 === 11) {
							c1 = 1;
							cardtotal -= 10;
							let index = pcards.indexOf(11);
							if (index !== -1) {
								pcards[index] = 1;
							}
						} else if (c2 === 11) {
							c2 = 1;
							cardtotal -= 10;
							let index = pcards.indexOf(11);
							if (index !== -1) {
								pcards[index] = 1;
							}
						} else if (c3 === 11) {
							c3 = 1;
							cardtotal -= 10;
							let index = pcards.indexOf(11);
							if (index !== -1) {
								pcards[index] = 1;
							}
						}
					}

					pcards.push(c3);

					if (cardtotal === 21) {
						economy.add(`${author}.bal`, bet);
						let cards = new Discord.MessageEmbed()
							.setTitle('**Black Jack**')
							.setThumbnail(msg.author.avatarURL())
							.setColor(0x0099ff)
							.setDescription(
								'YOU WON!! You got a Black Jack\n\nYour cards are a ' +
									pcards +
									', with a total of ' +
									cardtotal +
									'.\nDealers cards are a ' +
									dcards +
									', with a total of ' +
									dcardtotal +
									'.\n You WON: ' +
									bet +
									' 💰 \n You now have: ' +
									economy.get(`${author}.bal`) +
									' 💰 '
							);
						msg.channel.send(cards);
						return playingGame.delete(msg.author.id);
					}

					if (cardtotal > 21) {
						economy.subtract(`${author}.bal`, bet);
						economy.add(`Prizepool`, bet);
						let cards = new Discord.MessageEmbed()
							.setTitle('**Black Jack\n You Busted**')
							.setThumbnail(msg.author.avatarURL())
							.setColor(0x0099ff)
							.setDescription(
								'**YOU LOST :(** You Busted\n\nYour cards are a ' +
									pcards +
									', with a total of ' +
									cardtotal +
									'.\nDealers cards are a ' +
									dcards +
									', with a total of ' +
									dcardtotal +
									'.\n You LOST: ' +
									bet +
									' 💰 \n You now have: ' +
									economy.get(`${author}.bal`) +
									' 💰 '
							);
						msg.channel.send(cards);
						return playingGame.delete(msg.author.id);
					}

					//_______________________________________________________________________

					let cards2 = new Discord.MessageEmbed()
						.setTitle('**Black Jack**')
						.setThumbnail(msg.author.avatarURL())
						.setColor(0x0099ff)
						.setDescription(
							'Your cards are a ' +
								pcards +
								' with a total of ' +
								cardtotal +
								'.\nDealers card is a ' +
								dcards +
								'.\n Do you want to hit (:thumbsup:) or stand (:thumbsdown:)?'
						);
					msg.channel.send(cards2).then((sentMessage2) => {
						if (cardtotal === 21) {
							economy.add(`${author}.bal`, bet);
							let cards21 = new Discord.MessageEmbed()
								.setTitle('**Black Jack**')
								.setThumbnail(msg.author.avatarURL())
								.setColor(0x0099ff)
								.setDescription(
									'YOU WON!! You got a Black Jack\n\nYour cards are a ' +
										pcards +
										', with a total of ' +
										cardtotal +
										'.\nDealers cards are a ' +
										dcards +
										', with a total of ' +
										dcardtotal +
										'.\n You WON: ' +
										bet +
										' 💰 \n You now have: ' +
										economy.get(`${author}.bal`) +
										' 💰 '
								);
							msg.channel.send(cards21);
							return playingGame.delete(msg.author.id);
						}

						if (cardtotal > 21) {
							economy.subtract(`${author}.bal`, bet);
							economy.add(`Prizepool`, bet);
							let cards = new Discord.MessageEmbed()
								.setTitle('**Black Jack\n You Busted**')
								.setThumbnail(msg.author.avatarURL())
								.setColor(0x0099ff)
								.setDescription(
									'**YOU LOST :(** You Busted\n\nYour cards are a ' +
										pcards +
										', with a total of ' +
										cardtotal +
										'.\nDealers cards are a ' +
										dcards +
										', with a total of ' +
										dcardtotal +
										'.\n You LOST: ' +
										bet +
										' 💰 \n You now have: ' +
										economy.get(`${author}.bal`) +
										' 💰 '
								);
							msg.channel.send(cards);
							return playingGame.delete(msg.author.id);
						}

						sentMessage2.react('👍');
						sentMessage2.react('👎');

						const filter = (reaction, user) => {
							return ['👍', '👎'].includes(reaction.emoji.name) && user.id === msg.author.id;
						};

						sentMessage2
							.awaitReactions(filter, { max: 1, time: 15000, errors: ['time'] })
							.then((collected) => {
								const reaction = collected.first();

								if (reaction.emoji.name === '👍') {
									cardtotal += c4;

									if (cardtotal > 21) {
										if (c1 === 11) {
											c1 = 1;
											cardtotal -= 10;
											let index = pcards.indexOf(11);
											if (index !== -1) {
												pcards[index] = 1;
											}
										} else if (c2 === 11) {
											c2 = 1;
											cardtotal -= 10;
											let index = pcards.indexOf(11);
											if (index !== -1) {
												pcards[index] = 1;
											}
										} else if (c3 === 11) {
											c3 = 1;
											cardtotal -= 10;
											let index = pcards.indexOf(11);
											if (index !== -1) {
												pcards[index] = 1;
											}
										} else if (c4 === 11) {
											c4 = 1;
											cardtotal -= 10;
											let index = pcards.indexOf(11);
											if (index !== -1) {
												pcards[index] = 1;
											}
										}
									}

									pcards.push(c4);

									if (cardtotal === 21) {
										economy.add(`${author}.bal`, bet);
										let cards = new Discord.MessageEmbed()
											.setTitle('**Black Jack**')
											.setThumbnail(msg.author.avatarURL())
											.setColor(0x0099ff)
											.setDescription(
												'YOU WON!! You got a Black Jack\n\nYour cards are a ' +
													pcards +
													', with a total of ' +
													cardtotal +
													'.\nDealers cards are a ' +
													dcards +
													', with a total of ' +
													dcardtotal +
													'.\n You WON: ' +
													bet +
													' 💰 \n You now have: ' +
													economy.get(`${author}.bal`) +
													' 💰 '
											);
										msg.channel.send(cards);
										return playingGame.delete(msg.author.id);
									}

									if (cardtotal > 21) {
										economy.subtract(`${author}.bal`, bet);
										economy.add(`Prizepool`, bet);
										let cards = new Discord.MessageEmbed()
											.setTitle('**Black Jack\n You Busted**')
											.setThumbnail(msg.author.avatarURL())
											.setColor(0x0099ff)
											.setDescription(
												'**YOU LOST :(** You Busted\n\nYour cards are a ' +
													pcards +
													', with a total of ' +
													cardtotal +
													'.\nDealers cards are a ' +
													dcards +
													', with a total of ' +
													dcardtotal +
													'.\n You LOST: ' +
													bet +
													' 💰 \n You now have: ' +
													economy.get(`${author}.bal`) +
													' 💰 '
											);
										msg.channel.send(cards);
										return playingGame.delete(msg.author.id);
									}
									//___________________________________________________
									let cards2 = new Discord.MessageEmbed()
										.setTitle('**Black Jack**')
										.setThumbnail(msg.author.avatarURL())
										.setColor(0x0099ff)
										.setDescription(
											'Your cards are a ' +
												pcards +
												' with a total of ' +
												cardtotal +
												'.\nDealers card is a ' +
												dcards +
												'.\n Do you want to hit (:thumbsup:) or stand (:thumbsdown:)?'
										);
									msg.channel.send(cards2).then((sentMessage2) => {
										if (cardtotal === 21) {
											economy.add(`${author}.bal`, bet);
											let cards21 = new Discord.MessageEmbed()
												.setTitle('**Black Jack**')
												.setThumbnail(msg.author.avatarURL())
												.setColor(0x0099ff)
												.setDescription(
													'YOU WON!! You got a Black Jack\n\nYour cards are a ' +
														pcards +
														', with a total of ' +
														cardtotal +
														'.\nDealers cards are a ' +
														dcards +
														', with a total of ' +
														dcardtotal +
														'.\n You WON: ' +
														bet +
														' 💰 \n You now have: ' +
														economy.get(`${author}.bal`) +
														' 💰 '
												);
											msg.channel.send(cards21);
											return playingGame.delete(msg.author.id);
										}

										if (cardtotal > 21) {
											economy.subtract(`${author}.bal`, bet);
											economy.add(`Prizepool`, bet);
											let cards = new Discord.MessageEmbed()
												.setTitle('**Black Jack\n You Busted**')
												.setThumbnail(msg.author.avatarURL())
												.setColor(0x0099ff)
												.setDescription(
													'**YOU LOST :(** You Busted\n\nYour cards are a ' +
														pcards +
														', with a total of ' +
														cardtotal +
														'.\nDealers cards are a ' +
														dcards +
														', with a total of ' +
														dcardtotal +
														'.\n You LOST: ' +
														bet +
														' 💰 \n You now have: ' +
														economy.get(`${author}.bal`) +
														' 💰 '
												);
											msg.channel.send(cards);
											return playingGame.delete(msg.author.id);
										}

										sentMessage2.react('👍');
										sentMessage2.react('👎');

										const filter = (reaction, user) => {
											return (
												['👍', '👎'].includes(reaction.emoji.name) && user.id === msg.author.id
											);
										};

										sentMessage2
											.awaitReactions(filter, {
												max: 1,
												time: 15000,
												errors: ['time'],
											})
											.then((collected) => {
												const reaction = collected.first();

												if (reaction.emoji.name === '👍') {
													cardtotal += c5;

													if (cardtotal > 21) {
														if (c1 === 11) {
															c1 = 1;
															cardtotal -= 10;
															let index = pcards.indexOf(11);
															if (index !== -1) {
																pcards[index] = 1;
															}
														} else if (c2 === 11) {
															c2 = 1;
															cardtotal -= 10;
															let index = pcards.indexOf(11);
															if (index !== -1) {
																pcards[index] = 1;
															}
														} else if (c3 === 11) {
															c3 = 1;
															cardtotal -= 10;
															let index = pcards.indexOf(11);
															if (index !== -1) {
																pcards[index] = 1;
															}
														} else if (c4 === 11) {
															c4 = 1;
															cardtotal -= 10;
															let index = pcards.indexOf(11);
															if (index !== -1) {
																pcards[index] = 1;
															}
														} else if (c5 === 11) {
															c5 = 1;
															cardtotal -= 10;
															let index = pcards.indexOf(11);
															if (index !== -1) {
																pcards[index] = 1;
															}
														}
													}

													pcards.push(c5);

													if (cardtotal <= 21) {
														bet *= 3;
														economy.add(`${author}.bal`, bet);
														let cards = new Discord.MessageEmbed()
															.setTitle('**Black Jack**')
															.setThumbnail(msg.author.avatarURL())
															.setColor(0x0099ff)
															.setDescription(
																'YOU WON!! (5 cards 21 or less -> bet 3X)\n\nYour cards are a ' +
																	pcards +
																	', with a total of ' +
																	cardtotal +
																	'.\nDealers cards are a ' +
																	dcards +
																	', with a total of ' +
																	dcardtotal +
																	'.\n You WON: ' +
																	bet +
																	' 💰 \n You now have: ' +
																	economy.get(`${author}.bal`) +
																	' 💰 '
															);
														msg.channel.send(cards);
														return playingGame.delete(msg.author.id);
													}

													if (cardtotal > 21) {
														economy.subtract(`${author}.bal`, bet);
														economy.add(`Prizepool`, bet);
														let cards = new Discord.MessageEmbed()
															.setTitle('**Black Jack\n You Busted**')
															.setThumbnail(msg.author.avatarURL())
															.setColor(0x0099ff)
															.setDescription(
																'**YOU LOST :(** You Busted\n\nYour cards are a ' +
																	pcards +
																	', with a total of ' +
																	cardtotal +
																	'.\nDealers cards are a ' +
																	dcards +
																	', with a total of ' +
																	dcardtotal +
																	'.\n You LOST: ' +
																	bet +
																	' 💰 \n You now have: ' +
																	economy.get(`${author}.bal`) +
																	' 💰 '
															);
														msg.channel.send(cards);
														return playingGame.delete(msg.author.id);
													}
												} else if (reaction.emoji.name === '👎') {
													dcardtotal += dc2;

													if (dcardtotal > 21) {
														if (dc1 === 11) {
															dc1 = 1;
															dcardtotal -= 10;
															let index = dcards.indexOf(11);
															if (index !== -1) {
																dcards[index] = 1;
															}
														} else if (dc2 === 11) {
															dc2 = 1;
															dcardtotal -= 10;
															let index = dcards.indexOf(11);
															if (index !== -1) {
																dcards[index] = 1;
															}
														}
													}

													dcards.push(dc2);

													for (let i = 3; dcardtotal <= 16; ++i) {
														if (i === 3) {
															dcardtotal += dc3;

															if (dcardtotal > 21) {
																if (dc1 === 11) {
																	dc1 = 1;
																	dcardtotal -= 10;
																	let index = dcards.indexOf(11);
																	if (index !== -1) {
																		dcards[index] = 1;
																	}
																} else if (dc2 === 11) {
																	dc2 = 1;
																	dcardtotal -= 10;
																	let index = dcards.indexOf(11);
																	if (index !== -1) {
																		dcards[index] = 1;
																	}
																} else if (dc3 === 11) {
																	dc3 = 1;
																	dcardtotal -= 10;
																	let index = dcards.indexOf(11);
																	if (index !== -1) {
																		dcards[index] = 1;
																	}
																}
															}
															dcards.push(dc3);
														}
														if (i === 4) {
															dcardtotal += dc4;

															if (dcardtotal > 21) {
																if (dc1 === 11) {
																	dc1 = 1;
																	dcardtotal -= 10;
																	let index = dcards.indexOf(11);
																	if (index !== -1) {
																		dcards[index] = 1;
																	}
																} else if (dc2 === 11) {
																	dc2 = 1;
																	dcardtotal -= 10;
																	let index = dcards.indexOf(11);
																	if (index !== -1) {
																		dcards[index] = 1;
																	}
																} else if (dc3 === 11) {
																	dc3 = 1;
																	dcardtotal -= 10;
																	let index = dcards.indexOf(11);
																	if (index !== -1) {
																		dcards[index] = 1;
																	}
																} else if (dc4 === 11) {
																	dc4 = 1;
																	dcardtotal -= 10;
																	let index = dcards.indexOf(11);
																	if (index !== -1) {
																		dcards[index] = 1;
																	}
																}
															}

															dcards.push(dc4);
														}
														if (i === 5) {
															dcardtotal += dc5;

															if (dcardtotal > 21) {
																if (dc1 === 11) {
																	dc1 = 1;
																	dcardtotal -= 10;
																	let index = dcards.indexOf(11);
																	if (index !== -1) {
																		dcards[index] = 1;
																	}
																} else if (dc2 === 11) {
																	dc2 = 1;
																	dcardtotal -= 10;
																	let index = dcards.indexOf(11);
																	if (index !== -1) {
																		dcards[index] = 1;
																	}
																} else if (dc3 === 11) {
																	dc3 = 1;
																	dcardtotal -= 10;
																	let index = dcards.indexOf(11);
																	if (index !== -1) {
																		dcards[index] = 1;
																	}
																} else if (dc4 === 11) {
																	dc4 = 1;
																	dcardtotal -= 10;
																	let index = dcards.indexOf(11);
																	if (index !== -1) {
																		dcards[index] = 1;
																	}
																} else if (dc5 === 11) {
																	dc5 = 1;
																	dcardtotal -= 10;
																	let index = dcards.indexOf(11);
																	if (index !== -1) {
																		dcards[index] = 1;
																	}
																}
															}

															dcards.push(dc5);
														}
														if (i === 6) {
															dcardtotal += dc6;

															if (dcardtotal > 21) {
																if (dc1 === 11) {
																	dc1 = 1;
																	dcardtotal -= 10;
																	let index = dcards.indexOf(11);
																	if (index !== -1) {
																		dcards[index] = 1;
																	}
																} else if (dc2 === 11) {
																	dc2 = 1;
																	dcardtotal -= 10;
																	let index = dcards.indexOf(11);
																	if (index !== -1) {
																		dcards[index] = 1;
																	}
																} else if (dc3 === 11) {
																	dc3 = 1;
																	dcardtotal -= 10;
																	let index = dcards.indexOf(11);
																	if (index !== -1) {
																		dcards[index] = 1;
																	}
																} else if (dc4 === 11) {
																	dc4 = 1;
																	dcardtotal -= 10;
																	let index = dcards.indexOf(11);
																	if (index !== -1) {
																		dcards[index] = 1;
																	}
																} else if (dc5 === 11) {
																	dc5 = 1;
																	dcardtotal -= 10;
																	let index = dcards.indexOf(11);
																	if (index !== -1) {
																		dcards[index] = 1;
																	}
																} else if (dc6 === 11) {
																	dc6 = 1;
																	dcardtotal -= 10;
																	let index = dcards.indexOf(11);
																	if (index !== -1) {
																		dcards[index] = 1;
																	}
																}
															}

															dcards.push(dc6);
														}
														if (i === 7) {
															dcardtotal += dc7;

															if (dcardtotal > 21) {
																if (dc1 === 11) {
																	dc1 = 1;
																	dcardtotal -= 10;
																	let index = dcards.indexOf(11);
																	if (index !== -1) {
																		dcards[index] = 1;
																	}
																} else if (dc2 === 11) {
																	dc2 = 1;
																	dcardtotal -= 10;
																	let index = dcards.indexOf(11);
																	if (index !== -1) {
																		dcards[index] = 1;
																	}
																} else if (dc3 === 11) {
																	dc3 = 1;
																	dcardtotal -= 10;
																	let index = dcards.indexOf(11);
																	if (index !== -1) {
																		dcards[index] = 1;
																	}
																} else if (dc4 === 11) {
																	dc4 = 1;
																	dcardtotal -= 10;
																	let index = dcards.indexOf(11);
																	if (index !== -1) {
																		dcards[index] = 1;
																	}
																} else if (dc5 === 11) {
																	dc5 = 1;
																	dcardtotal -= 10;
																	let index = dcards.indexOf(11);
																	if (index !== -1) {
																		dcards[index] = 1;
																	}
																} else if (dc6 === 11) {
																	dc6 = 1;
																	dcardtotal -= 10;
																	let index = dcards.indexOf(11);
																	if (index !== -1) {
																		dcards[index] = 1;
																	}
																} else if (dc7 === 11) {
																	dc7 = 1;
																	dcardtotal -= 10;
																	let index = dcards.indexOf(11);
																	if (index !== -1) {
																		dcards[index] = 1;
																	}
																}
															}

															dcards.push(dc7);
														}
														if (i === 8) {
															dcardtotal += dc8;

															if (dcardtotal > 21) {
																if (dc1 === 11) {
																	dc1 = 1;
																	dcardtotal -= 10;
																	let index = dcards.indexOf(11);
																	if (index !== -1) {
																		dcards[index] = 1;
																	}
																} else if (dc2 === 11) {
																	dc2 = 1;
																	dcardtotal -= 10;
																	let index = dcards.indexOf(11);
																	if (index !== -1) {
																		dcards[index] = 1;
																	}
																} else if (dc3 === 11) {
																	dc3 = 1;
																	dcardtotal -= 10;
																	let index = dcards.indexOf(11);
																	if (index !== -1) {
																		dcards[index] = 1;
																	}
																} else if (dc4 === 11) {
																	dc4 = 1;
																	dcardtotal -= 10;
																	let index = dcards.indexOf(11);
																	if (index !== -1) {
																		dcards[index] = 1;
																	}
																} else if (dc5 === 11) {
																	dc5 = 1;
																	dcardtotal -= 10;
																	let index = dcards.indexOf(11);
																	if (index !== -1) {
																		dcards[index] = 1;
																	}
																} else if (dc6 === 11) {
																	dc6 = 1;
																	dcardtotal -= 10;
																	let index = dcards.indexOf(11);
																	if (index !== -1) {
																		dcards[index] = 1;
																	}
																} else if (dc7 === 11) {
																	dc7 = 1;
																	dcardtotal -= 10;
																	let index = dcards.indexOf(11);
																	if (index !== -1) {
																		dcards[index] = 1;
																	}
																} else if (dc8 === 11) {
																	dc8 = 1;
																	dcardtotal -= 10;
																	let index = dcards.indexOf(11);
																	if (index !== -1) {
																		dcards[index] = 1;
																	}
																}
															}

															dcards.push(dc8);
														}
														if (i === 9) {
															dcardtotal += dc9;

															if (dcardtotal > 21) {
																if (dc1 === 11) {
																	dc1 = 1;
																	dcardtotal -= 10;
																	let index = dcards.indexOf(11);
																	if (index !== -1) {
																		dcards[index] = 1;
																	}
																} else if (dc2 === 11) {
																	dc2 = 1;
																	dcardtotal -= 10;
																	let index = dcards.indexOf(11);
																	if (index !== -1) {
																		dcards[index] = 1;
																	}
																} else if (dc3 === 11) {
																	dc3 = 1;
																	dcardtotal -= 10;
																	let index = dcards.indexOf(11);
																	if (index !== -1) {
																		dcards[index] = 1;
																	}
																} else if (dc4 === 11) {
																	dc4 = 1;
																	dcardtotal -= 10;
																	let index = dcards.indexOf(11);
																	if (index !== -1) {
																		dcards[index] = 1;
																	}
																} else if (dc5 === 11) {
																	dc5 = 1;
																	dcardtotal -= 10;
																	let index = dcards.indexOf(11);
																	if (index !== -1) {
																		dcards[index] = 1;
																	}
																} else if (dc6 === 11) {
																	dc6 = 1;
																	dcardtotal -= 10;
																	let index = dcards.indexOf(11);
																	if (index !== -1) {
																		dcards[index] = 1;
																	}
																} else if (dc7 === 11) {
																	dc7 = 1;
																	dcardtotal -= 10;
																	let index = dcards.indexOf(11);
																	if (index !== -1) {
																		dcards[index] = 1;
																	}
																} else if (dc8 === 11) {
																	dc8 = 1;
																	dcardtotal -= 10;
																	let index = dcards.indexOf(11);
																	if (index !== -1) {
																		dcards[index] = 1;
																	}
																} else if (dc9 === 11) {
																	dc9 = 1;
																	dcardtotal -= 10;
																	let index = dcards.indexOf(11);
																	if (index !== -1) {
																		dcards[index] = 1;
																	}
																}
															}

															dcards.push(dc9);
														}
														if (i === 10) {
															dcardtotal += dc10;

															if (dcardtotal > 21) {
																if (dc1 === 11) {
																	dc1 = 1;
																	dcardtotal -= 10;
																	let index = dcards.indexOf(11);
																	if (index !== -1) {
																		dcards[index] = 1;
																	}
																} else if (dc2 === 11) {
																	dc2 = 1;
																	dcardtotal -= 10;
																	let index = dcards.indexOf(11);
																	if (index !== -1) {
																		dcards[index] = 1;
																	}
																} else if (dc3 === 11) {
																	dc3 = 1;
																	dcardtotal -= 10;
																	let index = dcards.indexOf(11);
																	if (index !== -1) {
																		dcards[index] = 1;
																	}
																} else if (dc4 === 11) {
																	dc4 = 1;
																	dcardtotal -= 10;
																	let index = dcards.indexOf(11);
																	if (index !== -1) {
																		dcards[index] = 1;
																	}
																} else if (dc5 === 11) {
																	dc5 = 1;
																	dcardtotal -= 10;
																	let index = dcards.indexOf(11);
																	if (index !== -1) {
																		dcards[index] = 1;
																	}
																} else if (dc6 === 11) {
																	dc6 = 1;
																	dcardtotal -= 10;
																	let index = dcards.indexOf(11);
																	if (index !== -1) {
																		dcards[index] = 1;
																	}
																} else if (dc7 === 11) {
																	dc7 = 1;
																	dcardtotal -= 10;
																	let index = dcards.indexOf(11);
																	if (index !== -1) {
																		dcards[index] = 1;
																	}
																} else if (dc8 === 11) {
																	dc8 = 1;
																	dcardtotal -= 10;
																	let index = dcards.indexOf(11);
																	if (index !== -1) {
																		dcards[index] = 1;
																	}
																} else if (dc9 === 11) {
																	dc9 = 1;
																	dcardtotal -= 10;
																	let index = dcards.indexOf(11);
																	if (index !== -1) {
																		dcards[index] = 1;
																	}
																} else if (dc10 === 11) {
																	dc10 = 1;
																	dcardtotal -= 10;
																	let index = dcards.indexOf(11);
																	if (index !== -1) {
																		dcards[index] = 1;
																	}
																}
															}

															dcards.push(dc10);
														}
													}

													if (cardtotal === dcardtotal) {
														let cards = new Discord.MessageEmbed()
															.setTitle('**Black Jack**')
															.setThumbnail(msg.author.avatarURL())
															.setColor(0x0099ff)
															.setDescription(
																'**Its a PUSH** you both have the same score\n\nYour cards are a ' +
																	pcards +
																	', with a total of ' +
																	cardtotal +
																	'.\nDealers cards are a ' +
																	dcards +
																	', with a total of ' +
																	dcardtotal +
																	'.\nYou have: ' +
																	economy.get(`${author}.bal`) +
																	' 💰 '
															);
														msg.channel.send(cards);
														return playingGame.delete(msg.author.id);
													}

													if (dcardtotal === 21) {
														economy.subtract(`${author}.bal`, bet);
														economy.add(`Prizepool`, bet);
														let cards = new Discord.MessageEmbed()
															.setTitle('**Black Jack**')
															.setThumbnail(msg.author.avatarURL())
															.setColor(0x0099ff)
															.setDescription(
																'**YOU LOST :(** Dealer got a Black Jack\n\nYour cards are a ' +
																	pcards +
																	', with a total of ' +
																	cardtotal +
																	'.\nDealers cards are a ' +
																	dcards +
																	', with a total of ' +
																	dcardtotal +
																	'.\n You LOST: ' +
																	bet +
																	' 💰 \n You now have: ' +
																	economy.get(`${author}.bal`) +
																	' 💰 '
															);
														msg.channel.send(cards);
														return playingGame.delete(msg.author.id);
													}

													if (dcardtotal > 21) {
														economy.add(`${author}.bal`, bet);
														let cards = new Discord.MessageEmbed()
															.setTitle('**Black Jack**')
															.setThumbnail(msg.author.avatarURL())
															.setColor(0x0099ff)
															.setDescription(
																'**YOU WON!!** Dealer Busted\n\nYour cards are a ' +
																	pcards +
																	', with a total of ' +
																	cardtotal +
																	'.\nDealers cards are a ' +
																	dcards +
																	', with a total of ' +
																	dcardtotal +
																	'.\n You WON: ' +
																	bet +
																	' 💰 \n You now have: ' +
																	economy.get(`${author}.bal`) +
																	' 💰 '
															);
														msg.channel.send(cards);
														return playingGame.delete(msg.author.id);
													}

													if (cardtotal > dcardtotal) {
														economy.add(`${author}.bal`, bet);
														let cards = new Discord.MessageEmbed()
															.setTitle('**Black Jack**')
															.setThumbnail(msg.author.avatarURL())
															.setColor(0x0099ff)
															.setDescription(
																'**YOU WON!!**\n\nYour cards are a ' +
																	pcards +
																	', with a total of ' +
																	cardtotal +
																	'.\nDealers cards are a ' +
																	dcards +
																	', with a total of ' +
																	dcardtotal +
																	'.\n You WON: ' +
																	bet +
																	' 💰 \n You now have: ' +
																	economy.get(`${author}.bal`) +
																	' 💰 '
															);
														msg.channel.send(cards);
														return playingGame.delete(msg.author.id);
													}

													if (cardtotal < dcardtotal) {
														economy.subtract(`${author}.bal`, bet);
														economy.add(`Prizepool`, bet);
														let cards = new Discord.MessageEmbed()
															.setTitle('**Black Jack**')
															.setThumbnail(msg.author.avatarURL())
															.setColor(0x0099ff)
															.setDescription(
																'**You LOST :(**\n\nYour cards are a ' +
																	pcards +
																	', with a total of ' +
																	cardtotal +
																	'.\nDealers cards are a ' +
																	dcards +
																	', with a total of ' +
																	dcardtotal +
																	'.\n You LOST: ' +
																	bet +
																	' 💰 \n You now have: ' +
																	economy.get(`${author}.bal`) +
																	' 💰 '
															);
														msg.channel.send(cards);
														return playingGame.delete(msg.author.id);
													}
												}
											})
											.catch((collected) => {
												economy.subtract(`${author}.bal`, Math.floor((bet /= 2)));
												economy.add(`Prizepool`, Math.floor((bet /= 2)));

												msg.reply(
													"You didn't do anything, so now the game's over. You lost half of your bet."
												);
												return playingGame.delete(msg.author.id);
											});
									});
								} else if (reaction.emoji.name === '👎') {
									dcardtotal += dc2;

									if (dcardtotal > 21) {
										if (dc1 === 11) {
											dc1 = 1;
											dcardtotal -= 10;
											let index = dcards.indexOf(11);
											if (index !== -1) {
												dcards[index] = 1;
											}
										} else if (dc2 === 11) {
											dc2 = 1;
											dcardtotal -= 10;
											let index = dcards.indexOf(11);
											if (index !== -1) {
												dcards[index] = 1;
											}
										}
									}

									dcards.push(dc2);

									for (let i = 3; dcardtotal <= 16; ++i) {
										if (i === 3) {
											dcardtotal += dc3;

											if (dcardtotal > 21) {
												if (dc1 === 11) {
													dc1 = 1;
													dcardtotal -= 10;
													let index = dcards.indexOf(11);
													if (index !== -1) {
														dcards[index] = 1;
													}
												} else if (dc2 === 11) {
													dc2 = 1;
													dcardtotal -= 10;
													let index = dcards.indexOf(11);
													if (index !== -1) {
														dcards[index] = 1;
													}
												} else if (dc3 === 11) {
													dc3 = 1;
													dcardtotal -= 10;
													let index = dcards.indexOf(11);
													if (index !== -1) {
														dcards[index] = 1;
													}
												}
											}
											dcards.push(dc3);
										}
										if (i === 4) {
											dcardtotal += dc4;

											if (dcardtotal > 21) {
												if (dc1 === 11) {
													dc1 = 1;
													dcardtotal -= 10;
													let index = dcards.indexOf(11);
													if (index !== -1) {
														dcards[index] = 1;
													}
												} else if (dc2 === 11) {
													dc2 = 1;
													dcardtotal -= 10;
													let index = dcards.indexOf(11);
													if (index !== -1) {
														dcards[index] = 1;
													}
												} else if (dc3 === 11) {
													dc3 = 1;
													dcardtotal -= 10;
													let index = dcards.indexOf(11);
													if (index !== -1) {
														dcards[index] = 1;
													}
												} else if (dc4 === 11) {
													dc4 = 1;
													dcardtotal -= 10;
													let index = dcards.indexOf(11);
													if (index !== -1) {
														dcards[index] = 1;
													}
												}
											}

											dcards.push(dc4);
										}
										if (i === 5) {
											dcardtotal += dc5;

											if (dcardtotal > 21) {
												if (dc1 === 11) {
													dc1 = 1;
													dcardtotal -= 10;
													let index = dcards.indexOf(11);
													if (index !== -1) {
														dcards[index] = 1;
													}
												} else if (dc2 === 11) {
													dc2 = 1;
													dcardtotal -= 10;
													let index = dcards.indexOf(11);
													if (index !== -1) {
														dcards[index] = 1;
													}
												} else if (dc3 === 11) {
													dc3 = 1;
													dcardtotal -= 10;
													let index = dcards.indexOf(11);
													if (index !== -1) {
														dcards[index] = 1;
													}
												} else if (dc4 === 11) {
													dc4 = 1;
													dcardtotal -= 10;
													let index = dcards.indexOf(11);
													if (index !== -1) {
														dcards[index] = 1;
													}
												} else if (dc5 === 11) {
													dc5 = 1;
													dcardtotal -= 10;
													let index = dcards.indexOf(11);
													if (index !== -1) {
														dcards[index] = 1;
													}
												}
											}

											dcards.push(dc5);
										}
										if (i === 6) {
											dcardtotal += dc6;

											if (dcardtotal > 21) {
												if (dc1 === 11) {
													dc1 = 1;
													dcardtotal -= 10;
													let index = dcards.indexOf(11);
													if (index !== -1) {
														dcards[index] = 1;
													}
												} else if (dc2 === 11) {
													dc2 = 1;
													dcardtotal -= 10;
													let index = dcards.indexOf(11);
													if (index !== -1) {
														dcards[index] = 1;
													}
												} else if (dc3 === 11) {
													dc3 = 1;
													dcardtotal -= 10;
													let index = dcards.indexOf(11);
													if (index !== -1) {
														dcards[index] = 1;
													}
												} else if (dc4 === 11) {
													dc4 = 1;
													dcardtotal -= 10;
													let index = dcards.indexOf(11);
													if (index !== -1) {
														dcards[index] = 1;
													}
												} else if (dc5 === 11) {
													dc5 = 1;
													dcardtotal -= 10;
													let index = dcards.indexOf(11);
													if (index !== -1) {
														dcards[index] = 1;
													}
												} else if (dc6 === 11) {
													dc6 = 1;
													dcardtotal -= 10;
													let index = dcards.indexOf(11);
													if (index !== -1) {
														dcards[index] = 1;
													}
												}
											}

											dcards.push(dc6);
										}
										if (i === 7) {
											dcardtotal += dc7;

											if (dcardtotal > 21) {
												if (dc1 === 11) {
													dc1 = 1;
													dcardtotal -= 10;
													let index = dcards.indexOf(11);
													if (index !== -1) {
														dcards[index] = 1;
													}
												} else if (dc2 === 11) {
													dc2 = 1;
													dcardtotal -= 10;
													let index = dcards.indexOf(11);
													if (index !== -1) {
														dcards[index] = 1;
													}
												} else if (dc3 === 11) {
													dc3 = 1;
													dcardtotal -= 10;
													let index = dcards.indexOf(11);
													if (index !== -1) {
														dcards[index] = 1;
													}
												} else if (dc4 === 11) {
													dc4 = 1;
													dcardtotal -= 10;
													let index = dcards.indexOf(11);
													if (index !== -1) {
														dcards[index] = 1;
													}
												} else if (dc5 === 11) {
													dc5 = 1;
													dcardtotal -= 10;
													let index = dcards.indexOf(11);
													if (index !== -1) {
														dcards[index] = 1;
													}
												} else if (dc6 === 11) {
													dc6 = 1;
													dcardtotal -= 10;
													let index = dcards.indexOf(11);
													if (index !== -1) {
														dcards[index] = 1;
													}
												} else if (dc7 === 11) {
													dc7 = 1;
													dcardtotal -= 10;
													let index = dcards.indexOf(11);
													if (index !== -1) {
														dcards[index] = 1;
													}
												}
											}

											dcards.push(dc7);
										}
										if (i === 8) {
											dcardtotal += dc8;

											if (dcardtotal > 21) {
												if (dc1 === 11) {
													dc1 = 1;
													dcardtotal -= 10;
													let index = dcards.indexOf(11);
													if (index !== -1) {
														dcards[index] = 1;
													}
												} else if (dc2 === 11) {
													dc2 = 1;
													dcardtotal -= 10;
													let index = dcards.indexOf(11);
													if (index !== -1) {
														dcards[index] = 1;
													}
												} else if (dc3 === 11) {
													dc3 = 1;
													dcardtotal -= 10;
													let index = dcards.indexOf(11);
													if (index !== -1) {
														dcards[index] = 1;
													}
												} else if (dc4 === 11) {
													dc4 = 1;
													dcardtotal -= 10;
													let index = dcards.indexOf(11);
													if (index !== -1) {
														dcards[index] = 1;
													}
												} else if (dc5 === 11) {
													dc5 = 1;
													dcardtotal -= 10;
													let index = dcards.indexOf(11);
													if (index !== -1) {
														dcards[index] = 1;
													}
												} else if (dc6 === 11) {
													dc6 = 1;
													dcardtotal -= 10;
													let index = dcards.indexOf(11);
													if (index !== -1) {
														dcards[index] = 1;
													}
												} else if (dc7 === 11) {
													dc7 = 1;
													dcardtotal -= 10;
													let index = dcards.indexOf(11);
													if (index !== -1) {
														dcards[index] = 1;
													}
												} else if (dc8 === 11) {
													dc8 = 1;
													dcardtotal -= 10;
													let index = dcards.indexOf(11);
													if (index !== -1) {
														dcards[index] = 1;
													}
												}
											}

											dcards.push(dc8);
										}
										if (i === 9) {
											dcardtotal += dc9;

											if (dcardtotal > 21) {
												if (dc1 === 11) {
													dc1 = 1;
													dcardtotal -= 10;
													let index = dcards.indexOf(11);
													if (index !== -1) {
														dcards[index] = 1;
													}
												} else if (dc2 === 11) {
													dc2 = 1;
													dcardtotal -= 10;
													let index = dcards.indexOf(11);
													if (index !== -1) {
														dcards[index] = 1;
													}
												} else if (dc3 === 11) {
													dc3 = 1;
													dcardtotal -= 10;
													let index = dcards.indexOf(11);
													if (index !== -1) {
														dcards[index] = 1;
													}
												} else if (dc4 === 11) {
													dc4 = 1;
													dcardtotal -= 10;
													let index = dcards.indexOf(11);
													if (index !== -1) {
														dcards[index] = 1;
													}
												} else if (dc5 === 11) {
													dc5 = 1;
													dcardtotal -= 10;
													let index = dcards.indexOf(11);
													if (index !== -1) {
														dcards[index] = 1;
													}
												} else if (dc6 === 11) {
													dc6 = 1;
													dcardtotal -= 10;
													let index = dcards.indexOf(11);
													if (index !== -1) {
														dcards[index] = 1;
													}
												} else if (dc7 === 11) {
													dc7 = 1;
													dcardtotal -= 10;
													let index = dcards.indexOf(11);
													if (index !== -1) {
														dcards[index] = 1;
													}
												} else if (dc8 === 11) {
													dc8 = 1;
													dcardtotal -= 10;
													let index = dcards.indexOf(11);
													if (index !== -1) {
														dcards[index] = 1;
													}
												} else if (dc9 === 11) {
													dc9 = 1;
													dcardtotal -= 10;
													let index = dcards.indexOf(11);
													if (index !== -1) {
														dcards[index] = 1;
													}
												}
											}

											dcards.push(dc9);
										}
										if (i === 10) {
											dcardtotal += dc10;

											if (dcardtotal > 21) {
												if (dc1 === 11) {
													dc1 = 1;
													dcardtotal -= 10;
													let index = dcards.indexOf(11);
													if (index !== -1) {
														dcards[index] = 1;
													}
												} else if (dc2 === 11) {
													dc2 = 1;
													dcardtotal -= 10;
													let index = dcards.indexOf(11);
													if (index !== -1) {
														dcards[index] = 1;
													}
												} else if (dc3 === 11) {
													dc3 = 1;
													dcardtotal -= 10;
													let index = dcards.indexOf(11);
													if (index !== -1) {
														dcards[index] = 1;
													}
												} else if (dc4 === 11) {
													dc4 = 1;
													dcardtotal -= 10;
													let index = dcards.indexOf(11);
													if (index !== -1) {
														dcards[index] = 1;
													}
												} else if (dc5 === 11) {
													dc5 = 1;
													dcardtotal -= 10;
													let index = dcards.indexOf(11);
													if (index !== -1) {
														dcards[index] = 1;
													}
												} else if (dc6 === 11) {
													dc6 = 1;
													dcardtotal -= 10;
													let index = dcards.indexOf(11);
													if (index !== -1) {
														dcards[index] = 1;
													}
												} else if (dc7 === 11) {
													dc7 = 1;
													dcardtotal -= 10;
													let index = dcards.indexOf(11);
													if (index !== -1) {
														dcards[index] = 1;
													}
												} else if (dc8 === 11) {
													dc8 = 1;
													dcardtotal -= 10;
													let index = dcards.indexOf(11);
													if (index !== -1) {
														dcards[index] = 1;
													}
												} else if (dc9 === 11) {
													dc9 = 1;
													dcardtotal -= 10;
													let index = dcards.indexOf(11);
													if (index !== -1) {
														dcards[index] = 1;
													}
												} else if (dc10 === 11) {
													dc10 = 1;
													dcardtotal -= 10;
													let index = dcards.indexOf(11);
													if (index !== -1) {
														dcards[index] = 1;
													}
												}
											}

											dcards.push(dc10);
										}
									}

									if (cardtotal === dcardtotal) {
										let cards = new Discord.MessageEmbed()
											.setTitle('**Black Jack**')
											.setThumbnail(msg.author.avatarURL())
											.setColor(0x0099ff)
											.setDescription(
												'**Its a PUSH** you both have the same score\n\nYour cards are a ' +
													pcards +
													', with a total of ' +
													cardtotal +
													'.\nDealers cards are a ' +
													dcards +
													', with a total of ' +
													dcardtotal +
													'.\nYou have: ' +
													economy.get(`${author}.bal`) +
													' 💰 '
											);
										msg.channel.send(cards);
										return playingGame.delete(msg.author.id);
									}

									if (dcardtotal === 21) {
										economy.subtract(`${author}.bal`, bet);
										economy.add(`Prizepool`, bet);
										let cards = new Discord.MessageEmbed()
											.setTitle('**Black Jack**')
											.setThumbnail(msg.author.avatarURL())
											.setColor(0x0099ff)
											.setDescription(
												'**YOU LOST :(** Dealer got a Black Jack\n\nYour cards are a ' +
													pcards +
													', with a total of ' +
													cardtotal +
													'.\nDealers cards are a ' +
													dcards +
													', with a total of ' +
													dcardtotal +
													'.\n You LOST: ' +
													bet +
													' 💰 \n You now have: ' +
													economy.get(`${author}.bal`) +
													' 💰 '
											);
										msg.channel.send(cards);
										return playingGame.delete(msg.author.id);
									}

									if (dcardtotal > 21) {
										economy.add(`${author}.bal`, bet);
										let cards = new Discord.MessageEmbed()
											.setTitle('**Black Jack**')
											.setThumbnail(msg.author.avatarURL())
											.setColor(0x0099ff)
											.setDescription(
												'**YOU WON!!** Dealer Busted\n\nYour cards are a ' +
													pcards +
													', with a total of ' +
													cardtotal +
													'.\nDealers cards are a ' +
													dcards +
													', with a total of ' +
													dcardtotal +
													'.\n You WON: ' +
													bet +
													' 💰 \n You now have: ' +
													economy.get(`${author}.bal`) +
													' 💰 '
											);
										msg.channel.send(cards);
										return playingGame.delete(msg.author.id);
									}

									if (cardtotal > dcardtotal) {
										economy.add(`${author}.bal`, bet);
										let cards = new Discord.MessageEmbed()
											.setTitle('**Black Jack**')
											.setThumbnail(msg.author.avatarURL())
											.setColor(0x0099ff)
											.setDescription(
												'**YOU WON!!**\n\nYour cards are a ' +
													pcards +
													', with a total of ' +
													cardtotal +
													'.\nDealers cards are a ' +
													dcards +
													', with a total of ' +
													dcardtotal +
													'.\n You WON: ' +
													bet +
													' 💰 \n You now have: ' +
													economy.get(`${author}.bal`) +
													' 💰 '
											);
										msg.channel.send(cards);
										return playingGame.delete(msg.author.id);
									}

									if (cardtotal < dcardtotal) {
										economy.subtract(`${author}.bal`, bet);
										economy.add(`Prizepool`, bet);
										let cards = new Discord.MessageEmbed()
											.setTitle('**Black Jack**')
											.setThumbnail(msg.author.avatarURL())
											.setColor(0x0099ff)
											.setDescription(
												'**You LOST :(**\n\nYour cards are a ' +
													pcards +
													', with a total of ' +
													cardtotal +
													'.\nDealers cards are a ' +
													dcards +
													', with a total of ' +
													dcardtotal +
													'.\n You LOST: ' +
													bet +
													' 💰 \n You now have: ' +
													economy.get(`${author}.bal`) +
													' 💰 '
											);
										msg.channel.send(cards);
										return playingGame.delete(msg.author.id);
									}
								}
							})
							.catch((collected) => {
								economy.subtract(`${author}.bal`, Math.floor((bet /= 2)));
								economy.add(`Prizepool`, Math.floor((bet /= 2)));

								msg.reply(
									"You didn't do anything, so now the game's over. You lost half of your bet."
								);
								return playingGame.delete(msg.author.id);
							});
					});

					//________________________________________________________________________
				} else if (reaction.emoji.name === '👎') {
					dcardtotal += dc2;

					if (dcardtotal > 21) {
						if (dc1 === 11) {
							dc1 = 1;
							dcardtotal -= 10;
							let index = dcards.indexOf(11);
							if (index !== -1) {
								dcards[index] = 1;
							}
						} else if (dc2 === 11) {
							dc2 = 1;
							dcardtotal -= 10;
							let index = dcards.indexOf(11);
							if (index !== -1) {
								dcards[index] = 1;
							}
						}
					}

					dcards.push(dc2);

					for (let i = 3; dcardtotal <= 16; ++i) {
						if (i === 3) {
							dcardtotal += dc3;

							if (dcardtotal > 21) {
								if (dc1 === 11) {
									dc1 = 1;
									dcardtotal -= 10;
									let index = dcards.indexOf(11);
									if (index !== -1) {
										dcards[index] = 1;
									}
								} else if (dc2 === 11) {
									dc2 = 1;
									dcardtotal -= 10;
									let index = dcards.indexOf(11);
									if (index !== -1) {
										dcards[index] = 1;
									}
								} else if (dc3 === 11) {
									dc3 = 1;
									dcardtotal -= 10;
									let index = dcards.indexOf(11);
									if (index !== -1) {
										dcards[index] = 1;
									}
								}
							}
							dcards.push(dc3);
						}
						if (i === 4) {
							dcardtotal += dc4;

							if (dcardtotal > 21) {
								if (dc1 === 11) {
									dc1 = 1;
									dcardtotal -= 10;
									let index = dcards.indexOf(11);
									if (index !== -1) {
										dcards[index] = 1;
									}
								} else if (dc2 === 11) {
									dc2 = 1;
									dcardtotal -= 10;
									let index = dcards.indexOf(11);
									if (index !== -1) {
										dcards[index] = 1;
									}
								} else if (dc3 === 11) {
									dc3 = 1;
									dcardtotal -= 10;
									let index = dcards.indexOf(11);
									if (index !== -1) {
										dcards[index] = 1;
									}
								} else if (dc4 === 11) {
									dc4 = 1;
									dcardtotal -= 10;
									let index = dcards.indexOf(11);
									if (index !== -1) {
										dcards[index] = 1;
									}
								}
							}

							dcards.push(dc4);
						}
						if (i === 5) {
							dcardtotal += dc5;

							if (dcardtotal > 21) {
								if (dc1 === 11) {
									dc1 = 1;
									dcardtotal -= 10;
									let index = dcards.indexOf(11);
									if (index !== -1) {
										dcards[index] = 1;
									}
								} else if (dc2 === 11) {
									dc2 = 1;
									dcardtotal -= 10;
									let index = dcards.indexOf(11);
									if (index !== -1) {
										dcards[index] = 1;
									}
								} else if (dc3 === 11) {
									dc3 = 1;
									dcardtotal -= 10;
									let index = dcards.indexOf(11);
									if (index !== -1) {
										dcards[index] = 1;
									}
								} else if (dc4 === 11) {
									dc4 = 1;
									dcardtotal -= 10;
									let index = dcards.indexOf(11);
									if (index !== -1) {
										dcards[index] = 1;
									}
								} else if (dc5 === 11) {
									dc5 = 1;
									dcardtotal -= 10;
									let index = dcards.indexOf(11);
									if (index !== -1) {
										dcards[index] = 1;
									}
								}
							}

							dcards.push(dc5);
						}
						if (i === 6) {
							dcardtotal += dc6;

							if (dcardtotal > 21) {
								if (dc1 === 11) {
									dc1 = 1;
									dcardtotal -= 10;
									let index = dcards.indexOf(11);
									if (index !== -1) {
										dcards[index] = 1;
									}
								} else if (dc2 === 11) {
									dc2 = 1;
									dcardtotal -= 10;
									let index = dcards.indexOf(11);
									if (index !== -1) {
										dcards[index] = 1;
									}
								} else if (dc3 === 11) {
									dc3 = 1;
									dcardtotal -= 10;
									let index = dcards.indexOf(11);
									if (index !== -1) {
										dcards[index] = 1;
									}
								} else if (dc4 === 11) {
									dc4 = 1;
									dcardtotal -= 10;
									let index = dcards.indexOf(11);
									if (index !== -1) {
										dcards[index] = 1;
									}
								} else if (dc5 === 11) {
									dc5 = 1;
									dcardtotal -= 10;
									let index = dcards.indexOf(11);
									if (index !== -1) {
										dcards[index] = 1;
									}
								} else if (dc6 === 11) {
									dc6 = 1;
									dcardtotal -= 10;
									let index = dcards.indexOf(11);
									if (index !== -1) {
										dcards[index] = 1;
									}
								}
							}

							dcards.push(dc6);
						}
						if (i === 7) {
							dcardtotal += dc7;

							if (dcardtotal > 21) {
								if (dc1 === 11) {
									dc1 = 1;
									dcardtotal -= 10;
									let index = dcards.indexOf(11);
									if (index !== -1) {
										dcards[index] = 1;
									}
								} else if (dc2 === 11) {
									dc2 = 1;
									dcardtotal -= 10;
									let index = dcards.indexOf(11);
									if (index !== -1) {
										dcards[index] = 1;
									}
								} else if (dc3 === 11) {
									dc3 = 1;
									dcardtotal -= 10;
									let index = dcards.indexOf(11);
									if (index !== -1) {
										dcards[index] = 1;
									}
								} else if (dc4 === 11) {
									dc4 = 1;
									dcardtotal -= 10;
									let index = dcards.indexOf(11);
									if (index !== -1) {
										dcards[index] = 1;
									}
								} else if (dc5 === 11) {
									dc5 = 1;
									dcardtotal -= 10;
									let index = dcards.indexOf(11);
									if (index !== -1) {
										dcards[index] = 1;
									}
								} else if (dc6 === 11) {
									dc6 = 1;
									dcardtotal -= 10;
									let index = dcards.indexOf(11);
									if (index !== -1) {
										dcards[index] = 1;
									}
								} else if (dc7 === 11) {
									dc7 = 1;
									dcardtotal -= 10;
									let index = dcards.indexOf(11);
									if (index !== -1) {
										dcards[index] = 1;
									}
								}
							}

							dcards.push(dc7);
						}
						if (i === 8) {
							dcardtotal += dc8;

							if (dcardtotal > 21) {
								if (dc1 === 11) {
									dc1 = 1;
									dcardtotal -= 10;
									let index = dcards.indexOf(11);
									if (index !== -1) {
										dcards[index] = 1;
									}
								} else if (dc2 === 11) {
									dc2 = 1;
									dcardtotal -= 10;
									let index = dcards.indexOf(11);
									if (index !== -1) {
										dcards[index] = 1;
									}
								} else if (dc3 === 11) {
									dc3 = 1;
									dcardtotal -= 10;
									let index = dcards.indexOf(11);
									if (index !== -1) {
										dcards[index] = 1;
									}
								} else if (dc4 === 11) {
									dc4 = 1;
									dcardtotal -= 10;
									let index = dcards.indexOf(11);
									if (index !== -1) {
										dcards[index] = 1;
									}
								} else if (dc5 === 11) {
									dc5 = 1;
									dcardtotal -= 10;
									let index = dcards.indexOf(11);
									if (index !== -1) {
										dcards[index] = 1;
									}
								} else if (dc6 === 11) {
									dc6 = 1;
									dcardtotal -= 10;
									let index = dcards.indexOf(11);
									if (index !== -1) {
										dcards[index] = 1;
									}
								} else if (dc7 === 11) {
									dc7 = 1;
									dcardtotal -= 10;
									let index = dcards.indexOf(11);
									if (index !== -1) {
										dcards[index] = 1;
									}
								} else if (dc8 === 11) {
									dc8 = 1;
									dcardtotal -= 10;
									let index = dcards.indexOf(11);
									if (index !== -1) {
										dcards[index] = 1;
									}
								}
							}

							dcards.push(dc8);
						}
						if (i === 9) {
							dcardtotal += dc9;

							if (dcardtotal > 21) {
								if (dc1 === 11) {
									dc1 = 1;
									dcardtotal -= 10;
									let index = dcards.indexOf(11);
									if (index !== -1) {
										dcards[index] = 1;
									}
								} else if (dc2 === 11) {
									dc2 = 1;
									dcardtotal -= 10;
									let index = dcards.indexOf(11);
									if (index !== -1) {
										dcards[index] = 1;
									}
								} else if (dc3 === 11) {
									dc3 = 1;
									dcardtotal -= 10;
									let index = dcards.indexOf(11);
									if (index !== -1) {
										dcards[index] = 1;
									}
								} else if (dc4 === 11) {
									dc4 = 1;
									dcardtotal -= 10;
									let index = dcards.indexOf(11);
									if (index !== -1) {
										dcards[index] = 1;
									}
								} else if (dc5 === 11) {
									dc5 = 1;
									dcardtotal -= 10;
									let index = dcards.indexOf(11);
									if (index !== -1) {
										dcards[index] = 1;
									}
								} else if (dc6 === 11) {
									dc6 = 1;
									dcardtotal -= 10;
									let index = dcards.indexOf(11);
									if (index !== -1) {
										dcards[index] = 1;
									}
								} else if (dc7 === 11) {
									dc7 = 1;
									dcardtotal -= 10;
									let index = dcards.indexOf(11);
									if (index !== -1) {
										dcards[index] = 1;
									}
								} else if (dc8 === 11) {
									dc8 = 1;
									dcardtotal -= 10;
									let index = dcards.indexOf(11);
									if (index !== -1) {
										dcards[index] = 1;
									}
								} else if (dc9 === 11) {
									dc9 = 1;
									dcardtotal -= 10;
									let index = dcards.indexOf(11);
									if (index !== -1) {
										dcards[index] = 1;
									}
								}
							}

							dcards.push(dc9);
						}
						if (i === 10) {
							dcardtotal += dc10;

							if (dcardtotal > 21) {
								if (dc1 === 11) {
									dc1 = 1;
									dcardtotal -= 10;
								} else if (dc2 === 11) {
									dc2 = 1;
									dcardtotal -= 10;
									let index = dcards.indexOf(11);
									if (index !== -1) {
										dcards[index] = 1;
									}
								} else if (dc3 === 11) {
									dc3 = 1;
									dcardtotal -= 10;
									let index = dcards.indexOf(11);
									if (index !== -1) {
										dcards[index] = 1;
									}
								} else if (dc4 === 11) {
									dc4 = 1;
									dcardtotal -= 10;
									let index = dcards.indexOf(11);
									if (index !== -1) {
										dcards[index] = 1;
									}
								} else if (dc5 === 11) {
									dc5 = 1;
									dcardtotal -= 10;
									let index = dcards.indexOf(11);
									if (index !== -1) {
										dcards[index] = 1;
									}
								} else if (dc6 === 11) {
									dc6 = 1;
									dcardtotal -= 10;
									let index = dcards.indexOf(11);
									if (index !== -1) {
										dcards[index] = 1;
									}
								} else if (dc7 === 11) {
									dc7 = 1;
									dcardtotal -= 10;
									let index = dcards.indexOf(11);
									if (index !== -1) {
										dcards[index] = 1;
									}
								} else if (dc8 === 11) {
									dc8 = 1;
									dcardtotal -= 10;
									let index = dcards.indexOf(11);
									if (index !== -1) {
										dcards[index] = 1;
									}
								} else if (dc9 === 11) {
									dc9 = 1;
									dcardtotal -= 10;
									let index = dcards.indexOf(11);
									if (index !== -1) {
										dcards[index] = 1;
									}
								} else if (dc10 === 11) {
									dc10 = 1;
									dcardtotal -= 10;
									let index = dcards.indexOf(11);
									if (index !== -1) {
										dcards[index] = 1;
									}
								}
							}

							dcards.push(dc10);
						}
					}

					if (cardtotal === dcardtotal) {
						let cards = new Discord.MessageEmbed()
							.setTitle('**Black Jack**')
							.setThumbnail(msg.author.avatarURL())
							.setColor(0x0099ff)
							.setDescription(
								'**Its a PUSH** you both have the same score\n\nYour cards are a ' +
									pcards +
									', with a total of ' +
									cardtotal +
									'.\nDealers cards are a ' +
									dcards +
									', with a total of ' +
									dcardtotal +
									'.\nYou have: ' +
									economy.get(`${author}.bal`) +
									' 💰 '
							);
						msg.channel.send(cards);
						return playingGame.delete(msg.author.id);
					}

					if (dcardtotal === 21) {
						economy.subtract(`${author}.bal`, bet);
						economy.add(`Prizepool`, bet);
						let cards = new Discord.MessageEmbed()
							.setTitle('**Black Jack**')
							.setThumbnail(msg.author.avatarURL())
							.setColor(0x0099ff)
							.setDescription(
								'**YOU LOST :(** Dealer got a Black Jack\n\nYour cards are a ' +
									pcards +
									', with a total of ' +
									cardtotal +
									'.\nDealers cards are a ' +
									dcards +
									', with a total of ' +
									dcardtotal +
									'.\n You LOST: ' +
									bet +
									' 💰 \n You now have: ' +
									economy.get(`${author}.bal`) +
									' 💰 '
							);
						msg.channel.send(cards);
						return playingGame.delete(msg.author.id);
					}

					if (dcardtotal > 21) {
						economy.add(`${author}.bal`, bet);
						let cards = new Discord.MessageEmbed()
							.setTitle('**Black Jack**')
							.setThumbnail(msg.author.avatarURL())
							.setColor(0x0099ff)
							.setDescription(
								'**YOU WON!!** Dealer Busted\n\nYour cards are a ' +
									pcards +
									', with a total of ' +
									cardtotal +
									'.\nDealers cards are a ' +
									dcards +
									', with a total of ' +
									dcardtotal +
									'.\n You WON: ' +
									bet +
									' 💰 \n You now have: ' +
									economy.get(`${author}.bal`) +
									' 💰 '
							);
						msg.channel.send(cards);
						return playingGame.delete(msg.author.id);
					}

					if (cardtotal > dcardtotal) {
						economy.add(`${author}.bal`, bet);
						let cards = new Discord.MessageEmbed()
							.setTitle('**Black Jack**')
							.setThumbnail(msg.author.avatarURL())
							.setColor(0x0099ff)
							.setDescription(
								'**YOU WON!!**\n\nYour cards are a ' +
									pcards +
									', with a total of ' +
									cardtotal +
									'.\nDealers cards are a ' +
									dcards +
									', with a total of ' +
									dcardtotal +
									'.\n You WON: ' +
									bet +
									' 💰 \n You now have: ' +
									economy.get(`${author}.bal`) +
									' 💰 '
							);
						msg.channel.send(cards);
						return playingGame.delete(msg.author.id);
					}

					if (cardtotal < dcardtotal) {
						economy.subtract(`${author}.bal`, bet);
						economy.add(`Prizepool`, bet);
						let cards = new Discord.MessageEmbed()
							.setTitle('**Black Jack**')
							.setThumbnail(msg.author.avatarURL())
							.setColor(0x0099ff)
							.setDescription(
								'**You LOST :(**\n\nYour cards are a ' +
									pcards +
									', with a total of ' +
									cardtotal +
									'.\nDealers cards are a ' +
									dcards +
									', with a total of ' +
									dcardtotal +
									'.\n You LOST: ' +
									bet +
									' 💰 \n You now have: ' +
									economy.get(`${author}.bal`) +
									' 💰 '
							);
						msg.channel.send(cards);
						return playingGame.delete(msg.author.id);
					}
					return playingGame.delete(msg.author.id);
				}
			})
			.catch((collected) => {
				economy.subtract(`${author}.bal`, Math.floor((bet /= 2)));
				economy.add(`Prizepool`, Math.floor((bet /= 2)));

				msg.reply("You didn't do anything, so now the game's over. You lost half of your bet.");
				return playingGame.delete(msg.author.id);
			});
	});
};

module.exports.help = {
	name: 'bj',
	Alias: 'blackjack',
};
