const { handleRoles } = require('../Functions/Roles');
const { ErrorMessage } = require('../Functions/ErrorMessage');
const config = require('./../../config.json');

const definedRoles = ['New User', 'Trial', 'Recruit', 'Viking', 'Mercenary'];

const RoleCommands = (Client) => {
  Client.on('ready', () => {
    console.log('Role commands ready!');
  });
  
  Client.on('message', message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;
    
    // Set command and arguments of the command if they exist
    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // Check if the argument exists, otherwise ignore the command
    if (args.length > 0 && message.member.roles.cache.find(role => role.name == 'Personnel')) {

      definedRoles.forEach(role => {
        if (command === role.toLowerCase() && (args[0].startsWith('<@') && args[0].endsWith('>'))) {
          let user = getUserFromMention(Client, args[0]);
          let member = message.guild.member(user);

          let removeRoles = definedRoles.filter(removeRole => removeRole !== role);

          if (member) {
            handleRoles.remove(member, removeRoles);
            handleRoles.add(member, role);
          }
        }
      });

      // Remove the command message
      message.delete().catch(error => {
        ErrorMessage(error);
      });
    }
  });
}

/**
* 
* Helper functions
*/
const getUserFromMention = (Client, mention) => {
  if (!mention) return;
  
  if (mention.startsWith('<@') && mention.endsWith('>')) {
    mention = mention.slice(2, -1);
    
    if (mention.startsWith('!')) {
      mention = mention.slice(1);
    }
    
    return Client.users.cache.get(mention);
  }
}

module.exports = { RoleCommands };