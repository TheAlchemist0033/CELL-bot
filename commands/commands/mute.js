/*Deprecated

module.exports = {
    name: 'mute',
    description: 'mutes',
    async execute(client, message, args) {
        const Discord = require('discord.js');
    client.mute.findOne({
        ServerId: message.guild.id
    }, (async (err, res) => {
        if (err) console.log(err);
        if (!res) {
          message.channel.send("no config found. creating a config.")
           const mutelist = new client.mute({
                    ServerId: message.guild.id,
                    Exists: 1
                })
                mutelist.save().catch(err => console.log(err))
        } else {
          if(args[0]){
            if(args[1]){
            var d = new Date();
            var n = d.getTime() + (60000*args[1]);
            res.Timeout = n;
            mem = message.mentions.members.first();
            if(!mem || mem == undefined){
              message.channel.send("member not found.");
              return;
            }
            res.Username = mem.id;
            res.Muted = 1;
            res.Exists = 1;
            roless = message.member.roles.cache.map(r => r.id);

            console.log(roless);
            const index = roless.indexOf("625543496400502794");
            if (index > -1) {
                roless.splice(index, 1);
            }
            const role1 = mem.roles.cache.get('625543496400502794');
             if (role1) await mem.roles.remove(role1);
            
            res.Roles = roless;
            res.save().catch(err => console.log(err));
            console.log(roless)
        }else{
            message.channel.send("enter a Timeout in minutes.");

        }
          }else{
            message.channel.send("mention a user.")
          }
        }
    }))
    },
    };
*/