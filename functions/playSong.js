function playSong(guild, song) {
    const ytdl = require("ytdl-core");
    const queue = require('./queue.js').queue;
    const serverQueue = queue.get(guild.id);
 
    if(!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }
 
    const dispatcher = serverQueue.connection.play(ytdl(song.url))
        .on('end', () => {
            serverQueue.songs.shift();
            playSong(guild, serverQueue.songs[0]);
        })
        .on('error', error => {
            console.log(error);
        })
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
}
module.exports = { playSong: playSong };