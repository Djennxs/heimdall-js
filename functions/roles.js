let role;

const handleRoles = {
  add: (member, roleName) => {
    if (Array.isArray(roleName)) {
      roleName.forEach(name => {
        role = member.guild.roles.cache.find(role => role.name === name);
        
        if (role) {
          member.roles.add(role);
        }
      });
    } else {
      role = member.guild.roles.cache.find(role => role.name === roleName);
      
      if (role) {
        member.roles.add(role);
      }
    }
  },
  remove: (member, roleName) => {
    if (Array.isArray(roleName)) {
      roleName.forEach(name => {
        role = member.guild.roles.cache.find(role => role.name === name);
        
        if (role) {
          member.roles.remove(role);
        }
      });
    } else {
      role = member.guild.roles.cache.find(role => role.name === roleName);
      
      if (role) {
        member.roles.remove(role);
      }
    }
  }
};

module.exports = { handleRoles };