const { Client, MessageEmbed, Intents } = require('discord.js');

const client = new Client({ ws: { intents: Intents.ALL } });
const config = require('./config.json');

/**
 * 
 * Require functions
 */
const members = require('./functions/members');
const roles = require('./commands/roles');

/**
 * 
 * Use functions
 */

// Members
members.join(client, MessageEmbed);
members.leave(client, MessageEmbed);

// Roles
roles.roleCommands(client);

/**
 * 
 * On ready
 */
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(config.tokens.live);