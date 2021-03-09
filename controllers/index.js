const router = require("express").Router();
const homeRoutes = require("./home-routes.js");

// Collects the packaged group of API endpoints and prefixing them with the path /api
const apiRoutes = require("./api");

router.use("/api", apiRoutes);
router.use("/", homeRoutes);

// if we make a request to any endpoint that doesn't exist,
// we'll receive a 404 error indicating we have requested an incorrect resource,
// another RESTful API practice.
router.use((req, res) => {
  res.status(404).json({ message: "Wront route!" }).end();
});

module.exports = router;
