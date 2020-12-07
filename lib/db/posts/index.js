const mysql = require('mysql');
const { connection } = require('../conn');
const { v4: uuid } = require('uuid');

const all = ({ limit, sort, user } = {}) => {
  return new Promise((res, rej) =>
    connection.query(
      mysql.format(
        'SELECT * FROM GCU.Posts WHERE Deleted IS NULL' + (user ? ' AND Author = ?' : ''),
        user ? [user] : []
      ),
      (error, results) => {
        if (error) rej(error);
        console.debug('all posts -- ', results);
        res(results);
      }
    )
  );
};
const get = ({ id } = {}) => {
  return new Promise((res, rej) =>
    connection.query(
      mysql.format('SELECT * FROM GCU.Posts WHERE ID = ?', [id]),
      (error, results) => {
        if (error) rej(error);
        console.debug('get post -- ', results[0]);
        res(results[0] || {});
      }
    )
  );
};
const create = ({ title, content, author } = {}) => {
  const query = mysql.format(
    'INSERT INTO GCU.Posts (ID, Title, Content, Author, Created, Updated) VALUES (?, ?, ?, ?, ?, ?)',
    [uuid(), title, content, author, mysql.raw('NOW()'), mysql.raw('NOW()')]
  );
  return new Promise((res, rej) =>
    connection.query(query, (error, results) => {
      if (error) rej(error);
      console.debug('create post -- ', results);
      res(results);
    })
  );
};

const update = ({ id, title, content }) => {
  const query = mysql.format(
    'UPDATE GCU.Posts SET Title = ?, Content = ?, Updated = ? WHERE ID = ?',
    [title, content, mysql.raw('NOW()'), id]
  );
  return new Promise((res, rej) =>
    connection.query(query, (error, results) => {
      if (error) rej(error);
      console.debug('update post -- ', results);
      res(results);
    })
  );
};

const deleteItem = ({ id = '' } = {}) => {
  const query = mysql.format('UPDATE GCU.Posts SET Deleted = ? WHERE ID = ?', [
    mysql.raw('NOW()'),
    id,
  ]);
  return new Promise((res, rej) =>
    connection.query(query, (error, results) => {
      if (error) rej(error);
      console.debug('delete post -- ', results);
      res(results);
    })
  );
};

module.exports = {
  all,
  get,
  create,
  update,
  deleteItem,
};
