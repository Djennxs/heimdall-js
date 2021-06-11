const { Client, Intents } = require('discord.js');

const client = new Client({ ws: { intents: Intents.ALL } });
const config = require('./../config.json');

// Require functions
const { Join, Leave } = require('./Functions/Members');

// Require command
const { WelcomeCommand } = require('./Commands/Welcome');
const { HelpCommand } = require('./Commands/Help');
const { RoleCommands } = require('./Commands/Roles');

// Functions
Join(client);
Leave(client);

// Commands
WelcomeCommand(client);
HelpCommand(client);
RoleCommands(client);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  
  // Activity
  client.user.setActivity("vkn?help");
});

client.login(config.tokens[`${config.mode}`]);