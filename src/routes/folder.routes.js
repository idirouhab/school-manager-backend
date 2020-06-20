const { verifyToken } = require('../middleware/auth.middleware');

module.exports = app => {
  const folder = require('../controllers/folder.controller.js');
  const router = require('express').Router();
  router.post('/', [verifyToken], folder.create);
  router.get('/:id', [verifyToken], folder.findOne);
  router.get('/', [verifyToken], folder.findAll);
  router.delete('/:id', [verifyToken], folder.delete);
  router.put('/:id', [verifyToken], folder.update);
  app.use('/api/folder', router);
};
