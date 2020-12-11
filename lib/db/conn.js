const mysql = require('mysql');

const connection = mysql.createConnection(process.env.JAWSDB_URL);

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
