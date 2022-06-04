const express = require('express');
const router = express.Router();
const moment = require('moment');
const setup = require('../set');


const { User } = require('../Models/User');
const { auth } = require('../middleware/auth');
const { Report } = require('../Models/Report');
const { doc } = require('prettier');
const { Intake } = require('../Models/Intake');
const { Food } = require('../Models/Food');
const { BodyInfo } = require('../Models/BodyInfo');



router.get('/recommend', auth, (req, res) => {
    Report.find({user: req.user._id}, (err, doc) => {
        doc.
    });
});
module.exports = router;