/*************************************
 * Code For music is in KyleMusic bot*
 * Code For music is in KyleMusic bot*
 *************************************/
module.exports.run = async (bot, msg, args) => {
	try {
		await msg.guild.members.fetch('799041797568725033'); //KyleMusic id
	} catch (error) {
		msg.channel.send('Kyle Music is not in the Server sorry');
	}
};
module.exports.help = {
	name: 'resume',
	Alias: 'r',
	description: 'Resume playing the song',
};
