const { Client, Intents } = require('discord.js');

const client = new Client({ ws: { intents: Intents.ALL } });
const config = require('./config.json');

/**
 * 
 * Require functions
 */
const members = require('./functions/members');
const roles = require('./commands/roles');
const welcome = require('./commands/welcome');

/**
 * 
 * Use functions
 */
// Members
members.join(client);
members.leave(client);

// Commands
roles.roleCommands(client);
welcome.welcomeCommand(client);

/**
 * 
 * On ready
 */
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(config.tokens.live);