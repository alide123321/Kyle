const Discord = require('discord.js');
const bot = new Discord.Client();
const fetch = require('node-fetch');
const fs = require('fs');
const ytdl = require('ytdl-core');
var opusscript = require("opusscript");

const token = "NzEzODc4MTA5NTA5Nzc5NTE2.Xsml-w.Tbs0Ig4yy2Z27UZYF79CRSSPltQ";
const version = "1.0.4";
const prefix = '.';
const helplink = "https://sites.google.com/view/chadthebot/home";
const auther = "alide123321#9518";
const queue = new Map();
var help =
[
    "*"+prefix+"website_______Do you to check put our website?*",
    "*"+prefix+"memes_________for the best memes*",
    "*"+prefix+"spam__________will spam whatever you tell it to 5X*",
    "*"+prefix+"info__________more information about the bot*",
    "*"+prefix+"Report________to report anything related to this server*"
    
]




bot.once('ready', () => {
    console.log('Ready!');
    console.log("prefix:"+prefix);
});

bot.once('reconnecting', () => {
	console.log('Reconnecting!');
});

bot.once('disconnect', () => {
	console.log('Disconnect!');
});


bot.on('message', msg =>
{
    if (msg.author.bot || !msg.content.startsWith(prefix)) return; // Ignore the message if it's from a bot or doesn't start with the prefix.
    
    let args = msg.content.substring(prefix.length).split(" ");
    let text = msg.content;

    const serverQueue = queue.get(msg.guild.id);

    switch(args[0])
    {
        case 'help':{
            let embed = new Discord.MessageEmbed()
                .setTitle("All the commands")
                .addField("Check out the commands on our website \n"+helplink+"\n some off our commands are",help)
                .setColor(0X5DADE2)
            msg.channel.send(embed);
            break;}

        case 'ping':{
            msg.channel.send("Im alive");
            break;}
        
        case 'memes':{
            fetch('https://meme-api.herokuapp.com/gimme')
                .then(res => res.json())
                .then(json => 
                    {
                        let embed = new Discord.msgEmbed()
                            .setTitle(json.title)
                            .setImage(json.url)
                            .setFooter("Link: "+json.postLink+" | Subreddit : "+json.subreddit+"\nfor better memes follow @saudinigga123 on isntagram")
                            msg.channel.send(embed);
                    });
            break;}

        case 'spam':{
            if(text.includes("@")){
                msg.channel.send("no!");
                break}
            for(var i = 0 ; i !== 5 ; ++i)
                msg.reply(" said: "+text.slice(5,)+" ");
            break;}

        case 'info':{
            if (args[1] === "version")
                msg.channel.send("version: "+version);
            if (args[1] === "auther")
                msg.channel.send("auther: "+auther);
            if (args[1] !== "version" && args[1] !== "auther")
            {
                msg.channel.send("What do you want more information about?");
                msg.channel.send("*"+prefix+"info version*");
                msg.channel.send("*"+prefix+"info auther*");
            }
            break;}

        case 'clear':{
            if (msg.member.roles.cache.find(r => r.name === "Cleaner")) 
            {

                if(!args[1]) return msg.reply("Error please define how many msgs do you want to delete");
                if(args[1] > 100) return msg.channel.send("you can only delete 100 messages at a time");
                msg.channel.bulkDelete(args[1]);
                break;
            }
            if (msg.member.roles.cache.find(r => r.name !== "Cleaner")) 
                msg.channel.send("sorry you dont have the correct role to exacute the command");
            break;}
        
        case 'website':{
            msg.channel.send(helplink);
            break;}
        
        case 'report':{
            if(!args[1]) {
                const embed = new Discord.msEmbed()
                .setColor(0xde3333)
                .setTitle('404')
                .setDescription('What do you want to report (only administrators will see your report)')
                msg.channel.send(embed)
            }else {
                var serverID = msg.guild.id;
                let msgArgs = args.slice(1).join(" ");

                let SEgerms = '701088567971152043'; // Egerms server ID
                let Egerms = bot.channels.cache.get('719159607377002497'); // Egerms channelReports

                let SWonderland = '599061990828277770'; // Wonderland server ID
                let Wonderland = bot.channels.cache.get('719454080543490058'); // Wonderland channelReports


                let embed = new Discord.msEmbed()
                .setColor(0X71b3f5)
                .setTitle('Report status:')
                .setDescription('Your report has been successfully filed! :upside_down:')
                msg.channel.send(embed);
                

                let reportData = new Discord.msEmbed()
                .setColor(0X71b3f5)
                .setTitle(msg.author.username + '\'s Report:')
                .setDescription(msgArgs)
                .setFooter("at: "+msg.createdAt)

                if(serverID == SEgerms)
                    Egerms.send(reportData);

                if(serverID === SWonderland)
                    Wonderland.send(reportData);
                
                
            }
            break;}

        case 'image':{
            
            break;}

        case 'p':{
            if(!args[1] || text.slice(3,35) != 'https://www.youtube.com/watch?v=') return msg.channel.send("I need a *Youtube* link to play");
            execute(msg, serverQueue);
            break;}

            
        case 'Skip':{
            skip(msg, serverQueue);
            break;}

        case 'Stop':{
            stop(msg, serverQueue);
            break;}
            
    }

    
})



async function execute(msg, serverQueue) {
	const args = msg.content.split(' ');

	const voiceChannel = msg.member.voice.channel;
	if (!voiceChannel) return msg.channel.send('You need to be in a voice channel to play music!');
	const permissions = voiceChannel.permissionsFor(msg.client.user);
	if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
		return msg.channel.send('I need the permissions to join and speak in your voice channel!');
	}

	const songInfo = await ytdl.getInfo(args[1]);
	const song = {
		title: songInfo.title,
		url: songInfo.video_url,
	};

	if (!serverQueue) {
		const queueContruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true,
		};

		queue.set(msg.guild.id, queueContruct);

		queueContruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueContruct.connection = connection;
			play(msg.guild, queueContruct.songs[0]);
		} catch (err) {
			console.log(err);
			queue.delete(msg.guild.id);
			return msg.channel.send(err);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		return msg.channel.send(`${song.title} has been added to the queue!`);
	}

}

function skip(msg, serverQueue) {
	if (!msg.member.voiceChannel) return msg.channel.send('You have to be in a voice channel to stop the music!');
	if (!serverQueue) return msg.channel.send('There is no song that I could skip!');
	serverQueue.connection.dispatcher.end();
}

function stop(msg, serverQueue) {
	if (!msg.member.voiceChannel) return msg.channel.send('You have to be in a voice channel to stop the music!');
	serverQueue.songs = [];
	serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', () => {
			console.log('Music ended!');
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => {
			console.error(error);
		});
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
}



function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
  
/*bot.on('messageDelete', msg =>
{
    let embed = new Discord.MessageEmbed()
                .setTitle("A message was deleted here.")
                .addField("Message created at:",msg.createdAt)
                .setColor(0Xb05c4d)
            msg.channel.send(embed);
})
*/
bot.login(token) // turn bot online