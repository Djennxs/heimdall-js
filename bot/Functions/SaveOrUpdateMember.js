const config = require('./../../config.json');
const mysql = require('mysql');

const SaveOrUpdateMember = (member, author, role) => {

  // Database connection
  const pool = mysql.createPool({
    connectionLimit : 10,
    host: config.database.host,
    user: config.database.user,
    password: config.database.pass,
    database: config.database.name
  });

  console.log(member);
  
  pool.getConnection((err, connection) => {
    connection.query(`INSERT INTO members (discordId, discordName, rank, poc, createdAt) values (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE rank = ?, updatedAt = ?`, [member.id, `${member.user.username}#${member.user.discriminator}`, 'Trial', `${author.username}#${author.discriminator}`, new Date(), role, new Date()], (err, result) => {
      connection.release();
      if (err) throw err;


    });
  });
}

module.exports = { SaveOrUpdateMember };