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



router.get('/:id', auth, (req, res) => {
    var total_kcal = 0;
    var total_protein = 0;
    var total_fat = 0;
    var total_carbon = 0;
    var total_calcium = 0;
    var total_salt = 0;
    var total_vitaminC = 0;
    var _count = 0;

    Intake.count({user:req.user._id}, function( err, count){
        _count = count;
    });
    Intake.find({user: req.user._id}, (err, doc) => {
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
        BodyInfo.findOne({user: req.user._id}, (err, user) => {
            const user_kcal = user.user_kcal;
            Report.findOneAndUpdate({user: req.user._id}, 
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
                        nutrition_score: setup.getNutritionScore( setup.getCarbonScore(user_kcal, total_carbon),setup.getProteinScore(user_kcal,total_protein),setup.getFatScore(user_kcal, total_fat),setup.getVitaminCScore(user_kcal, total_vitaminC),setup.getCalciumScore(user_kcal, total_calcium),setup.getSaltScore(user_kcal, total_salt))
                }}, {new: true}, (err, doc) => {
                if(err) return res.json(err);
                return res.json({total : total_kcal, doc});
            });
        });
    }).populate('food'); 
});
module.exports = router;