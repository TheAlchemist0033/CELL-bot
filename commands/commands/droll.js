module.exports = {
    name: 'droll',
    description: 'rolls a dice',
    execute(client, message, args) {
        const Discord = require('discord.js');
        diearr = []
       
        if (args[0]){
        if(args[0] < 1000 && args[0] >= 0){       
     for(let i=0; i<args[0];i++){
                diearr.push(i.toString());
            }
        message.channel.send(Math.floor(Math.random() * args[0]));
        }else{
            message.channel.send("enter a number of sides up to 1000");
        }
}else{
    message.channel.send("please enter the number of sides youd like");
}
    },
    
};
