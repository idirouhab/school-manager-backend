import dbConfig from "../config/db.config";

import mongoose from "mongoose";

mongoose.set("useCreateIndex", true);
mongoose.Promise = global.Promise;

let db: any = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.exam = require("./exam.model.js")(mongoose);
db.user = require("./user.model.js")(mongoose);
db.answer = require("./answer.model.js")(mongoose);
db.folder = require("./folder.model.js")(mongoose);
db.event = require("./event.model.js")(mongoose);
db.token = require("./token.model.js")(mongoose);
db.refreshToken = require("./refreshToken.model.js")(mongoose);

export default db;
