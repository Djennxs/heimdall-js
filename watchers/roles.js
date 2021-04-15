const roleChange = (Client) => {
  Client.on('ready', () => {
    console.log('Role change watcher ready!');
  });
  
  Client.on('guildMemberUpdate', (oldMember, newMember) => {
    if (undefined === oldMember.roles.cache.find(role => role.name === 'Recruit') && undefined !== newMember.roles.cache.find(role => role.name === 'Recruit')) {
      console.log(`Recruit role added to ${newMember}!`);
    }
  });
}

module.exports = { roleChange };