async function plays(msg, serverQueue) {
    const ytdl = require("ytdl-core");
    const queue = require('./queue.js').queue;
    const playSong = require('./playSong.js').playSong;
    const args = msg.content.split(" ");
 
    const voiceChannel = msg.member.voice.channel;
    if(!voiceChannel) return msg.reply("You must be in a voice channel!");
    const permission = voiceChannel.permissionsFor(msg.client.user);
    if(!permission.has('CONNECT') || !permission.has("SPEAK")) {
        return msg.channel.send("I need permission to join and speak in your voice channel!")
    }
 
    const songinfo = await ytdl.getInfo(args[1]);
    const song = {
        title: songinfo.videoDetails.title,
        url: songinfo.videoDetails.video_url,
    };
 
    if(!serverQueue) {
        const queueConstruct = {
            textChannel: msg.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true,
        };
        queue.set(msg.guild.id, queueConstruct);
 
        queueConstruct.songs.push(song);
 
        try{
            var connection = await voiceChannel.join();
            queueConstruct.connection = connection;
            playSong(msg.guild, queueConstruct.songs[0]);
        } catch (err) {
            console.log(err);
            queue.delete(msg.guild.id)
            return msg.channel.send("There was an error playing! " + err);
        }
    } else {
        serverQueue.songs.push(song);
        return msg.channel.send(`${song.title} has been added to the queue!`);
    }
}
module.exports = { plays: plays };