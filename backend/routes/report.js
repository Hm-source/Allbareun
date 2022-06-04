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



router.get('/:id', auth, (req, res) => {
    var total_kcal = 0;
    var _count = 0;
    Intake.count({user:req.user._id}, function( err, count){
        _count = count;
    });
    Intake.find({user: req.user._id}, (err, doc) => {
        if (err) return res.json(err);
        
        for (i = 0; i < _count ; i++) {
            total_kcal += doc[i].food.kcal;
            console.log(doc[i].food.kcal);
        }
        Report.findOneAndUpdate({user: req.user._id}, {$set : { intake_kcal : total_kcal}}, (err, _kcal) => {
            return res.json({total : total_kcal, _kcal});
        });

    }).populate('food'); 
});
module.exports = router;