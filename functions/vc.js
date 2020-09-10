const sleep = require('./sleep.js').sleep;
const talkedRecently = require('./talked.js').talkedRecently;
const vcmuted = require('./vcmuted.js').vcmuted;
function vc (sound,vol,VC,auther,chan){

  if (vcmuted.has(auther) && auther !== '698051518754062387') {
    chan.send("You've been mute from this command")
    .then(msg => {
      msg.delete({ timeout: 10000 })
    })
 return;}

    if (talkedRecently.has(auther) && auther !== '698051518754062387') {
      chan.send("Cooldown 60 sec")
      .then(msg => {
        msg.delete({ timeout: 10000 })
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