const express = require("express");
const dashboardController = require("../controllers/dashboard");

const router = express.router();
router.get("/", dashboardController.dashboardView);

module.exports = router;
