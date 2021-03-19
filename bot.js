const { Client, MessageEmbed, Intents } = require('discord.js');

const client = new Client({ ws: { intents: Intents.ALL } });
const config = require('./config.json');

// Include functions
const members = require('./functions/members');
// const notify = require('./functions/notify');

// Use functions
members.join(client, MessageEmbed);
members.leave(client, MessageEmbed);

// Notify functions
// new notify.training(client, Discord);

// On ready
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(config.tokens.live);