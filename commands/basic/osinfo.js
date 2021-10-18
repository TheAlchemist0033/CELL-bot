module.exports = {
    name: 'osinfo',
    description: 'Gives info about OS.',
    async execute(client, message, args) {
        const Discord = require('discord.js');
        const os = require('os-utils');
var cpup = 0;
var totmem = os.totalmem();
var freemem = os.freemem();
var load = os.loadavg(1);
os.cpuUsage(function(v){
    cpup = v
});
console.log(cpup);
console.log(os.totalmem());
console.log(os.freemem());
message.channel.send("CPU: " + cpup + "%\n Total Memory: " + totmem + "\n Freemem: " + freemem + "\n Load Average: " + load);
    },
}
