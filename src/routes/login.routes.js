module.exports = app => {
  const login = require('../controllers/login.controller.js');
  const router = require('express').Router();
  router.post('/', login.create);
  router.post('/confirmation/', login.confirmation);
  router.get('/', login.findOne);
  app.use('/login', router);
};
