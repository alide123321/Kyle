async function playSong(guild, song) {
    const queue = require('./queue.js').queue;
    const ytdl = require('ytdl-core');

    let serverQueue = queue.get(guild.id);

    if(!song){
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }

    const dispatcher = serverQueue.connection.play(ytdl(song.url)).on('end', () => {
        serverQueue.songs.shift();
        playSong(guild, serverQueue.songs[0]);
    })
    .on('error', () => {
        console.log(error)
    })

    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
}
module.exports = { playSong: playSong };