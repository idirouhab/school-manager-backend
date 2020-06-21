require("dotenv").config();
require("newrelic");
const {app} = require("./src/app");
const PORT = process.env.PORT || 8080;
console.log("start");
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
