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
      thumbnail: member.avatar_url,
      fields: [
        {
          name: "ID:",
          value: member.id,
          inline: true
        },
        {
          name: "Account created:",
          value: (new Date(member.created_at)).toLocaleDateString(),
          inline: true
        }
      ]
    });

    newUser.send(`Welcome to the server, ${member}`);
    log.send(embed);
  });
  
}

module.exports = { join };