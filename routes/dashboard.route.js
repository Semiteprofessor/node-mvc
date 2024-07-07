const express = require("express");
const dashboardController = require("../controllers/dashboard");
const { protectedRoute } = require("../controllers/auth");

const router = express.Router();
router.get("/", protectedRoute, dashboardController.dashboardView);

module.exports = router;
