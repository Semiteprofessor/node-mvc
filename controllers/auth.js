const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const passport = require("passport");
const LocalStrategy = require("passport-local");

exports.registerView = (req, res, next) => {
  res.render("register", { title: "Register" });
};

exports.loginView = async (req, res, next) => {
  res.render("login", { title: "Login" });
};

exports.registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.render("register", { error: "Please fill all fields." });
  }

  if (await User.findOne({ where: { email } })) {
    return res.render("register", { error: "Email already exists." });
  }

  await User.create({
    name: name,
    email: email,
    password: bcrypt.hashSync(password, 8),
  });
  res.redirect("login?registrationdone");
};

exports.loginUser = (req, res) => {
  passport.authenticate("local", {
    successRedirect: "/?loginsuccess",
    failureRedirect: "/login?error",
  })(req, res);
};

exports.logoutUser = async (req, res, next) => {
  req.logout(() => res.redirect("/login?loggedout"));
};

exports.init = (req, res) => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        const user = await User.findOne({ where: { email } });
        if (!user) return done(null, false);
        if (!bcrypt.compareSync(password, user.password))
          return done(null, false);
        return done(null, user);
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.findOne({ where: { id } });
    done(null, user);
  });
};

exports.protectedRoute = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login?next=" + req.url);
};
