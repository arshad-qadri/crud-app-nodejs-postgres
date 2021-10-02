const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const db = require("./models/index");
db.sequelize.sync();

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

var corsOptions = {
  origin: "http://localhost:5051",
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

require("./routes/routes")(app);

// simple route
app.get("/", (req, res) => {
  try {
    res.json({ message: "Welcome to bezkoder application." });
  } catch (err) {
    console.log(err);
  }
});

// set port, listen for requests
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
