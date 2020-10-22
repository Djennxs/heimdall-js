const Discord = require('discord.js');
const Client = new Discord.Client();
const config = require('./config.json');

// Include functions
const members = require('./functions/members');

// Use functions
new members.join(Client, Discord);
// new members.leave(Discord);

// On ready
Client.on('ready', () => {
  console.log(`Logged in as ${Client.user.tag}!`);
});



Client.login(config.tokens.live);