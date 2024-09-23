const express = require("express");
const cors = require("cors");
const session = require("express-session");
require("dotenv").config();
const router = express.Router();

const cookieParser = require("cookie-parser");
const { connectToDb } = require("./db/connection");

const routes  = require("./routes/routes");

const app = express();
const port =
  process.env.NODE_ENV === "test"
    ? process.env.NODE_LOCAL_TEST_PORT
    : process.env.NODE_LOCAL_PORT;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true },
}));

// app.use("/user", routes);
app.use('/user', routes);
app.use('/task', routes)

connectToDb((err) => {
  if (err) {
    console.error('Failed to connect to the database. Server not started.');
    process.exit(1);
  } else {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  }
});

module.exports = app;
