const { handleRoles } = require('../functions/roles');
const config = require('../config.json');

const roleCommands = (Client) => {
  Client.on('ready', () => {
    console.log('Role commands ready!');
  });
  
  Client.on('message', message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;
    
    // Set command and arguments of the command if they exist
    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    
    // Check if the argument exists, otherwise ignore the command
    if (args.length > 0) {
      // Remove the command message
      message.delete();
      
      /**
      * 
      * Handle Trial role
      */
      if (command === 'trial' && (args[0].startsWith('<@') && args[0].endsWith('>'))) {
        let user = getUserFromMention(Client, args[0]);
        let member = message.guild.member(user);
        
        if (member) {
          handleRoles.remove(member, ['New user', 'Recruit', 'Viking']);
          handleRoles.add(member, 'Trial');
        }
      }
      
      /**
      * 
      * Handle Recruit role
      */
      if (command === 'recruit' && (args[0].startsWith('<@') && args[0].endsWith('>'))) {
        let user = getUserFromMention(Client, args[0]);
        let member = message.guild.member(user);
        
        if (member) {
          handleRoles.remove(member, ['New user', 'Trial', 'Viking']);
          handleRoles.add(member, 'Recruit');
        }
      }
      
      /**
      * 
      * Handle Viking role
      */
      if (command === 'viking' && (args[0].startsWith('<@') && args[0].endsWith('>'))) {
        let user = getUserFromMention(Client, args[0]);
        let member = message.guild.member(user);
        
        if (member) {
          handleRoles.remove(member, ['New user', 'Trial', 'Recruit']);
          handleRoles.add(member, 'Viking');
        }
      }
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

module.exports = { roleCommands };