function join(Client, Discord) {
  Client.on('ready', () => {
    console.log('Join script is ready!');
  });
  Client.on('guildMemberAdd', member => {
    const log = member.guild.channels.cache.find(channel => channel.name === 'log');
    const newUser = member.guild.channels.cache.find(channel => channel.name === 'new_user');

    if (!log || !newUser) return;

    const embed = new Discord.MessageEmbed({
      author: 'Member joined',
      color: '0x2ecc71',
      thumbnail: member.displayAvatarURL,
      fields: [
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
          value: (new Date(member.user.createdA)).toLocaleDateString(),
          inline: true
        }
      ],
      timestamp: new Date(),
      footer: {
        icon_url: member.user.displayAvatarURL,
      }
    });

    newUser.send(`Welcome to the server, ${member}`);
    log.send(embed);

  });

}
function leave(Client, Discord) {
  Client.on('ready', () => {
    console.log('Leave script is ready!');
    Client.on('guildMemberRemove', member => {
      const log = member.guild.channels.cache.find(channel => channel.name === 'log');

      if (!log) return;

      const embed = new Discord.MessageEmbed({
        author: 'Member left',
        color: '0xf44336',
        icon_url: "https://cdn.discordapp.com/embed/avatars/0.png",
        fields: [
          {
            name: "Name:",
            value: member.displayName,
            inline: true
          },
          {
            name: "ID:",
            value: member.id,
            inline: true
          }
        ]
      });
      log.send(embed);
    });
  });
}
module.exports = { join, leave };