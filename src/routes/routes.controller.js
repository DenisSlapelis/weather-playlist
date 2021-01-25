const router = require('express').Router();
const users = require('../webservices/users/user.controller');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../docs/swagger_output.json');

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

module.exports = router;