var express = require('express');
var app = express();
const discord = require('discord.js')
const discordConfig = require('./config.json')
const discordClient = new discord.Client();

let lastCommand = ''

app.get('/', function (req, res) {
  res.send('Hello World! Avalonian Scheduler Now On heroku ' + lastCommand);
});

app.listen(process.env.PORT, function () {
  console.log('Example app listening on port process.env.PORT!');
});

discordClient.on('ready', () => {
  console.log(`Bot users, ${discordClient.channels.size}, canais: ${discordClient.channels.size}, Servers: ${discordClient.guilds.size}`)
})

discordClient.on('message', async (message) =>{
  if(message.author.bot) return;
  if(message.channel.type === 'dm') return;
  lastCommand = message.content
})