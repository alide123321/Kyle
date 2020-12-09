module.exports.run = async (bot, msg, args) => {
	const prefix = process.env.PREFIX;
	let letterss = msg.content.substring(prefix.length).toLowerCase().split('');

	if (!letterss) {
		msg.channel.send('Need text to weebify. Send .weebify <text> ');
		return;
	}
	let letters = letterss.slice(8);

	let finished = [];

	for (var i = 0; i < letters.length; ++i) {
		switch (letters[i]) {
			case ' ': {
				finished.push('  ');
				break;
			}

			case 'a': {
				finished.push('卂');
				break;
			}

			case 'b': {
				finished.push('乃');
				break;
			}

			case 'c': {
				finished.push('匚');
				break;
			}

			case 'd': {
				finished.push('刀');
				break;
			}

			case 'e': {
				finished.push('乇');
				break;
			}

			case 'f': {
				finished.push('下');
				break;
			}

			case 'g': {
				finished.push('厶');
				break;
			}

			case 'h': {
				finished.push('卄');
				break;
			}

			case 'i': {
				finished.push('工');
				break;
			}

			case 'j': {
				finished.push('丁');
				break;
			}

			case 'k': {
				finished.push('长');
				break;
			}

			case 'l': {
				finished.push('乚');
				break;
			}

			case 'm': {
				finished.push('从');
				break;
			}

			case 'n': {
				finished.push('几');
				break;
			}

			case 'o': {
				finished.push('口');
				break;
			}

			case 'p': {
				finished.push('尸');
				break;
			}

			case 'q': {
				finished.push('㔿');
				break;
			}

			case 'r': {
				finished.push('尺');
				break;
			}

			case 's': {
				finished.push('丂');
				break;
			}

			case 't': {
				finished.push('丅');
				break;
			}

			case 'u': {
				finished.push('凵');
				break;
			}

			case 'v': {
				finished.push('リ');
				break;
			}

			case 'w': {
				finished.push('山');
				break;
			}

			case 'x': {
				finished.push('乂');
				break;
			}

			case 'y': {
				finished.push('丫');
				break;
			}

			case 'z': {
				finished.push('乙');
				break;
			}

			default: {
				finished.push(letters[i]);
			}
		}
	}

	let send = finished.join(' ');

	msg.channel.send(send);
};

module.exports.help = {
	name: 'weebify',
};
