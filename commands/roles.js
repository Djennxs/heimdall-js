const { MessageEmbed } = require('discord.js');
const { handleRoles } = require('../Functions/roles');
const config = require('../config.json');

const definedRoles = ['New User', 'Trial', 'Recruit', 'Viking', 'Mercenary'];

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
        message.guild.members.fetch(`${config.logs.user}`).then(user => {
          const date = new Date(message.createdTimestamp).toLocaleString("nl-NL");
          const embed = new MessageEmbed()
          .setColor('0xff0000')
          .setTitle('Shit, fuck! Something went wrong!')
          .setDescription('You recieved this message because someone fucked up, which is probably us.\n\u200B');

          console.log(date);

          embed.addFields(
            {
              name: `Date and time:`,
              value: `${date.getDate()}-${date.getMonth()}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}\n\u200B`
            },
            {
              name: `Location:`,
              value: `<#${message.channel.id}>\n\u200B`
            },
            {
              name: `Error:`,
              value: `\`\`\`${error}\`\`\``
            }
          );

          user.send(embed);
        });
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

module.exports = { roleCommands };