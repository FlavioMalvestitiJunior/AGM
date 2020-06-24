var express = require('express');
var app = express();
const discord = require('discord.js')
const discordConfig = require('./config.json')
const discordClient = new discord.Client();

let lastCommand = ''

app.get('/', function (req, res) {
  res.send('ArchMage Last Command: ' + lastCommand);
});

app.listen(process.env.PORT, function () {
  console.log('Example app listening on port process.env.PORT!');
});

discordClient.on('ready', () => {
  console.log(`Bot users, ${discordClient.channels.size}, canais: ${discordClient.channels.size}, Servers: ${discordClient.guilds.size}`)
})

discordClient.on('message', async (message) => {
  if (message.author.bot) return;
  if (message.channel.type === 'dm') return;
  if (message.content.toLowerCase().startsWith(discordConfig.prefix)) {
    lastCommand = message.content
  }
})

discordClient.login(process.env.BOT_TOKEN)