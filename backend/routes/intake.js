const express = require('express');
const router = express.Router();

//user 모델을 가져옴
const { User } = require('../Models/User');
const { auth } = require('../middleware/auth');
const { BodyInfo } = require('../Models/BodyInfo');
const { Intake } = require('../Models/Intake');
const { Food } = require('../Models/Food');
const { Report } = require('../Models/Report');
const { ObjectId } = require('mongodb');
const { json } = require('body-parser');


router.post('/add', auth, async (req, res) => {
    Food.findOne( { name : req.body.name }, (err, food) => {
        if (err) return res.json({success : false});
        console.log(food);
        
        let newIntakeFood = new Intake({
            user: req.user._id,
            name : req.body.name,
            food: food
        });

        newIntakeFood.save((err, result)=> {
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

router.get('/list', auth, (req, res) => {
    var total_kcal = 0;
    Intake.find({user: req.user._id}, (err, doc) => {
        if (err) return res.json(err);
        
        for (i = 0; i < 2; i++) {
            total_kcal += doc[i].food.kcal;
            console.log(doc[i].food.kcal);
        }
        return res.json({total : total_kcal, doc});
    }).populate('food');
    
});



module.exports = router;