const config = require('../config.json');

const { MessageEmbed } = require('discord.js');

const commandList = {
  help: {
    title: 'Help menu',
    command: 'vkn?help',
    description: 'Shows this little menu to help you with your adventures.',
    access: [
      'All'
    ]
  },
  welcome: {
    title: 'Welcome message',
    command: 'vkn?welcome',
    description: 'Lets Heimdall send a message with the basic information, needed for new trials.',
    access: [
      'Personnel',
      'Heads of Departments'
    ]
  },
  trial: {
    title: 'Add trial role',
    command: 'vkn?trial @mention',
    description: 'Removes any class roles, adds the trial role.',
    access: [
      'Personnel',
      'Heads of Departments'
    ]
  },
  recruit: {
    title: 'Add recruit role',
    command: 'vkn?recruit @mention',
    description: 'Removes any class roles, adds the recruit role.',
    access: [
      'Personnel',
      'Heads of Departments'
    ]
  },
  viking: {
    title: 'Add viking role',
    command: 'vkn?viking @mention',
    description: 'Removes any class roles, adds the viking role.',
    access: [
      'Personnel',
      'Heads of Departments'
    ]
  },
  mercenary: {
    title: 'Add mercenary role',
    command: 'vkn?mercenary @mention',
    description: 'Removes any class roles, adds the mercenary role.',
    access: [
      'Personnel',
      'Heads of Departments'
    ]
  }
}

const helpCommand = (Client) => {
  Client.on('ready', () => {
    console.log('Help commands ready!');
  });
  
  Client.on('message', message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;
    
    // Set command and arguments of the command if they exist
    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    
    if (command === 'help') {
      const embed = new MessageEmbed()
      .setColor('0x3498db')
      .setTitle('Help Menu')
      .setDescription('This is the help menu based on your restrictions.\n\u200B');

      for (const [command, options] of Object.entries(commandList)) {
        if (message.member.roles.cache.find(role => options.access.includes(role.name) || options.access.includes('All'))) {
          embed.addFields({
              name: `${options.title} (${options.command})`,
              value: options.description + '\n\u200B'
            }
          );
        }
      }

      embed.addField(
        '\u200B',
        'Please refrain from abusing any of the commands.',
      );

      message.channel.send(embed);
    }
  });
}

module.exports = { helpCommand };