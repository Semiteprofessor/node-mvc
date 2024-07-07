exports.dashboardView = (req, res, next) => {
  res.render("dashboard", { name: req.user.name });
};
