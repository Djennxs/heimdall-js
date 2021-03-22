const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

const { MessageEmbed } = require('discord.js');
const { handleRoles } = require('./roles');

const join = (Client) => {
  Client.on('ready', () => {
    console.log('Join script is ready!');
  });

  Client.on('guildMemberAdd', member => {
    const channels = {
      log: member.guild.channels.cache.find(channel => channel.name === 'log'),
      newUser: member.guild.channels.cache.find(channel => channel.name === 'new_user')
    };

    if (!channels.log || !channels.newUser) return;

    const embed = new MessageEmbed()
    .setAuthor('Member joined')
    .setColor('0x2ecc71')
    .setTimestamp(new Date())
    .setDescription(member)
    .addFields(
      {
        name: "Name:",
        value: member.displayName,
        inline: true
      },
      {
        name: "ID:",
        value: member.id,
        inline: true
      },
      {
        name: "Account created:",
        value: (new Date(member.user.createdAt)).toLocaleDateString("en-GB", dateOptions),
        inline: true
      }
    )
    .setThumbnail(member.user.displayAvatarURL());

    let liabilityAmount = 0;
    const trialRole = member.guild.roles.cache.find(role => role.name === 'Trial');
    trialRole.members.map(trials => liabilityAmount++);

    const recruitRole = member.guild.roles.cache.find(role => role.name === 'Recruit');
    recruitRole.members.map(recruits => liabilityAmount++);

    if (liabilityAmount >= 12) {
      channels.newUser.send(`__**Welcome to Viking PMC, ${member}**__
Read more about us <https://www.vikingpmc.com/>
Check out who we are here: <https://youtu.be/njd8yIW-y4g>

**IMPORTANT NOTICE**
Due to the current rise in interest in our community we are temporarily suspending new applications while we provide support to our current batch of trial members. 

If you are still interested in applying to our unit, please do not leave the Discord as we will update you when the next positions are available.

**USEFUL INFO**
<#243066813456318475> - basic Discord information
<#653222699555880960> - Mods, documentation, IP-addresses
<#588310853904760833> - Ruleset for the unit

If there is anything else we can help you with, let us know in the chat below. We'll get back to you as soon as we can!`);
    } else {
      channels.newUser.send(`__**Welcome to VIKING PMC, ${member}!**__
Read more about us <https://www.vikingpmc.com/>
Check out who we are here: <https://youtu.be/njd8yIW-y4g>

**Apply to the unit**
Answer the questions below and join us for an operation to see if we are the right fit for you. <:vknlogo:440480020016922624>

    1. Are you over 18 years old?
    2. Are you currently part of another unit? 
      *(if yes, which one?)*
    3. Tell us about your previous experience in Arma
    4. Tell us a little bit about who you are 
      *(where are you from, hobbies etc)*
    5. Can you play on our operation times? 
      *(Tuesday & Thursday at 19:00 CET/CEST)*
    6. How did you find out about us?

Are you having trouble filling out the application?
Check out KayPee's application right here: <https://discordapp.com/channels/243066813456318475/243066813456318475/766246339154935859>

**USEFUL INFO**
<#243066813456318475> - basic Discord information
<#653222699555880960> - Mods, documentation, IP-addresses
<#588310853904760833> - Ruleset for the unit

If there is anything else we can help you with, let us know in the chat below. We'll get back to you as soon as we can!`);
    }
    
    channels.log.send(embed);

    handleRoles.add(member, 'New User');
  });

}
const leave = (Client) => {
  Client.on('ready', () => {
    console.log('Leave script is ready!');
  });

  Client.on('guildMemberRemove', member => {
    const channels = {
      log: member.guild.channels.cache.find(channel => channel.name === 'log'),
    };
    let message = 'Member left';

    if (member.delete) {
      message = 'Member kicked';
    }

    if (!channels.log) return;

    const embed = new MessageEmbed()
    .setAuthor(message)
    .setColor('0xf44336')
    .setTimestamp(new Date())
    .setDescription(member)
    .addFields(
      {
        name: "Name:",
        value: member.displayName,
        inline: true
      },
      {
        name: "ID:",
        value: member.id,
        inline: true
      },
      {
        name: "Account created:",
        value: (new Date(member.user.createdAt)).toLocaleDateString("en-GB", dateOptions),
        inline: true
      }
    )
    .setThumbnail(member.user.displayAvatarURL());

    channels.log.send(embed);
  });
}

module.exports = { join, leave };