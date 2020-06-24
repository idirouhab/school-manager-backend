const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require("./models");
const swaggerUi = require("swagger-ui-express");
const YAML = require('yamljs');
const swaggerDocument = YAML.load("src/config/openapi.yml");
const helmet = require("helmet");
const fs = require("fs");
const path = require('path');

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

const corsOptions = {
  origin: process.env.TINAPTIC_WEB_URL,
  optionsSuccessStatus: 200,
};

const options = {
  customCssUrl: "https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-material.css"
};

app.use(helmet());
app.use(cors(corsOptions));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
app.use("/static", express.static("./public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ STATUS: "UP" });
});

const routesPath = path.join(__dirname, 'routes/');
const files = fs.readdirSync(routesPath);
files.forEach(file => {
  require(routesPath + file)(app);
});

module.exports = {
  app,
  db
};

