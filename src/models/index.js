const dbConfig = require('../config/db.config.js');

const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.exam = require('./exam.model.js')(mongoose);
db.user = require('./user.model.js')(mongoose);
db.answer = require('./answer.model.js')(mongoose);
db.folder = require('./folder.model.js')(mongoose);
db.event = require('./event.model.js')(mongoose);
db.token = require('./token.model.js')(mongoose);
db.refreshToken = require('./refresh-token.model.js')(mongoose);
db.resetPasswordToken = require('./reset-password-token.model')(mongoose);

module.exports = db;
