require("dotenv").config();
require("newrelic");
import express from "express";
import bodyParser from "body-parser";
import db from "./app/models";
import cors from "cors";

const app = express();

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
      console.log("Cannot connect to the database!", err);
      process.exit();
    }
  );

const corsOptions = process.env.NODE_ENV === "production" ? {
  origin: "https://tinaptic.com",
  optionsSuccessStatus: 200
} : {};

app.use(cors(corsOptions));
app.use("/static", express.static("./public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.json({});
});

require("./app/routes/exam.routes")(app);
require("./app/routes/login.routes")(app);
require("./app/routes/answer.route")(app);
require("./app/routes/folder.route")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/image.routes")(app);
require("./app/routes/document.route")(app);
require("./app/routes/event.routes")(app);
require("./app/routes/token.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
