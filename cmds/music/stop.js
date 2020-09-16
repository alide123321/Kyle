module.exports.run = async (bot, msg, args) => {
    const servers = require('../../functions/servers.js').servers;
    
    var server = servers[msg.guild.id];
    if(msg.guild.voice.connection){
        for(var i = server.queue.length -1; i >=0; i--){
            server.queue.splice(i, 1);
        }

        server.dispatcher.end();
        msg.channel.send("ending the queue and disconnecting")
        console.log('stoped queue');
    }

    if(msg.guild.connection) msg.guild.voice.connection.disconnect();

            }

module.exports.help = {
    name: "stop"
}