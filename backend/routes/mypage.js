const express = require('express');
const router = express.Router();
const setup = require('../set');
//user 모델을 가져옴
const { User } = require('../Models/User');
const { auth } = require('../middleware/auth');
const { BodyInfo } = require('../Models/BodyInfo');


// NOTE 사용자 신체정보 등록
router.post('/body/:id', auth , (req, res) => {
    const _bmi = setup.checkBMI(req.body.weight, req.body.height);
    const _age = req.body.age;
    const _bmr = setup.checkBMR(req.body.height, req.body.weight, req.body.age, req.user.user_sex);
    console.log(_bmi, _age, setup.checkObesity(_bmi, _age));
    const newBodyInfo = new BodyInfo({
        user: req.user._id,
        height: req.body.height,
        weight: req.body.weight,
        age: _age,
        bmi: _bmi,
        bmr: _bmr,
        active_kcal: req.body.active_kcal,
        state: setup.checkObesity(_bmi, _age)
    });

    newBodyInfo.save(async (err, result)=> {
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
});

// NOTE 사용자 신체정보 조회 
router.get('/body/:id', auth, async (req,res) => {
    const bodyinfo = await BodyInfo.find({user: req.user._id});
    const user = await User.findOne({user_id : req.params.id}).select('name user_age user_sex');
    res.json({ user, bodyinfo});
});

// NOTE 신체정보 수정
router.patch('/body/:id', auth, (req, res) => {
    BodyInfo.findOneAndUpdate({user : req.user._id}, 
        {   weight: req.body.weight,
            height: req.body.height,
            bmi: setup.checkBMI(req.body.weight, req.body.height),
            age: req.body.age,
            state: setup.checkObesity(setup.checkBMI(req.body.weight, req.body.height), req.body.age),
            bmr: setup.checkBMR(req.body.height, req.body.weight, req.body.age, req.user.user_sex)
        }, (err, result) => {
        if (err) res.json({ success: false });
        res.json(result);
    });
});

module.exports = router;