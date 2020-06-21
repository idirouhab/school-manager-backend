const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require("./models");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./config/openapi.json");
const helmet = require("helmet");

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch(err => {
      console.log("Cannot connect to the database!", err);
      process.exit();
    },
  );

const corsOptions = process.env.NODE_ENV === "production" ? {
  origin: "https://tinaptic.com",
  optionsSuccessStatus: 200,
} : {};

const options = {
  customCssUrl: "https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-material.css"
};

app.use("/api-docs", function (req, res, next) {
  swaggerDocument.host = req.get("host");
  next();
}, swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

app.use(cors(corsOptions));
app.use(helmet());
app.use("/static", express.static("./public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.json({});
});

require("./routes/exam.routes")(app);
require("./routes/login.routes")(app);
require("./routes/answer.routes")(app);
require("./routes/folder.routes")(app);
require("./routes/user.routes")(app);
require("./routes/image.routes")(app);
require("./routes/document.route")(app);
require("./routes/event.routes")(app);
require("./routes/token.routes")(app);

module.exports = {
  app,
  db
};

