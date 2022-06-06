const express = require('express');
const router = express.Router();
const moment = require('moment');
const setup = require('../set');


const { User } = require('../Models/User');
const { auth } = require('../middleware/auth');
const { Report } = require('../Models/Report');
const { doc } = require('prettier');
const { Intake } = require('../Models/Intake');
const { FoodSelect } = require('../Models/FoodSelect');
const { BodyInfo } = require('../Models/BodyInfo');
const { Mission } = require('../Models/Mission');


router.get('/:id', auth, (req, res) => {
    var total_kcal = 0;
    var total_protein = 0;
    var total_fat = 0;
    var total_carbon = 0;
    var total_calcium = 0;
    var total_salt = 0;
    var total_vitaminC = 0;
    var _count = 0;
    var now = moment().format("YYYY-MM-DD");
    console.log(now);

    Intake.count({user_id : req.params.id, selectedAt : now }, function( err, count){
        _count = count;
        console.log(_count);
    });
    Intake.find({user_id : req.params.id, selectedAt : now}, (err, doc) => {
        if (err) return res.json(err);
        
        for (i = 0; i < _count ; i++) {
            total_kcal += doc[i].food.kcal;
            total_protein += doc[i].food.protein_g;
            total_fat += doc[i].food.fat_g;
            total_carbon += doc[i].food.carbon_g;
            total_calcium += doc[i].food.calcium_mg;
            total_salt += doc[i].food.salt_mg;
            total_vitaminC += doc[i].food.vitaminC_mg;
        }

        console.log(total_protein,total_fat,total_carbon, total_calcium,total_salt, total_vitaminC);
        BodyInfo.findOne({user_id : req.params.id}, (err, user) => {
            const user_kcal = user.user_kcal;
            console.log(user_kcal);
            Report.findOneAndUpdate({user_id : req.params.id}, 
                {$set : 
                    { 
                        intake_kcal : total_kcal,
                        carbon : total_carbon,
                        protein : total_protein,
                        fat: total_fat,
                        vitamin_C : total_vitaminC,
                        calcium : total_calcium,
                        salt : total_salt,
                        carbon_score : setup.getCarbonScore(user_kcal, total_carbon),
                        protein_score : setup.getProteinScore(user_kcal,total_protein),
                        fat_score: setup.getFatScore(user_kcal, total_fat),
                        vitamin_C_score : setup.getVitaminCScore(user_kcal, total_vitaminC),
                        calcium_score : setup.getCalciumScore(user_kcal, total_calcium),
                        salt_score : setup.getSaltScore(user_kcal, total_salt),
                        nutrition_score : setup.getNutritionScore(setup.getCarbonScore(user_kcal, total_carbon),setup.getProteinScore(user_kcal,total_protein), setup.getFatScore(user_kcal, total_fat),setup.getVitaminCScore(user_kcal, total_vitaminC),setup.getCalciumScore(user_kcal, total_calcium),setup.getSaltScore(user_kcal, total_salt))
                }}, {new: true}, (err, doc) => {
                    
                if(err) return res.json(err);
                return res.json({total : total_kcal, doc});
            });
        }).sort({updatedAt: -1});
    }).populate('food'); 
});



router.post('/lastMission/:id', auth, (req, res) => {
    Mission.find({user_id : req.params.id, mission_chosen: 'Y', selectAt : /req.body.date/}, (err, docs) => {
        var mission_count = docs.length;
        return res.json({mission_amount : mission_count, docs});
    }).select('user_id content mission_state performedAt').sort({performedAt : -1});

});

router.get('/getPerformanceRate/:id', auth, (req, res) => {
    var mission_count;
    var done_count;
    Mission.countDocuments({user_id : req.params.id, mission_chosen: 'Y', mission_state : 'done'}, (err, count) => {
        done_count = count;
        Mission.countDocuments({user_id : req.params.id, mission_chosen: 'Y'}, (err, count) => {
            mission_count = count;
            return res.json({performance_rate : Math.round(done_count/mission_count * 100) + "%", doneMission : done_count+"개", AllMission : mission_count + "개"});
        })
    })

})

module.exports = router;