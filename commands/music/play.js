module.exports = {
    name: 'play',
    description: 'Music portion of the bot.',
    async execute(client, message, args) {
        if(!client.musicmap) client.musicmap = new Map();
        const Discord = require('discord.js');
        const ytdl = require('ytdl-core');
        let num = 0;
        const userid = message.author.id
        var search = require("youtube-search");
        var opts = {
            maxResults: 10,
            key: "private", 
            type: 'video'
        }
        let embed = new Discord.RichEmbed()



        if (!args[0]) return message.channel.send("I could not locate any arguments. Please enter a song/video name.");
        if (!message.member.voiceChannel) return message.channel.send("Please join a voice channel to listen to music.");
        data = client.musicmap.get(message.guild.id) || {};
        if (!data.connection) data.connection = await message.member.voiceChannel.join()
        if (!data.queue) data.queue = [];
        data.guildID = message.guild.id;
        data.loop = 0;
        search(args.join(' '), opts, async function(err, result) {
            if (err) return console.log(err);
            for (let i = 0; i < result.length; i++) {
                embed.addField(i+1+") " + result[i].title + " from " + result[i].channelTitle,"----------------------------------")
            }
            await message.channel.send(embed)
            message.channel.send("Please enter a number 1-10 representing the video you wish to play.")
            try {
                if (message.author.id != userid) {

                } else {
                    var response = await message.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
                        maxMatches: 1,
                        time: 10000,
                        errors: ['time']
                    });
                }

            } catch (err) {
                console.error(err);
                return message.channel.send('No video selected, or value out of range. Please try again.');
            }
            const reply = parseInt(response.first().content)-1
            data.queue.push({
                SongTitle:result[reply].title,
                Request:message.author.tag,
                Url:result[reply].link,
                Channel:result[reply].channelTitle,
                inChannel:message.channel.id,
                
            })
            console.log("Dispatcher"+ data.dpat)
            if(!data.dpat){
                playSong(client, client.musicmap, data)
            }else{
                
                const songem = new Discord.RichEmbed()
                .setTitle("Song Added to Queue")
                .addField("Song name:", result[reply].title)
                .addField("Song URL:",result[reply].link)
                .addField("Youtube Channel: ",result[reply].channelTitle)
                .addField("Requested by: ",message.author.tag)
                message.channel.send(songem)
            }
            console.log(data)
            client.musicmap.set(message.guild.id, data);
            
            async function playSong(client,musicmap,data){
                console.log(`num: ${num}`)
                const playem = new Discord.RichEmbed()
                .setTitle("Now Playing: ")
                .addField("Song name:", data.queue[num].SongTitle)
                .addField("Song URL:", data.queue[num].Url)
                .addField("Youtube Channel: ", data.queue[num].Channel)
                .addField("Requested by: ",data.queue[num].Request)
                client.channels.get(data.queue[num].inChannel).send(playem)  
                console.log(data.dpat)
                var stream = await ytdl(data.queue[num].Url, {filter:'audioonly'});
                stream.on('error',error => console.log("error: stream: " + error));
                data.dpat = await data.connection.playStream(stream)
                data.dpat.guildID = data.guildID;
                data.dpat.once('end', reason=>{
                    setTimeout((reason) =>{
                     if(reason === 'Stream is not generating quickly enough.'){
                    console.log("slow stream/song end")
                     }
                    console.log(reason)
                    finish(client,musicmap,data);
                    },400)
                });
            }
            function finish(client, musicmap, data){
                    
               let thingy = musicmap.get(data.dpat.guildID)
               console.log(thingy + " thingy")
                if(client.musicmap.get(message.guild.id).loop == 0){
                    thingy.queue.shift();
                }
                if(client.musicmap.get(message.guild.id).loop == 1){
                    num = num + 1
                }
                console.log(thingy.queue.length)
                if(num > (thingy.queue.length-1)){
                    num = 0
                }
               if(thingy.queue.length > 0){
                   musicmap.set(data.dpat.guildID,thingy); 
                   playSong(client, musicmap, thingy);
               }else{
                   
                   musicmap.delete();
                   let voic = client.guilds.get(data.dpat.guildID).me.voiceChannel
                   if(voic) voic.leave();
                   data.dpat = undefined
                   data.connection = undefined
               }
                
                                
            }
        })

    },
};
