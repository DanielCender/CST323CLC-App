const { create, all, checkCreds, get, update } = require('./../db/users');
const { wrapError } = require('../helpers/err');
const bcrypt = require('bcrypt');

const createUserRoutes = (server) => {
  server.get('/api/user/:email', (req, res) =>
    wrapError(res, async () => {
      const result = await get({ email: req.params.email });
      res.json(result);
    })
  );
  server.get('/api/users', (_, res) =>
    wrapError(res, async () => {
      const result = await all();
      res.json(result);
    })
  );
  server.post('/api/user/auth', (req, res) =>
    wrapError(res, async () => {
      const { email, password } = req.body;
      try {
        const checkCredsResult = await checkCreds({ email }).catch((e) => e);
        const creds = (checkCredsResult || [{}])[0];
        bcrypt.compare(password, creds.Password, async (err, result) => {
          if (result) {
            // Password hashes match
            const user = await get({ email });
            return res.status(200).json({ authed: true, user }).end();
          } else {
            return res.status(500).json({ message: 'User login attempt failed!' });
          }
        });
      } catch (e) {
        res.status(500).json({ message: 'Auth attempt unsuccessful!' });
      }
    })
  );
  server.post('/api/user/create', (req, res) =>
    wrapError(res, async () => {
      const { firstName, lastName, email, password } = req.body;
      const createRes = await create({ firstName, lastName, email, password }).catch((e) => {
        console.log(e);
        return e;
      });
      if (createRes.affectedRows === 1) {
        const newUser = await get({ email });
        return res.json(newUser);
      }
      res.status(500).json({ message: 'User with that email already exists!' });
    })
  );
  server.post('/api/user/update', (req, res) =>
    wrapError(res, async () => {
      const { oldPassword, password, email } = req.body;
      try {
        // Check that oldPassword matches the "old password"
        const checkCredsResult = await checkCreds({ email }).catch((e) => {
          console.log(e);
          return e;
        });
        const creds = (checkCredsResult || [{}])[0];
        bcrypt.compare(oldPassword, creds.Password, async (err, result) => {
          console.log('pass: ', oldPassword, password, email);
          console.log('pass compare: ', err, result);
          if (result) {
            // Password hashes match
            const updateRes = await update({ email, password }).catch((e) => {
              console.log(e);
              return e;
            });
            if (updateRes.affectedRows === 1) {
              const updatedUser = await get({ email });
              return res.json(updatedUser);
            }
          } else {
            return res.status(500).json({ message: 'Old password does not match current one!' });
          }
        });
      } catch (e) {
        res.status(500).json({ message: 'Could not update User!' });
      }
    })
  );
};

module.exports = {
  createUserRoutes,
};
