const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/allbareun_agree.html');
});

module.exports = router;