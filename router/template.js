const express = require('express');
const router = express.Router();

// Shows "/router/"
router.get('/', (req, res) => {
    res.send("Router Test Home Page");
});

// Shows "/router/about/"
router.get("/about", (req, res) => {
    res.send("Router Test About Page");
});

module.exports = router;