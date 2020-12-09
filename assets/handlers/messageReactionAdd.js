const { bot } = require('../../index');

bot.on('messageReactionAdd', async (reaction, user) => {
	if (!user || user.bot || !reaction.message.channel.guild) return;

	if (reaction.message.channel.id === '709238410732240906')
		await reaction.message.guild.members.cache.get(user.id).roles.add('716092067243098174');

	if (reaction.message.channel.id === '740809935247507566') {
		if (reaction.emoji.name === 'movie_night')
			await reaction.message.guild.members.cache.get(user.id).roles.add('740828341069676594');

		if (reaction.emoji.name === 'game_night')
			await reaction.message.guild.members.cache.get(user.id).roles.add('740828344794349658');

		if (reaction.emoji.name === 'pc')
			await reaction.message.guild.members.cache.get(user.id).roles.add('740828981179318343');

		if (reaction.emoji.name === 'ps')
			await reaction.message.guild.members.cache.get(user.id).roles.add('740828983071080470');

		if (reaction.emoji.name === 'xbox')
			await reaction.message.guild.members.cache.get(user.id).roles.add('740828984660590672');
	}
});
