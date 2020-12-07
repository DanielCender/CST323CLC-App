const { create, update, get, all, deleteItem } = require('./../db/posts');
const { wrapError } = require('../helpers/err');

const createPostRoutes = (server) => {
  server.get('/api/post/:id', (req, res) =>
    wrapError(res, async () => {
      const result = await get({ id: req.params.id });
      res.json(result);
    })
  );
  server.get('/api/posts', (req, res) =>
    wrapError(res, async () => {
      const result = await all();
      res.json(result);
    })
  );
  server.get('/api/posts/:user', (req, res) =>
    wrapError(res, async () => {
      const result = await all({ user: req.params.user });
      res.json(result);
    })
  );
  server.post('/api/posts/create', (req, res) =>
    wrapError(res, async () => {
      const { title, content, author } = req.body;
      const newPost = await create({ title, content, author });
      res.json(newPost);
    })
  );
  server.post('/api/posts/update', (req, res) =>
    wrapError(res, async () => {
      const { title, content, id } = req.body;
      const updatedPost = await update({ id, title, content });
      res.json(updatedPost);
    })
  );
  server.post('/api/posts/delete/:id', (req, res) =>
    wrapError(res, async () => {
      const deletedPost = await deleteItem({ id: req.params.id });
      res.json(deletedPost);
    })
  );
};

module.exports = {
  createPostRoutes,
};
