const { timeStamp } = require('console');
const express = require('express');
const { uptime } = require('process');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        status: 'healthy',
        timeStamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

module.exports = router;