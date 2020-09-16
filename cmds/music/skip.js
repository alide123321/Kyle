module.exports.run = async (bot, msg, args) => {
    const servers = require('../../functions/servers.js').servers;
    
    var server = servers[msg.guild.id];
    if(server.dispatcher) server.dispatcher.end();
    msg.channel.send("skipping the song!");
}

module.exports.help = {
    name: "skip"
}