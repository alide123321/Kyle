module.exports.run = async (bot, msg, args) => {
    const Discord = require("discord.js");
    const db = require('quick.db');
    var economy = new db.table('economy')
    let author = msg.author.id
    let useracc = economy.get(`${author}.bal`)
    let bet = args[1];
    let authmoney = economy.get(`${author}.bal`, bet)
    

    if (!useracc) {
          let ErrorEmbed = new Discord.MessageEmbed()
            .setTitle("**ERROR**")
            .setColor(0XFF0000)
            .setDescription("You are not in the system try .newbal")
          msg.channel.send(ErrorEmbed);
    return;}
  
    if(!args[1] || isNaN(bet)){
          let ErrorEmbed = new Discord.MessageEmbed()
            .setTitle("**ERROR**")
            .setColor(0XFF0000)
            .setDescription("how much do you want to bet")
          msg.channel.send(ErrorEmbed);
    return;}
  
    if(bet < 0){
          let ErrorEmbed = new Discord.MessageEmbed()
            .setTitle("**ERROR**")
            .setColor(0XFF0000)
            .setDescription("you have to bet more than or equal to 0")
          msg.channel.send(ErrorEmbed);
    return;}
  
    if (useracc < bet) {

          let ErrorEmbed = new Discord.MessageEmbed()
            .setTitle("**ERROR**")
            .setColor(0XFF0000)
            .setDescription("You do not have enough money")
          msg.channel.send(ErrorEmbed);
    return;}


    var a = 10;
    var card = [2, 3, 4, 5, 6, 7, 8, 9, 10, a];
    var c1 = card[Math.floor(Math.random()*card.length)];
    var c2 = card[Math.floor(Math.random()*card.length)];
    var c3 = card[Math.floor(Math.random()*card.length)];
    var c4 = card[Math.floor(Math.random()*card.length)];
    var c5 = card[Math.floor(Math.random()*card.length)];
    var cardtotal = c1 + c2;
    var pcards = []
    pcards.push(c1,c2)
    var dc1 = card[Math.floor(Math.random()*card.length)];
    var dc2 = card[Math.floor(Math.random()*card.length)];
    var dc3 = card[Math.floor(Math.random()*card.length)];
    var dc4 = card[Math.floor(Math.random()*card.length)];
    var dc5 = card[Math.floor(Math.random()*card.length)];
    var dc6 = card[Math.floor(Math.random()*card.length)];
    var dc7 = card[Math.floor(Math.random()*card.length)];
    var dc8 = card[Math.floor(Math.random()*card.length)];
    var dc9 = card[Math.floor(Math.random()*card.length)];
    var dc10 = card[Math.floor(Math.random()*card.length)];
    var dcardtotal = dc1 + dc2;
    var dcards = []
    dcards.push(dc1)

    let cards = new Discord.MessageEmbed()
      .setTitle("**Black Jack**")
      .setThumbnail(msg.author.avatarURL())
      .setColor(0X0099ff)
      .setDescription("Your cards are a " + pcards + " with a total of " + cardtotal + ".\nDealers card is a " + dcards + ".\n Do you want to hit (:thumbsup:) or stand (:thumbsdown:)?")
    msg.channel.send(cards).then(sentMessage => {


      if(cardtotal === 21){
          economy.add(`${author}.bal`, bet)
          let cards = new Discord.MessageEmbed()
            .setTitle("**Black Jack**")
            .setThumbnail(msg.author.avatarURL())
            .setColor(0X0099ff)
            .setDescription("YOU WON!! You got a Black Jack\n\nYour cards are a " + pcards + ", with a total of " + cardtotal + ".\nDealers cards are a " + dcards + ", with a total of " + dcardtotal + ".\n You WON: "+bet+" <:chip:751730576918315048> \n You now have: "+authmoney+" <:chip:751730576918315048> ")
          msg.channel.send(cards);
      return;}

      if(cardtotal > 21){
        economy.subtract(`${author}.bal`, bet)
        let cards = new Discord.MessageEmbed()
          .setTitle("**Black Jack\n You Busted**")
          .setThumbnail(msg.author.avatarURL())
          .setColor(0X0099ff)
          .setDescription("**YOU LOST :(** You Busted\n\nYour cards are a " + pcards + ", with a total of " + cardtotal + ".\nDealers cards are a " + dcards + ", with a total of " + dcardtotal + ".\n You LOST: "+bet+" <:chip:751730576918315048> \n You now have: "+authmoney+" <:chip:751730576918315048> ")
        msg.channel.send(cards);
      return;}
        

      sentMessage.react('👍');
      sentMessage.react('👎');


      const filter = (reaction, user) => {
        return ['👍', '👎'].includes(reaction.emoji.name) && user.id === msg.author.id;
      };
  
      sentMessage.awaitReactions(filter, { max: 1, time: 10000, errors: ['time'] })
        .then(collected => {
      const reaction = collected.first();
  
        if (reaction.emoji.name === '👍') {

          a = 11;

          pcards.push(c3)
          cardtotal += c3;

          if(cardtotal === 21){
            economy.add(`${author}.bal`, bet);
            let cards = new Discord.MessageEmbed()
              .setTitle("**Black Jack**")
              .setThumbnail(msg.author.avatarURL())
              .setColor(0X0099ff)
              .setDescription("YOU WON!! You got a Black Jack\n\nYour cards are a " + pcards + ", with a total of " + cardtotal + ".\nDealers cards are a " + dcards + ", with a total of " + dcardtotal + ".\n You WON: "+bet+" <:chip:751730576918315048> \n You now have: "+authmoney+" <:chip:751730576918315048> ")
            msg.channel.send(cards);
          return;}
  
          if(cardtotal > 21){
            economy.subtract(`${author}.bal`, bet)
            let cards = new Discord.MessageEmbed()
              .setTitle("**Black Jack\n You Busted**")
              .setThumbnail(msg.author.avatarURL())
              .setColor(0X0099ff)
              .setDescription("**YOU LOST :(** You Busted\n\nYour cards are a " + pcards + ", with a total of " + cardtotal + ".\nDealers cards are a " + dcards + ", with a total of " + dcardtotal + ".\n You LOST: "+bet+" <:chip:751730576918315048> \n You now have: "+authmoney+" <:chip:751730576918315048> ")
            msg.channel.send(cards);
          return;}

//_______________________________________________________________________

          let cards2 = new Discord.MessageEmbed()
            .setTitle("**Black Jack**")
            .setThumbnail(msg.author.avatarURL())
            .setColor(0X0099ff)
            .setDescription("Your cards are a " + pcards + " with a total of " + cardtotal + ".\nDealers card is a " + dcards + ".\n Do you want to hit (:thumbsup:) or stand (:thumbsdown:)?")
          msg.channel.send(cards2).then(sentMessage2 => {


          if(cardtotal === 21){
            economy.add(`${author}.bal`, bet)
            let cards21 = new Discord.MessageEmbed()
              .setTitle("**Black Jack**")
              .setThumbnail(msg.author.avatarURL())
              .setColor(0X0099ff)
              .setDescription("YOU WON!! You got a Black Jack\n\nYour cards are a " + pcards + ", with a total of " + cardtotal + ".\nDealers cards are a " + dcards + ", with a total of " + dcardtotal + ".\n You WON: "+bet+" <:chip:751730576918315048> \n You now have: "+authmoney+" <:chip:751730576918315048> ")
            msg.channel.send(cards21);
            return;}

          if(cardtotal > 21){
          economy.subtract(`${author}.bal`, bet)
          let cards = new Discord.MessageEmbed()
            .setTitle("**Black Jack\n You Busted**")
            .setThumbnail(msg.author.avatarURL())
            .setColor(0X0099ff)
            .setDescription("**YOU LOST :(** You Busted\n\nYour cards are a " + pcards + ", with a total of " + cardtotal + ".\nDealers cards are a " + dcards + ", with a total of " + dcardtotal + ".\n You LOST: "+bet+" <:chip:751730576918315048> \n You now have: "+authmoney+" <:chip:751730576918315048> ")
          msg.channel.send(cards);
          return;}


          sentMessage2.react('👍');
          sentMessage2.react('👎');


          const filter = (reaction, user) => {
            return ['👍', '👎'].includes(reaction.emoji.name) && user.id === msg.author.id;
            };

            sentMessage2.awaitReactions(filter, { max: 1, time: 10000, errors: ['time'] })
              .then(collected => {
            const reaction = collected.first();

          if (reaction.emoji.name === '👍') {

            pcards.push(c4)
            cardtotal += c4;

            if(cardtotal === 21){
              economy.add(`${author}.bal`, bet)
              let cards = new Discord.MessageEmbed()
                .setTitle("**Black Jack**")
                .setThumbnail(msg.author.avatarURL())
                .setColor(0X0099ff)
                .setDescription("YOU WON!! You got a Black Jack\n\nYour cards are a " + pcards + ", with a total of " + cardtotal + ".\nDealers cards are a " + dcards + ", with a total of " + dcardtotal + ".\n You WON: "+bet+" <:chip:751730576918315048> \n You now have: "+authmoney+" <:chip:751730576918315048> ")
              msg.channel.send(cards);
            return;}

            if(cardtotal > 21){
              economy.subtract(`${author}.bal`, bet)
            let cards = new Discord.MessageEmbed()
              .setTitle("**Black Jack\n You Busted**")
              .setThumbnail(msg.author.avatarURL())
              .setColor(0X0099ff)
              .setDescription("**YOU LOST :(** You Busted\n\nYour cards are a " + pcards + ", with a total of " + cardtotal + ".\nDealers cards are a " + dcards + ", with a total of " + dcardtotal + ".\n You LOST: "+bet+" <:chip:751730576918315048> \n You now have: "+authmoney+" <:chip:751730576918315048> ")
            msg.channel.send(cards);
            return;}
//___________________________________________________
          let cards2 = new Discord.MessageEmbed()
            .setTitle("**Black Jack**")
            .setThumbnail(msg.author.avatarURL())
            .setColor(0X0099ff)
            .setDescription("Your cards are a " + pcards + " with a total of " + cardtotal + ".\nDealers card is a " + dcards + ".\n Do you want to hit (:thumbsup:) or stand (:thumbsdown:)?")
          msg.channel.send(cards2).then(sentMessage2 => {


          if(cardtotal === 21){
            economy.add(`${author}.bal`, bet)
            let cards21 = new Discord.MessageEmbed()
              .setTitle("**Black Jack**")
              .setThumbnail(msg.author.avatarURL())
              .setColor(0X0099ff)
              .setDescription("YOU WON!! You got a Black Jack\n\nYour cards are a " + pcards + ", with a total of " + cardtotal + ".\nDealers cards are a " + dcards + ", with a total of " + dcardtotal + ".\n You WON: "+bet+" <:chip:751730576918315048> \n You now have: "+authmoney+" <:chip:751730576918315048> ")
            msg.channel.send(cards21);
            return;}

          if(cardtotal > 21){
            economy.subtract(`${author}.bal`, bet)
          let cards = new Discord.MessageEmbed()
            .setTitle("**Black Jack\n You Busted**")
            .setThumbnail(msg.author.avatarURL())
            .setColor(0X0099ff)
            .setDescription("**YOU LOST :(** You Busted\n\nYour cards are a " + pcards + ", with a total of " + cardtotal + ".\nDealers cards are a " + dcards + ", with a total of " + dcardtotal + ".\n You LOST: "+bet+" <:chip:751730576918315048> \n You now have: "+authmoney+" <:chip:751730576918315048> ")
          msg.channel.send(cards);
          return;}


          sentMessage2.react('👍');
          sentMessage2.react('👎');


          const filter = (reaction, user) => {
            return ['👍', '👎'].includes(reaction.emoji.name) && user.id === msg.author.id;
            };

            sentMessage2.awaitReactions(filter, { max: 1, time: 10000, errors: ['time'] })
              .then(collected => {
            const reaction = collected.first();

          if (reaction.emoji.name === '👍') {

            pcards.push(c5)
            cardtotal += c5;

            if(cardtotal <= 21){
              
              bet *= 5
              economy.add(`${author}.bal`, bet)
              let cards = new Discord.MessageEmbed()
                .setTitle("**Black Jack**")
                .setThumbnail(msg.author.avatarURL())
                .setColor(0X0099ff)
                .setDescription("YOU WON!! (5 cards 21 or less -> bet 5X)\n\nYour cards are a " + pcards + ", with a total of " + cardtotal + ".\nDealers cards are a " + dcards + ", with a total of " + dcardtotal + ".\n You WON: "+bet+" <:chip:751730576918315048> \n You now have: "+authmoney+" <:chip:751730576918315048> ")
              msg.channel.send(cards);
            return;}

            if(cardtotal > 21){
              economy.subtract(`${author}.bal`, bet)
            let cards = new Discord.MessageEmbed()
              .setTitle("**Black Jack\n You Busted**")
              .setThumbnail(msg.author.avatarURL())
              .setColor(0X0099ff)
              .setDescription("**YOU LOST :(** You Busted\n\nYour cards are a " + pcards + ", with a total of " + cardtotal + ".\nDealers cards are a " + dcards + ", with a total of " + dcardtotal + ".\n You LOST: "+bet+" <:chip:751730576918315048> \n You now have: "+authmoney+" <:chip:751730576918315048> ")
            msg.channel.send(cards);
            return;}







        } else if (reaction.emoji.name === '👎') {

          dcards.push(dc2)

          for(var i = 3 ; dcardtotal <= 16 ; ++i){
            if(i === 3){
              dcards.push(dc3);
              dcardtotal += dc3;
            }
            if(i === 4){
              dcards.push(dc4);
              dcardtotal += dc4;
            }
            if(i === 5){
              dcards.push(dc5);
              dcardtotal += dc5;
            }
            if(i === 6){
              dcards.push(dc6);
              dcardtotal += dc6;
            }
            if(i === 7){
              dcards.push(dc7);
              dcardtotal += dc7;
            }
            if(i === 8){
              dcards.push(dc8);
              dcardtotal += dc8;
            }
            if(i === 9){
              dcards.push(dc9);
              dcardtotal += dc9;
            }
            if(i === 10){
              dcards.push(dc10);
              dcardtotal += dc10;
            }
          }

          if(cardtotal === dcardtotal){
            let cards = new Discord.MessageEmbed()
              .setTitle("**Black Jack**")
              .setThumbnail(msg.author.avatarURL())
              .setColor(0X0099ff)
              .setDescription("**Its a PUSH** you both have the same score\n\nYour cards are a " + pcards + ", with a total of " + cardtotal + ".\nDealers cards are a " + dcards + ", with a total of " + dcardtotal + ".\nYou have: "+authmoney+" <:chip:751730576918315048> ")
            msg.channel.send(cards);
          return;}

          if(dcardtotal === 21){
            economy.subtract(`${author}.bal`, bet)
            let cards = new Discord.MessageEmbed()
              .setTitle("**Black Jack**")
              .setThumbnail(msg.author.avatarURL())
              .setColor(0X0099ff)
              .setDescription("**YOU LOST :(** Dealer got a Black Jack\n\nYour cards are a " + pcards + ", with a total of " + cardtotal + ".\nDealers cards are a " + dcards + ", with a total of " + dcardtotal + ".\n You LOST: "+bet+" <:chip:751730576918315048> \n You now have: "+authmoney+" <:chip:751730576918315048> ")
            msg.channel.send(cards);
          return;}

          if(dcardtotal > 21){
            economy.add(`${author}.bal`, bet)
            let cards = new Discord.MessageEmbed()
              .setTitle("**Black Jack**")
              .setThumbnail(msg.author.avatarURL())
              .setColor(0X0099ff)
              .setDescription("**YOU WON!!** Dealer Busted\n\nYour cards are a " + pcards + ", with a total of " + cardtotal + ".\nDealers cards are a " + dcards + ", with a total of " + dcardtotal + ".\n You WON: "+bet+" <:chip:751730576918315048> \n You now have: "+authmoney+" <:chip:751730576918315048> ")
            msg.channel.send(cards);
          return;}
          
          if(cardtotal > dcardtotal){
            economy.add(`${author}.bal`, bet)
            let cards = new Discord.MessageEmbed()
              .setTitle("**Black Jack**")
              .setThumbnail(msg.author.avatarURL())
              .setColor(0X0099ff)
              .setDescription("**YOU WON!!**\n\nYour cards are a " + pcards + ", with a total of " + cardtotal + ".\nDealers cards are a " + dcards + ", with a total of " + dcardtotal + ".\n You WON: "+bet+" <:chip:751730576918315048> \n You now have: "+authmoney+" <:chip:751730576918315048> ")
            msg.channel.send(cards);
          return;}
          
          if(cardtotal < dcardtotal){
            economy.subtract(`${author}.bal`, bet)
            let cards = new Discord.MessageEmbed()
              .setTitle("**Black Jack**")
              .setThumbnail(msg.author.avatarURL())
              .setColor(0X0099ff)
              .setDescription("**You LOST :(**\n\nYour cards are a " + pcards + ", with a total of " + cardtotal + ".\nDealers cards are a " + dcards + ", with a total of " + dcardtotal + ".\n You LOST: "+bet+" <:chip:751730576918315048> \n You now have: "+authmoney+" <:chip:751730576918315048> ")
            msg.channel.send(cards);
          return;}
        }
        })
        .catch(collected => {
          bet /= 2;
          economy.subtract(`${author}.bal`, bet)
          msg.reply('You didn\'t do anything, so now the game\'s over. and lost half of your bet');
        return;});
        });







        } else if (reaction.emoji.name === '👎') {

          dcards.push(dc2)

          for(var i = 3 ; dcardtotal <= 16 ; ++i){
            if(i === 3){
              dcards.push(dc3);
              dcardtotal += dc3;
            }
            if(i === 4){
              dcards.push(dc4);
              dcardtotal += dc4;
            }
            if(i === 5){
              dcards.push(dc5);
              dcardtotal += dc5;
            }
            if(i === 6){
              dcards.push(dc6);
              dcardtotal += dc6;
            }
            if(i === 7){
              dcards.push(dc7);
              dcardtotal += dc7;
            }
            if(i === 8){
              dcards.push(dc8);
              dcardtotal += dc8;
            }
            if(i === 9){
              dcards.push(dc9);
              dcardtotal += dc9;
            }
            if(i === 10){
              dcards.push(dc10);
              dcardtotal += dc10;
            }
          }

          if(cardtotal === dcardtotal){
            let cards = new Discord.MessageEmbed()
              .setTitle("**Black Jack**")
              .setThumbnail(msg.author.avatarURL())
              .setColor(0X0099ff)
              .setDescription("**Its a PUSH** you both have the same score\n\nYour cards are a " + pcards + ", with a total of " + cardtotal + ".\nDealers cards are a " + dcards + ", with a total of " + dcardtotal + ".\nYou have: "+authmoney+" <:chip:751730576918315048> ")
            msg.channel.send(cards);
          return;}

          if(dcardtotal === 21){
            economy.subtract(`${author}.bal`, bet)
            let cards = new Discord.MessageEmbed()
              .setTitle("**Black Jack**")
              .setThumbnail(msg.author.avatarURL())
              .setColor(0X0099ff)
              .setDescription("**YOU LOST :(** Dealer got a Black Jack\n\nYour cards are a " + pcards + ", with a total of " + cardtotal + ".\nDealers cards are a " + dcards + ", with a total of " + dcardtotal + ".\n You LOST: "+bet+" <:chip:751730576918315048> \n You now have: "+authmoney+" <:chip:751730576918315048> ")
            msg.channel.send(cards);
          return;}

          if(dcardtotal > 21){
            economy.add(`${author}.bal`, bet)
            let cards = new Discord.MessageEmbed()
              .setTitle("**Black Jack**")
              .setThumbnail(msg.author.avatarURL())
              .setColor(0X0099ff)
              .setDescription("**YOU WON!!** Dealer Busted\n\nYour cards are a " + pcards + ", with a total of " + cardtotal + ".\nDealers cards are a " + dcards + ", with a total of " + dcardtotal + ".\n You WON: "+bet+" <:chip:751730576918315048> \n You now have: "+authmoney+" <:chip:751730576918315048> ")
            msg.channel.send(cards);
          return;}
          
          if(cardtotal > dcardtotal){
            economy.add(`${author}.bal`, bet)
            let cards = new Discord.MessageEmbed()
              .setTitle("**Black Jack**")
              .setThumbnail(msg.author.avatarURL())
              .setColor(0X0099ff)
              .setDescription("**YOU WON!!**\n\nYour cards are a " + pcards + ", with a total of " + cardtotal + ".\nDealers cards are a " + dcards + ", with a total of " + dcardtotal + ".\n You WON: "+bet+" <:chip:751730576918315048> \n You now have: "+authmoney+" <:chip:751730576918315048> ")
            msg.channel.send(cards);
          return;}
          
          if(cardtotal < dcardtotal){
            economy.subtract(`${author}.bal`, bet)
            let cards = new Discord.MessageEmbed()
              .setTitle("**Black Jack**")
              .setThumbnail(msg.author.avatarURL())
              .setColor(0X0099ff)
              .setDescription("**You LOST :(**\n\nYour cards are a " + pcards + ", with a total of " + cardtotal + ".\nDealers cards are a " + dcards + ", with a total of " + dcardtotal + ".\n You LOST: "+bet+" <:chip:751730576918315048> \n You now have: "+authmoney+" <:chip:751730576918315048> ")
            msg.channel.send(cards);
          return;}
        }
        })
        .catch(collected => {
          bet /= 2;
          economy.subtract(`${author}.bal`, bet)
          msg.reply('You didn\'t do anything, so now the game\'s over. and lost half of your bet');
        return;});
        });

//________________________________________________________________________          
        



} else if (reaction.emoji.name === '👎') {

          dcards.push(dc2)

          for(var i = 3 ; dcardtotal <= 16 ; ++i){
            if(i === 3){
              dcards.push(dc3);
              dcardtotal += dc3;
            }
            if(i === 4){
              dcards.push(dc4);
              dcardtotal += dc4;
            }
            if(i === 5){
              dcards.push(dc5);
              dcardtotal += dc5;
            }
            if(i === 6){
              dcards.push(dc6);
              dcardtotal += dc6;
            }
            if(i === 7){
              dcards.push(dc7);
              dcardtotal += dc7;
            }
            if(i === 8){
              dcards.push(dc8);
              dcardtotal += dc8;
            }
            if(i === 9){
              dcards.push(dc9);
              dcardtotal += dc9;
            }
            if(i === 10){
              dcards.push(dc10);
              dcardtotal += dc10;
            }
          }


          if(cardtotal === dcardtotal){
            let cards = new Discord.MessageEmbed()
              .setTitle("**Black Jack**")
              .setThumbnail(msg.author.avatarURL())
              .setColor(0X0099ff)
              .setDescription("**Its a PUSH** you both have the same score\n\nYour cards are a " + pcards + ", with a total of " + cardtotal + ".\nDealers cards are a " + dcards + ", with a total of " + dcardtotal + ".\nYou have: "+authmoney+" <:chip:751730576918315048> ")
            msg.channel.send(cards);
          return;}

          if(dcardtotal === 21){
            economy.subtract(`${author}.bal`, bet)
            let cards = new Discord.MessageEmbed()
              .setTitle("**Black Jack**")
              .setThumbnail(msg.author.avatarURL())
              .setColor(0X0099ff)
              .setDescription("**YOU LOST :(** Dealer got a Black Jack\n\nYour cards are a " + pcards + ", with a total of " + cardtotal + ".\nDealers cards are a " + dcards + ", with a total of " + dcardtotal + ".\n You LOST: "+bet+" <:chip:751730576918315048> \n You now have: "+authmoney+" <:chip:751730576918315048> ")
            msg.channel.send(cards);
          return;}

          if(dcardtotal > 21){
            economy.add(`${author}.bal`, bet)
            let cards = new Discord.MessageEmbed()
              .setTitle("**Black Jack**")
              .setThumbnail(msg.author.avatarURL())
              .setColor(0X0099ff)
              .setDescription("**YOU WON!!** Dealer Busted\n\nYour cards are a " + pcards + ", with a total of " + cardtotal + ".\nDealers cards are a " + dcards + ", with a total of " + dcardtotal + ".\n You WON: "+bet+" <:chip:751730576918315048> \n You now have: "+authmoney+" <:chip:751730576918315048> ")
            msg.channel.send(cards);
          return;}
          
          if(cardtotal > dcardtotal){
            economy.add(`${author}.bal`, bet)
            let cards = new Discord.MessageEmbed()
              .setTitle("**Black Jack**")
              .setThumbnail(msg.author.avatarURL())
              .setColor(0X0099ff)
              .setDescription("**YOU WON!!**\n\nYour cards are a " + pcards + ", with a total of " + cardtotal + ".\nDealers cards are a " + dcards + ", with a total of " + dcardtotal + ".\n You WON: "+bet+" <:chip:751730576918315048> \n You now have: "+authmoney+" <:chip:751730576918315048> ")
            msg.channel.send(cards);
          return;}
          
          if(cardtotal < dcardtotal){
            economy.subtract(`${author}.bal`, bet)
            let cards = new Discord.MessageEmbed()
              .setTitle("**Black Jack**")
              .setThumbnail(msg.author.avatarURL())
              .setColor(0X0099ff)
              .setDescription("**You LOST :(**\n\nYour cards are a " + pcards + ", with a total of " + cardtotal + ".\nDealers cards are a " + dcards + ", with a total of " + dcardtotal + ".\n You LOST: "+bet+" <:chip:751730576918315048> \n You now have: "+authmoney+" <:chip:751730576918315048> ")
            msg.channel.send(cards);
          return;}
        return;}
        })
        .catch(collected => {
          bet /= 2;
          economy.subtract(`${author}.bal`, bet)
          msg.reply('You didn\'t do anything, so now the game\'s over. and lost half of your bet');
        return;});
      });
}

module.exports.help = {
    name: "bj"
}