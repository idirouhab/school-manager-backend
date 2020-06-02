require('dotenv').config();
require('newrelic');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require("./app/models");

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

app.use(cors());
app.use('/static', express.static('./public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
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

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
