const mysql = require('mysql');
const { connection } = require('../conn');

// Helpers
// const { stripProtectedFields } = require('../../helpers/stripProtectedFields');

const all = ({ limit, sort } = {}) => {
  // TODO: Use filtering
  return new Promise((res, rej) =>
    connection.query('SELECT * FROM Users', (error, results) => {
      if (error) rej(error);
      console.debug('all users -- ', results);

      return res(results);
    })
  );
};
const get = (args = {}) => {
  const { email } = args;
  return new Promise((res, rej) =>
    connection.query(
      mysql.format('SELECT FirstName, LastName, Email FROM Users WHERE Email = ?', [email]),
      (error, results) => {
        if (error) rej(error);
        console.debug('get user -- ', results[0]);
        res(results[0] || {});
      }
    )
  );
};
const checkCreds = (args = {}) => {
  const { email } = args;
  return new Promise((res, rej) =>
    connection.query(
      mysql.format('SELECT Password FROM Users WHERE Email = ?', [email]),
      (error, results) => {
        if (error) rej(error);
        console.debug('get user password -- ', results);
        res(results);
      }
    )
  );
};

const create = (args = {}) => {
  const { firstName, lastName, email, password } = args;
  const query = mysql.format(
    'INSERT INTO Users (FirstName, LastName, Email, Password) VALUES (?, ?, ?, ?)',
    [firstName, lastName, email, password]
  );
  return new Promise((res, rej) =>
    connection.query(query, (error, results) => {
      if (error) rej(error);
      console.debug('create user -- ', results);
      return res(results);
    })
  );
};

// Assumes all checks for password sameness have passed
const update = (args = {}) => {
  const { email, password } = args;
  //
  // Check that old password matches current password in query
  const query = mysql.format('UPDATE Users SET Password = ? WHERE Email = ?', [password, email]);
  return new Promise((res, rej) =>
    connection.query(query, (error, results) => {
      if (error) rej(error);
      console.debug('update user password -- ', results);
      return res(results);
    })
  );
};

module.exports = {
  all,
  get,
  create,
  update,
  checkCreds,
};
