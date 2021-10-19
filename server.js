const {
    SSL_OP_SSLEAY_080_CLIENT_DH_BUG
} = require("constants");
const Discord= require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES","GUILD_MESSAGE_REACTIONS","GUILD_MEMBERS","GUILDS","GUILD_BANS","GUILD_INVITES","GUILD_VOICE_STATES"],});

const fs = require("fs");
client.musicmap = new Map();
client.mongoose = require("mongoose");
client.wait = require('util').promisify(setTimeout);
client.serverconf = require('/home/thealchemist/Desktop/Programming/Javascript/cellbot/config.js');
//Deprecated: client.mute = require('/home/thealchemist/Desktop/Programming/Javascript/cellbot/mute.js');//
client.inter = require('/home/thealchemist/Desktop/Programming/Javascript/cellbot/inter.js');
client.hack = require('/home/thealchemist/Desktop/Programming/Javascript/cellbot/hack.js');
client.commands = new Discord.Collection();
client.imgur = require("imgur")
const config = require("/home/thealchemist/Desktop/Programming/Javascript/cellbot/config.json");
client.vc == null;
let comList = []
fs.readdir("/home/thealchemist/Desktop/Programming/Javascript/cellbot/commands/", (err, folders) => {
    if (err) throw err;
    for (let i = 0; i < folders.length; i++) {
        fs.readdir(`/home/thealchemist/Desktop/Programming/Javascript/cellbot/commands/${folders[i]}`, (e, files) => {
            if (e) console.log(e)
            let jsfiles = files.filter(f => f.split(".").pop() === 'js');
            if (jsfiles.length < 1) {
                console.log(`No commands in ${folders[i]}`);
                return;
            }
            jsfiles.forEach((file) => {
                let properties = require(`/home/thealchemist/Desktop/Programming/Javascript/cellbot/commands/${folders[i]}/${file}`);
                console.log(`Loaded ${file}`);
                comList.push(file);
                client.commands.set(properties.name, properties)
            })
        })
    }
})
client.on("ready", async () => {
    console.log(`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);
    client.mongoose.connect('mongodb://DaemoniumAdmin:Dallasrules123.@daemonium-shard-00-00-u2ufm.mongodb.net:27017,daemonium-shard-00-01-u2ufm.mongodb.net:27017,daemonium-shard-00-02-u2ufm.mongodb.net:27017/Daemonium?ssl=true&replicaSet=Daemonium-shard-0&authSource=admin&retryWrites=true&maxPoolSize=10', {
        useNewUrlParser: true,
        poolSize: 10
    });
    client.wait(1000);
});
client.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:

    const userid = member.id
    client.hack.findOne({
        ServerId: member.guild.id,
        UserId: userid
    }, ((err, res) => {
        if (err) console.log(err);
        if (!res) {} else {
            member.ban("hackbanned");
        }
    }))
   
    // To compare, we need to load the current invite list.
})
client.on("guildDelete", guild => {
    
});
client.on("guildCreate", guild => {
    
})
client.on("message", async message => {
    function log(logmessage) {
        if (message.guild.channels.has(logChannel)) {
            message.guild.channels.get(logChannel).send({
                embed: logmessage
            }).then().catch(err => console.log(err));
        }
    }
    if (message.author.bot) return;

    function clean(text) {
        if (typeof(text) === "string")
            return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else
            return text;
    }
    var prefix = config.prefix;
    client.serverconf.findOne({
        ServerId: message.guild.id
    }, ((err, res) => {
        if (err) console.log(err);
        if (!res) {
            return;
        } else {
            prefix = res.Prefix
        }
    }))
    /*Deprecated
    client.mute.find({
        ServerId: message.guild.id,
        Exists: 1
    }, (async (err, res) => {
        if (err) console.log(err);
        if (!res) {
            message.channel.send("no res.")
        } else {
            console.log(res.length);
            for (let i = 0; i < res.length; i++) {
                var d = new Date();
                var n = d.getTime();
                let mem = message.guild.members.fetch(res[i].UserId);
                if (res[i].Timeout <= n) {
                    if (res[i].Muted == 1) {
                        res[i].Timeout = 0
                        res[i].Muted = 0

                        mem.then(async function(GuildMember) {
                            if (GuildMember.roles.cache.get('625543496400502794')) {
                                await GuildMember.roles.add(GuildMember.roles.cache.get('625543496400502794'));
                                message.channel.send("mutebreaker")
                            }
                        });
                        message.channel.send(`<@${res[i].UserId}> unmuted`);
                        res[i].save().catch(err => console.log(err));
                    }
                } else {
                    if (res[i].Muted == 1) {
                        roless = message.member.roles.cache.map(r => r.id);
                        var index = roless.indexOf("625543496400502794");
                        if (index > -1) {
                            roless.splice(index, 1);
                        }
                        mem.then(async function(GuildMember) {

                            if (GuildMember.roles.cache.get('625543496400502794')) {
                                await GuildMember.roles.remove(GuildMember.roles.cache.get('625543496400502794'));
                                message.channel.send("mutebreaker")
                            }
                        });


                        res[i].Roles = roless;
                        res[i].save().catch(err => console.log(err));
                    }
                }
            }
        }
    }));*/
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const nanargs = message.content.split(/ +/g)
    const command = args.shift().toLowerCase();
    if (!message.content.startsWith(prefix)) return;




    if (command === "eval") {
        if (message.author.id !== "608802993810440223" && message.author.id !== "149686265271418880" && message.author.id !== "221442254504591360") {
            return message.channel.send("USER NOT AUTHORIZED");
        }
        try {
            const code = args.join(" ");
            let evaled = eval(code);
            if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
            message.channel.send(clean(evaled), {
                code: "xl"
            });
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    }
    if (command == "help") {
        message.channel.send(`${comList.join(' ')}`)
    }
    const cmd = client.commands.get(command);
    if (!cmd) return;
    console.log("success")
    await cmd.execute(client, message, args, Discord);
});
client.on('voiceStateUpdate', (oldState, newState) => {
    if (oldState.member.user.bot) return;
    client.inter.findOne({
        ServerId: oldState.member.guild.id,
    }, (async (err, res) => {
        if (err) console.log(err);
        if (!res) {} else {
            if (newState.member.user.id == res.Victim) {



                let channel = oldState.guild.channels.cache.find(
                    channel => channel.name.toLowerCase() === "bot-spam"
                )
                if (newState.channelID === null) {
                    if (oldState.channel !== null) {
                        var chanel = client.channels.cache.get(oldState.channelID);
                        client.vc = chanel
                        if (!chanel) return console.error("The channel does not exist!");
                        chanel.leave()
                    }
                } else if (oldState.channelID === null) {
                    if (newState.channel !== null) {
                        var chanel = client.channels.cache.get(newState.channelID);
                        client.vc = chanel;
                        if (!chanel) return console.error("The channel does not exist!");
                        chanel.join().then(connection => {
                            // Yay, it worked!
                            console.log("Successfully connected.");
                        }).catch(e => {
                            // Oh no, it errored! Let's log it to console :)
                            console.error(e);
                        });
                    }
                } else {
                    if (oldState.channel !== null && newState.channel !== null) {
                        const chanel = client.channels.cache.get(newState.channelID);
                        client.vc = chanel;
                        if (!chanel) return console.error("The channel does not exist!");
                        chanel.join().then(connection => {
                            // Yay, it worked!
                            console.log("Successfully switched.");
                        }).catch(e => {
                            // Oh no, it errored! Let's log it to console :)
                            console.error(e);
                        });

                    } else if (oldState.channel == null && newState.channel !== null) {
                        const chanel = client.channels.cache.get(newState.channelID);
                        client.vc = chanel;
                        if (!chanel) return console.error("The channel does not exist!");
                        chanel.join().then(connection => {
                            // Yay, it worked!
                            console.log("Successfully switched.");
                        }).catch(e => {
                            // Oh no, it errored! Let's log it to console :)
                            console.error(e);
                        });
                    } else if (oldState !== null && newState.channel == null) {
                                         }
                }
            }
        }
    }))
});
var dpat = null
client.on('guildMemberSpeaking', (member, speaking) => {
    var scatarr = [
        "/home/thealchemist/Desktop/Programming/Javascript/cellbot/scatman/scat.mp3",
        "/home/thealchemist/Desktop/Programming/Javascript/cellbot/scatman/scatman.mp3",
        "/home/thealchemist/Desktop/Programming/Javascript/cellbot/scatman/skibop.mp3"
    ]
    scat = scatarr[Math.floor(Math.random() * scatarr.length)];
    if (speaking == 0) {
        dpat.destroy();
    }
    client.inter.findOne({
        ServerId: member.guild.id,
    }, (async (err, res) => {
        if (err) console.log(err);
        if (!res) {} else {
            if (member.id == res.Victim && speaking == 1) {
                var voiceChannel = client.vc;
                voiceChannel.join().then(connection => {
                    console.log("joined channel");
                    dpat = connection.play(scat, {
                        volume: 0.9
                    });
                    dpat.on("end", end => {
                        console.log("over.");
                    });
                }).catch(err => console.log(err));
            }
        }
    }))
})
client.on("MessageUpdate", async message => {
    function log(logmessage) {
        if (message.guild.channels.has(logChannel)) {
            message.guild.channels.get(logChannel).send({
                embed: logmessage
            }).then().catch(err => console.log(err));
        }
    }
    if (message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const nanargs = message.content.split(/ +/g)
    const command = args.shift().toLowerCase();
    if (!message.content.startsWith(prefix)) return;
    const cmd = client.commands.get(command);
    if (!cmd) return;
    console.log("success")
    await cmd.execute(client, message, args, Discord);
});
client.on('error', console.error);
client.login("secret");
