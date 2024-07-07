const express = require("express");
const app = express();
const authRoutes = require("./routes/auth.route");
const dashboardRoutes = require("./routes/dashboard.route");
const db = require("./config/db");
const { init: initAuth } = require("./controllers/auth");
const passport = require("passport");
const session = require("express-session");

const PORT = 8090;

// Middleware
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "pug");
app.set("views", "views");

initAuth();
app.use(
  session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set secure to false for development environment, true for production environment.
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", authRoutes);
app.use("/", dashboardRoutes);

app.get("/", (req, res) => res.render("dashboard"));
app.get("/login", (req, res) => res.render("login"));
app.get("/register", (req, res) => res.render("register"));

db.sync({ force: false })
  .then(() => {
    console.log("Connection established successfully");
    app.listen(PORT, (req, res) => {
      console.log(`Listening to server on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
