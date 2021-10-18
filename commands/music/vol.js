
module.exports = {
    name: 'vol',
    description: 'Music portion of the bot.',
    async execute(client, message, args) {
        if(!args[0]) return message.channel.send()
        let fetched = client.musicmap.get(message.guild.id);
        if(!fetched) return message.channel.send("No music is playing here.");
        if(message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send("You are not in a voice channel with me.");
        if(parseInt(args[0]) == NaN || parseInt(args[0]) < 0) return message.channel.send("Invalid selection for volume.")
        fetched.dpat.setVolume(parseInt(args[0])/100)
        message.channel.send("Music volume is now at " + args[0]);
    }, 
};
