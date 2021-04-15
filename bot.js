/**
 * 
 * Heimdall code
 */

 const { Client, Intents } = require('discord.js');

const client = new Client({ ws: { intents: Intents.ALL } });
const config = require('./config.json');

// Require functions
const members = require('./Functions/members');
const roles = require('./Commands/roles');
const welcome = require('./Commands/welcome');
const faq = require('./Commands/faq');
const help = require('./Commands/help');

// Use functions
// Watchers
const roleWatcher = require('./watchers/roles');

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
faq.faqCommand(client);
help.helpCommand(client);

// Watchers
roleWatcher.roleChange(client);

/**
 * 
 * On ready
 */
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  
  // Activity
  client.user.setActivity("vkn?help");
});

client.login(config.tokens[`${config.mode}`]);
