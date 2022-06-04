const express = require('express');
const router = express.Router();
const setup = require('../set');
const moment = require('moment');

//user 모델을 가져옴
const { User } = require('../Models/User');
const { auth } = require('../middleware/auth');
const { BodyInfo } = require('../Models/BodyInfo');
const { Report } = require('../Models/Report');


// NOTE 사용자 신체정보 등록
router.post('/body/:id', auth , (req, res) => {
    const _bmi = setup.checkBMI(req.body.weight, req.body.height);
    const _age = req.body.age;
    const _active_kcal = req.body.active_kcal;
    const _bmr = setup.checkBMR(req.body.height, req.body.weight, req.body.age, req.user.user_sex);
    const _kcal = setup.checkUserKcal(setup.checkObesity(_bmi, _age), _bmr, _active_kcal);
    console.log(_bmi, _age, setup.checkObesity(_bmi, _age));
    BodyInfo.findOne({ user: req.user._id, updatedAt: moment().format('YYYY-MM-DD')}, (err, doc) => {
        if (doc != null) {return res.json( { message: "오늘 신체 정보는 다시 입력하기에서 수정하세요.", doc});}
        else {
            const newBodyInfo = new BodyInfo({
                user: req.user._id,
                height: req.body.height,
                weight: req.body.weight,
                age: _age,
                bmi: _bmi,
                bmr: _bmr,
                active_kcal: _active_kcal,
                user_kcal: _kcal,
                state: setup.checkObesity(_bmi, _age)
            });
            const newReport = new Report( {
                user: req.user._id,
                age: _age,
                name: req.user.name,
                user_kcal: _kcal
            });
            newReport.save((result) => {
            });
            newBodyInfo.save((err, result)=> {
                if(err) {
                    return res.status(400).send(err);
                }
                else {
                    return res.json({
                        success: true,
                        result
                    })
                }
            });
        } 
    });
        
    
});


// NOTE 사용자 신체정보 조회 
router.get('/body/:id', auth, async (req,res) => {
    const bodyinfo = await BodyInfo.find({user: req.user._id});
    const user = await User.findOne({user_id : req.params.id}).select('name user_age user_sex');
    res.json({ user, bodyinfo});
});

// NOTE 신체정보 수정
router.patch('/body/:id', auth, (req, res) => {
    BodyInfo.findOneAndUpdate({user : req.user._id, updatedAt : moment().format('YYYY-MM-DD') }, 
        {   weight: req.body.weight,
            height: req.body.height,
            bmi: setup.checkBMI(req.body.weight, req.body.height),
            age: req.body.age,
            active_kcal: req.body.active_kcal,
            user_kcal: setup.checkUserKcal(setup.checkObesity(setup.checkBMI(req.body.weight, req.body.height), req.body.age), setup.checkBMR(req.body.height, req.body.weight, req.body.age, req.user.user_sex), req.body.active_kcal),
            state: setup.checkObesity(setup.checkBMI(req.body.weight, req.body.height), setup.checkBMR(req.body.height, req.body.weight, req.body.age, req.user.user_sex) ,req.body.age),
            bmr: setup.checkBMR(req.body.height, req.body.weight, req.body.age, req.user.user_sex)
        }, {new: true}, (err, result) => { // {new :true} -> 업데이트된 문서 한 번에 반환, 안해주면 다음에 반환함.
        if (err) res.json({ success: false });
        res.json(result);
    });
});

module.exports = router;

