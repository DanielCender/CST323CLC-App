const mysql = require('mysql');

console.log({
  host: process.env.JAWSDB_URL || 'example.org',
  user: process.env.DB_USER || 'bob',
  password: process.env.DB_PASSWORD || 'secret',
  database: process.env.DB_NAME || 'db',
});

const connection = mysql.createConnection({
  host: process.env.JAWSDB_URL || 'example.org',
  user: process.env.DB_USER || 'bob',
  password: process.env.DB_PASSWORD || 'secret',
  database: process.env.DB_NAME || 'db',
});

const connect = () =>
  connection.connect(function (err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }

    console.log('connected as id ' + connection.threadId);
  });

module.exports = {
  connect,
  connection,
};
