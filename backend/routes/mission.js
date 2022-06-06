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
const { FoodSelect } = require('../Models/FoodSelect');
const { Mission } = require('../Models/Mission');
const { BodyInfo } = require('../Models/BodyInfo');
const { ObjectId, FindCursor } = require('mongodb');

const now = moment().format('YYYY-MM-DD');

//부모한테 추천되는 미션들
router.get('/recommend/:id', auth, async (req, res) => {
    Report.find({user_id : req.params.id}, (err, doc) => {
        const carbon = doc[0].carbon_score;
        const protein = doc[0].protein_score;
        const fat = doc[0].fat_score;
        const salt = doc[0].salt_score;
        const calcium = doc[0].calcium_score;
        const vitamin_C = doc[0].vitamin_C_score;
        var arr = [{ name : "carbon_g", value : carbon}, {name :"protein_g", value : protein} , { name: "fat_g", value: fat} , {name: "salt_mg", value: salt} , {name: "calcium_mg", value: calcium} , {name: "vitamin_C_mg", value: vitamin_C}];

        var car;
        var pro;
        var fa;
        var sa;
        var cal;
        var vita;
        console.log(arr);

        if( arr[0].value <100 ) {
            car = Math.floor((doc[0].user_kcal* (Math.round(0.156843711775202*1000) / 1000))/4);
        } else {
            car = Math.floor((doc[0].user_kcal* (Math.round(0.156843711775202*1000) / 1000))/3);
        }

        if(arr[1].value <100) {
            pro = Math.floor((doc[0].user_kcal* (Math.round(0.0363479256208549*1000) / 1000))/4);
        } else {
            pro = Math.floor((doc[0].user_kcal* (Math.round(0.0363479256208549*1000) / 1000))/3);
        }

        if(arr[2].value <100) {
            fa = Math.floor((doc[0].user_kcal* (Math.round(0.0284252224753397*1000) / 1000))/4);
        } else {
            fa = Math.floor((doc[0].user_kcal* (Math.round(0.0284252224753397*1000) / 1000))/3);
        }

        if(arr[3].value <100) {
            sa = Math.floor((doc[0].user_kcal* (Math.round(1.42534591689017*1000) / 1000))/4);
        } else {
            sa = Math.floor((doc[0].user_kcal* (Math.round(1.42534591689017*1000) / 1000))/3);
        }

        if(arr[4].value <100) {
            cal = Math.floor((doc[0].user_kcal* (Math.round(0.28236693561962*1000) / 1000))/4);
        } else {
            cal = Math.floor((doc[0].user_kcal* (Math.round(0.28236693561962*1000) / 1000))/3);
        }

        if(arr[5].value <100) {
            vita = Math.floor((doc[0].user_kcal* (Math.round(0.0347768513427074*1000) / 1000))/3);
        } else {
            vita = Math.floor((doc[0].user_kcal* (Math.round(0.0347768513427074*1000) / 1000))/4);
        }
        console.log(car, fa, pro, cal, vita, sa);
        

        FoodSelect.find({ $and: [
            { $and: [{salt_mg: { $lte : sa}},{ fat_g : {$lte : fa} } ] },
            { $or: [{ carbon_g : {$lte : car} }, { vitaminC_mg : { $gte: vita } }, { calcium_mg: { $gte : cal} }, {protein_g: { $gte : pro}} ] },
        ] }).exec(function(err, docs) {
            if (err) return res.json(err);
            var _count = (docs.length)-1;
            console.log(_count); 
            var index1 = Math.floor((Math.random() * _count + 1));
            var index2 = Math.floor((Math.random() * _count + 1));
            var index3 = Math.floor((Math.random() * _count + 1));
            var index4 = Math.floor((Math.random() * _count + 1));
            var index5 = Math.floor((Math.random() * _count + 1));

            async function initMissions() {
                const mission1 = new Mission({
                    user : req.user._id,
                    user_id : req.params.id,
                    content : docs[index1],
                    selectedAt : now
                })
                const mission2 = new Mission({
                    user : req.user._id,
                    user_id : req.params.id,
                    content : docs[index2],
                    selectedAt : now
                })
                const mission3 = new Mission({
                    user : req.user._id,
                    user_id : req.params.id,
                    content : docs[index3],
                    selectedAt : now
                })
                const mission4 = new Mission({
                    user : req.user._id,
                    user_id : req.params.id,
                    content : docs[index4],
                    selectedAt : now
                })
                const mission5 = new Mission({
                    user : req.user._id,
                    user_id : req.params.id,
                    content : docs[index5],
                    selectedAt : now
                })
                const mission_arr = [mission1, mission2, mission3, mission4, mission5];
                try { 
                    await Mission.insertMany(mission_arr);
                } catch (e) {
                    console.log(e);
                }
            }
            initMissions();
            return res.json({
                user : req.user._id,
                child_id : req.user.partner_id,
                user_id : req.params.id,
                mission1 : docs[index1],
                mission2: docs[index2],
                mission3 : docs[index3],
                mission4 : docs[index4],
                mission5: docs[index5]
            });
        });
    })
});

//부모 미션 직접 추가

//부모가 미션 선택
router.post('/chooseMission', auth, (req, res) => {
    const contents = req.body.content;
    console.log(contents);
    console.log(contents.length);

    for (i=0; i<contents.length; i++) {
        console.log(contents[i].name);
        Mission.findOneAndUpdate({user:req.user._id, 'content.name' : contents[i].name , selectedAt : now, mission_chosen: 'N'}, 
        { mission_chosen : 'Y' }, {new : true}, (err, miss) => {
            console.log("mission_chosen" + i);
            console.log(miss);
        } );
    }
    Mission.find({user:req.user._id, mission_chosen: 'Y',selectedAt : now}, (err, docs) => {
        return res.json(docs);
    })
});

// 자녀한테 추천되는 미션
router.get('/showMission/:id', auth, (req, res) => {
    Mission.find({user_id : req.params.id, selectedAt : now, mission_chosen : 'Y'}, (err, docs) => {
        res.json(docs);
    })
});

// 자녀가 미션 수행하면 intake되게해야함.
router.post('/performMission/:id', auth, (req, res) => {
    const content = req.body.content;


    for (i=0; i<content.length; i++) {
        Mission.findOneAndUpdate({user_id : req.user._id, "content.name": content[i], selectedAt : now, mission_state: 'new', mission_chosen : 'Y'}, 
        { mission_state : 'done' }, {new : true}, (err, doc) => {
            console.log(doc.name);
            var newIntake = new Intake({
                user : req.user._id,
                user_id : req.params.id,
                name : content[0].name,
                mission : content[0]._id
            });
            newIntake.save( (err, result) => {
                return res.json(result);
            });
        });
    }
    
});

module.exports = router; 