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
const faq = require('./commands/faq');
const help = require('./commands/help');

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
