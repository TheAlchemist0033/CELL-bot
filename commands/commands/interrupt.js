module.exports = {
    name: 'interrupt',
    description: 'mutes',
    async execute(client, message, args) {
        const Discord = require('discord.js');
        if(!args[0]){
            message.channel.send("No user found.")
        }else{
            let uusername = message.mentions.members.first()
            client.inter.findOne({
                ServerId:message.guild.id,
            }, (async (err, res) => {
                if(err) console.log(err);
                if(!res){
                    const inist = new client.inter({
                        ServerId: message.guild.id,
                        Antagonist:message.author.id,
                        Victim:uusername.id,
                        Exists: 1
                    })
                    message.channel.send("value stored for " + uusername.displayName)
                    inist.save().catch(err => console.log(err));
                }else{
                    res.ServerId = message.guild.id
                    res.Antagonist = message.author.id
                    res.Victim = uusername.id
                    res.Exists = 1
                    message.channel.send("value stored for " + uusername.displayName)
                    res.save().catch(err => console.log(err));
                }
            }))
        }
    },
};
