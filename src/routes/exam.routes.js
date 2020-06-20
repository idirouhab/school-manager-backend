const { verifyToken } = require('../middleware/auth.middleware');

module.exports = app => {
  const exam = require('../controllers/exam.controller.js');
  const router = require('express').Router();
  router.post('/', [verifyToken], exam.create);
  router.get('/', [verifyToken], exam.findAll);
  router.get('/:id', exam.findOne);
  router.put('/:id', [verifyToken], exam.update);
  router.delete('/:id', [verifyToken], exam.delete);
  app.use('/api/exam', router);
};
