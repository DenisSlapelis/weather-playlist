const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../docs/swagger_output.json');
const users = require('../webservices/users/user.controller');
const playlists = require('../webservices/playlists/playlist.controller');

// Default root rules
router.post("/", (req, res) => {
    res.status(405).send("You can't request root. Choose another path.");
});

router.get("/", (req, res) => {
    res.status(405).send("You can't request root. Choose another path.");
});

// API Documentation
router.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// API Routes
router.use('/users', users);
router.use('/playlists', playlists);

module.exports = router;