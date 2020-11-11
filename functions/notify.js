const MySQLEvents = require('mysql-events');
const config = require('./../config.json');

const login = {
    host: config.database.host,
    user: config.database.user,
    password: config.database.pass
}

const mysqlEventWatcher = MySQLEvents(login);

function training(Client, Discord) {
    const log = Client.channels.cache.find(channel => channel.name === 'log');


    let watcher = mysqlEventWatcher.add(
        'heimdall.users.id.value',

        (oldRow, newRow, event) => {
            if (oldRow === null) {
                console.log('test');
                log.send('test');
            }

            console.log(event);
        },
        '[0-9]+'
    )
}

module.exports = { training }