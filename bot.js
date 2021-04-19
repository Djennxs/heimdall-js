/**
 * 
 * Heimdall code
 */

 const { Client, Intents } = require('discord.js');

const client = new Client({ ws: { intents: Intents.ALL } });
const config = require('./config.json');

// Require functions
const members = require('./Functions/Members');
const roles = require('./Commands/Roles');
const welcome = require('./Commands/Welcome');
const faq = require('./Commands/Faq');
const help = require('./Commands/Help');

// Use functions
// Watchers
const roleWatcher = require('./Watchers/Roles');

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
