const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

const { MessageEmbed } = require('discord.js');
const { handleRoles } = require('./roles');
const config = require('../config.json');
const mysql = require('mysql');
const atob = require('atob');

const join = (Client) => {
  Client.on('ready', () => {
    console.log('Join script is ready!');
  });

  Client.on('guildMemberAdd', member => {
    member.guild.channels.cache.delete(true);

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

    const pool = mysql.createPool({
      connectionLimit : 10,
      host: config.database.host,
      user: config.database.user,
      password: config.database.pass,
      database: config.database.name
    });

    pool.getConnection((err, connection) => {
      connection.query('SELECT `content_discord` FROM `messages` WHERE title = "welcome"', (err, result) => {
        connection.release();
        if (err) throw err;

        let content = atob(result[0].content_discord);

        content = content.replaceAll(/\${member}/ig, member);
        content = content.replaceAll(/#([a-z]+)/ig, (regex, capture) => {
          return `<#${member.guild.channels.cache.find(channel => channel.name === capture).id}>`;
        });

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
          channels.newUser.send(content);
        }
        
        channels.log.send(embed);
        handleRoles.add(member, 'New User');
      });
    });
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