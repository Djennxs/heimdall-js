const config = require('./../../config.json');

const WelcomeCommand = (Client) => {
  Client.on('ready', () => {
    console.log('Welcome command ready!');
  });
  
  Client.on('message', message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;
    
    // Set command and arguments of the command if they exist
    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    
    /**
    * 
    * Handle welcome message
    */
    if (command === 'welcome' && message.member.roles.cache.find(role => role.name === 'Personnel')) {
      message.channel.send(`__**Welcome to VIKING PMC**__
Down below you'll find some important information about the recruitment process in VKN. Don't be afraid to ask questions if you have any.
Setup for new users: <http://tiny.cc/VKN_Setup>

**Step 1**
Trials will be allowed to join 1-3 operations to determine if they wish continue with VKN. 
**Step 2**
Personnel will have a chat with Trials. If both parties think that you fit in VKN you will start your journey as a Recruit.
**Step 3**
A Personnel trainer will book a basic training session (unique to VKN). 
**Step 4**
Attend operations, have a good time and get active in Discord. You will naturally earn the rank VIKING.

Make sure to read <#243066813456318475>, <#653222699555880960> and <#588310853904760833>.`);

      // Remove the command message
      message.delete();
    }
  });
}

module.exports = { WelcomeCommand };