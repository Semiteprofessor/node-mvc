const express = require("express");
const app = express();
const authRoutes = require("./routes/auth.route");
const dashboardRoutes = require("./routes/dashboard.route");

const PORT = 8090;

app.set("view engine", "pug");
app.set("views", "views");

// Middleware
app.use(express.json());

app.use("/", authRoutes);
app.use("/", dashboardRoutes);

app.get("/", (req, res) => res.render("dashboard"));
app.get("/login", (req, res) => res.render("login"));
app.get("/register", (req, res) => res.render("register"));

app.listen(PORT, (req, res) => {
  console.log(`Listening to server on port ${PORT}`);
});
