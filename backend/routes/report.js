const express = require('express');
const router = express.Router();

//user 모델을 가져옴
const { User } = require('../Models/User');
const { auth } = require('../middleware/auth');
const { Report } = require('../Models/Report');
const { doc } = require('prettier');
const { Intake } = require('../Models/Intake');



router.get('/:id', auth, (req, res) => {

});

module.exports = router;