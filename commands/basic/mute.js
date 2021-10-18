/*Deprecated
module.exports = {
  name: 'mute',
  description: 'mutes',
  async execute(client, message, args) {
      const Discord = require('discord.js');
      if(message.author.id !== "608802993810440223" && message.author.id !== "143454735750397952" && message.author.id !== "406942946445885443"){
        return;
      }else{
      client.mute.findOne({
          ServerId: message.guild.id,
          UserId: message.mentions.members.first().id
      }, (async (err, res) => {
          if (err) console.log(err);
          if (!res) {
              message.channel.send("no config found. creating a config.")
              const mutelist = new client.mute({
                  ServerId: message.guild.id,
                  UserId: message.mentions.members.first().id,
                  Exists: 1
              })
              mutelist.save().catch(err => console.log(err))
          } else {
              if (args[0]) {
                  if (args[1]) {
                      var d = new Date();
                      var n = d.getTime() + (60000 * args[1]);
                      message.channel.send(args[1])
                      message.channel.send(n)
                      res.Timeout = n;
                      mem = message.mentions.members.first();
                      console.log(mem);
                      if (!mem || mem == undefined) {
                          message.channel.send("member not found.");
                          return;
                      }
                      res.UserId = mem.id;
                      res.ServerId = message.guild.id
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
                  } else {
                      message.channel.send("enter a Timeout in minutes.");

                  }
              } else {
                  message.channel.send("mention a user.")
              }
          }
      }))
    }
  },
};
*/