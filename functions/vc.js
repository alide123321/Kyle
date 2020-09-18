const sleep = require('./sleep.js').sleep;
const talkedRecently = require('./talked.js').talkedRecently;
function vc (sound,vol,VC,auther,chan){

  const serverQueue = chan.client.queue.get(chan.guild.id);
  if (serverQueue) {
    chan.send("Im buzy playing music right now sorry")
  return;}

    if (talkedRecently.has(auther) && auther !== '698051518754062387') {
      chan.send("Cooldown 60 sec")
      .then(msg => {
        msg.delete({ timeout: 5000 })
      })
   return;}
  
    talkedRecently.add(auther);
    setTimeout(() => {
      talkedRecently.delete(auther);
    }, 60000);
  
    
    if (VC){
      VC.join()
        .then(connection => {
      const dispatcher = connection.play('./sounds/'+sound+'.mp3', { volume: vol });
      dispatcher.on("finish", end => {
        sleep(1000);
        VC.leave();});
    })
    .catch(console.error);
  }
}
module.exports = { vc: vc };