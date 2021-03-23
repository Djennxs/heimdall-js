const config = require('../config.json');
const { MessageEmbed } = require('discord.js');

const faqCommand = (Client) => {
  Client.on('ready', () => {
      console.log('Help command ready!');
  });
  
  Client.on('message', message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    
    if (args.length > 0 && message.member.roles.cache.find(role => role.name == 'Personnel')) {
      if (command === 'faq' && (args[0].startsWith('<@') && args[0].endsWith('>'))) {
        getUserFromMention(Client, args[0]).createDM().then(channel => {
          channel.send('Hello there! Here is a FAQ for Viking PMC, to guide you through the installation, common questions, or similar.');
        });
      }
    }
  });

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
}


module.exports = { faqCommand };