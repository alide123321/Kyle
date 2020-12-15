const db = require('quick.db');
var economy = new db.table('economy');

module.exports.run = async (bot, msg, args) => {
	economy.set(`Prizepool`, 0);
};

module.exports.help = {
	name: 'starter',
};
