const config = require('../../../config.json');
const mysql = require('mysql');
const atob = require('atob');

const { Client, Intents } = require('discord.js');

const Join = ({ req, res, next }) => {
  const client = new Client({ ws: { intents: Intents.ALL } });

  client.login(config.tokens[`${config.mode}`]);

  const pool = mysql.createPool({
    connectionLimit: 10,
    host: config.database.host,
    user: config.database.user,
    password: config.database.pass,
    database: config.database.name
  });

  pool.getConnection((err, connection) => {
    connection.query('SELECT `content_discord` FROM `messages` WHERE title = "welcome"', (err, result) => {
      connection.release();
      if (err) throw err;

      client.on('ready', () => {
        client.guilds.fetch(config.servers[`${config.mode}`])
        .then(guild => {
          let content = atob(result[0].content_discord);
      
          content = content.replaceAll(/\${member}/ig, `<@${req.body.memberID}>`);
          content = content.replaceAll(/#([a-z]+)/ig, (regex, capture) => {
            return `<#${guild.channels.cache.find(channel => channel.name === capture).id}>`;
          });
      
          guild.channels.cache.find(channel => channel.name === 'bot-test').send(content)
          .then(response => {
            client.destroy();

            res.send({
              status: 'success',
              message: 'Welcome message is successfully saved!'
            });
          })
          .catch(error => {
            res.send({
              status: 'error',
              message: `Something went wrong... Please contact KayPee on Discord.`
            });
          });
        });
      });
    });
  });
};

module.exports = { Join }