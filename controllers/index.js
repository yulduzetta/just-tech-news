const router = require("express").Router();
const homeRoutes = require("./home-routes.js");
const dashboardRoutes = require("./dashboard-routes.js");

// Collects the packaged group of API endpoints and prefixing them with the path /api
const apiRoutes = require("./api");
const { route } = require("./home-routes.js");

router.use("/api", apiRoutes);
router.use("/", homeRoutes);
// Now all dashboard views will be prefixed with /dashboard. In dashboard-routes.js
router.use("/dashboard", dashboardRoutes);

// if we make a request to any endpoint that doesn't exist,
// we'll receive a 404 error indicating we have requested an incorrect resource,
// another RESTful API practice.
router.use((req, res) => {
  res.status(404).json({ message: "Wront route!" }).end();
});

module.exports = router;
