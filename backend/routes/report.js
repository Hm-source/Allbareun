const express = require('express');
const router = express.Router();
const moment = require('moment');
//user 모델을 가져옴
const { User } = require('../Models/User');
const { auth } = require('../middleware/auth');
const { Report } = require('../Models/Report');
const { doc } = require('prettier');
const { Intake } = require('../Models/Intake');



router.get('/:id', auth, (req, res) => {
    Intake.aggregate({ $group : { user: req.user._id , $gte: {selectedAt : moment().format('YYYY-MM-DD')}} }, (err, doc) => {
    })
});

module.exports = router;