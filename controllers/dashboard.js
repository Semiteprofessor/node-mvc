exports.dashboardView = (req, res, next) => {
  res.render("dashboard", { title: "Dashboard" });
};
