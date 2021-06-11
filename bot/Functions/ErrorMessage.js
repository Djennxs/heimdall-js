const { MessageEmbed } = require('discord.js');

const ErrorMessage = (error) => {
  message.guild.members.fetch(`${config.logs.user}`).then(user => {
    const date = new Date(message.createdTimestamp).toLocaleString("nl-NL");
    const embed = new MessageEmbed()
      .setColor('0xff0000')
      .setTitle('Shit, fuck! Something went wrong!')
      .setDescription('You recieved this message because someone fucked up, which is probably us.\n\u200B');

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
}

module.exports = { ErrorMessage }