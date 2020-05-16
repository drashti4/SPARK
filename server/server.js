const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");



const app = express();
app.use(cors());
app.use(express.json());

const db = require("./app/models");
db.sequelize
  .sync
  //     {
  //     force: true
  // }).then(() => {
  //     console.log("Drop and re-sync db.");
  // }
  ();

app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// simple route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to node server application for Music library.",
  });
});

require("./app/routes/app.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
