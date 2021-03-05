const router = require("express").Router();

// Collects the packaged group of API endpoints and prefixing them with the path /api
const apiRoutes = require("./api");

router.use("/api", apiRoutes);

// if we make a request to any endpoint that doesn't exist,
// we'll receive a 404 error indicating we have requested an incorrect resource,
// another RESTful API practice.
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
