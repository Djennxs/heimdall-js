const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

function join(Client, Discord) {
  Client.on('ready', () => {
    console.log('Join script is ready!');
  });

  Client.on('guildMemberAdd', member => {
    const log = member.guild.channels.cache.find(channel => channel.name === 'log');
    const newUser = member.guild.channels.cache.find(channel => channel.name === 'new_user');

    if (!log || !newUser) return;

    const embed = new Discord.MessageEmbed()
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

    newUser.send(`__**Welcome to VIKING PMC, ${member}!**__
Read more about us <https://www.vikingpmc.com/>

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

**USEFUL INFO**
<#243066813456318475> - basic Discord information
<#653222699555880960> - Mods, documentation, IP-addresses
<#588310853904760833> - Ruleset for the unit

If there is anything else we can help you with, let us know in the chat below. We'll get back to you as soon as we can!`);
    
    log.send(embed);
  });

}
function leave(Client, Discord) {
  Client.on('ready', () => {
    console.log('Leave script is ready!');
  });

  Client.on('guildMemberRemove', member => {
    const log = member.guild.channels.cache.find(channel => channel.name === 'log');
    let message = 'Member left';

    if (member.delete) {
      message = 'Member kicked';
    }

    if (!log) return;

    const embed = new Discord.MessageEmbed()
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

    log.send(embed);
  });
}

module.exports = { join, leave };