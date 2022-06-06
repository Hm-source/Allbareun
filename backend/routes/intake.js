const express = require('express');
const router = express.Router();

//user 모델을 가져옴
const { User } = require('../Models/User');
const { auth } = require('../middleware/auth');
const { BodyInfo } = require('../Models/BodyInfo');
const { Intake } = require('../Models/Intake');
const { Food } = require('../Models/Food');
const { FoodSelect } = require('../Models/FoodSelect');
const { Report } = require('../Models/Report');
const { ObjectId } = require('mongodb');
const { json } = require('body-parser');
const moment = require('moment');
const now = moment().format('YYYY-MM-DD');

router.post('/add/:id', auth, async (req, res) => {
    FoodSelect.findOne( { name : req.body.name }, (err, food) => {
        if (err) return res.json({success : false});
        console.log(food);
        
        let newIntakeFood = new Intake({
            user: req.user._id,
            user_id : req.params.id,
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

router.get('/list/:id', auth, (req, res) => {
    var total_kcal = 0;

    Intake.find({user_id: req.params.id}, (err, doc) => {
        if (err) return res.json(err);
        var num = doc.length;
        if (num == 0 ) {return res.json({message : '먹은 음식이 없습니다.'})};
        console.log(num);
        for (i = 0; i < num; i++) {
            if ( doc[i].selectedAt == now) {
                total_kcal += doc[i].food.kcal; 
            }  
        }
        console.log("오늘 먹은 음식의 칼로리는 " + total_kcal);
        return res.json({total : total_kcal, doc});
    }).populate('food');
    
});



module.exports = router;