const express = require('express');
const router = express.Router();

//user 모델을 가져옴
const { User } = require('../Models/User');
const { auth } = require('../middleware/auth');
const { BodyInfo } = require('../Models/BodyInfo');
const { Intake } = require('../Models/Intake');
const { Food } = require('../Models/Food');
const { default: mongoose } = require('mongoose');
const connection = mongoose.connection;


router.post('/', auth, async (req, res) => {
    const fname = req.body.name;
    console.log(fname);
    Food.findOne({'식품명': fname}, (err, _food) => {
        const newIntakeFood = new Intake({
            user: req.user._id,
            name: req.body.name,
            food: _food
        });

        newIntakeFood.save(async (err, result)=> {
            if(err) {
                return res.status(400).send(err);
            }
            else {
                // NOTE => 식품명을 갖고 식품을 찾은 후에 Intake 모델의 food에다가 식품의 식품군, 영양성분 및 칼로리 등을 적는다.
                return res.json({
                    success: true,
                    result
                })
            }
        });
    })
    

    
});

router.get('/intakeFood/:id', (err, food) => {

});

module.exports = router;