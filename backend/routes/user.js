const express = require('express');
const router = express.Router();

//user 모델을 가져옴
const { User } = require('../Models/User');
const { auth } = require('../middleware/auth');

const moment = require('moment');


router.post('/register', (req, res) => {
    //회원 가입할 때 필요한 정보들을 client에서 가져오면
    // 정보를 데이터베이스에 넣는다.
    const user = new User(req.body);
    // mongoDB의 save함수
    user.save((err, userInfo) => {
        // 성공 못하면 false와 err 보냄
        if(err) return res.json({ success: false, err});
        return res.status(200).json({
            success: true, userInfo
        })
    })
});



router.post('/login', (req, res) => {
    //요청된 id을 데이터베이스에서 있는지 찾는다.
    User.findOne( { user_id: req.body.user_id}, (err, user) => {
        if(!user) {
            return res.json({
                loginSucess: false,
                message: "제공된 아이디에 해당하는 사용자가 없습니다."
            })
        }
    
        //요청한 id가 데이터베이스에 있다면 비밀 번호가 맞는 비밀번호 인지 확인
        user.comparePassword(req.body.user_password, (err, isMatch) => {
            if(!isMatch)
                return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다."})
            // 비밀번호까지 맞다면 토큰을 생성한다.

            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);
                //토큰을 저장한다. 쿠키? local storage? 일단 쿠키에
                res.cookie("x_auth", user.token)
                .status(200)
                .json({loginSuccess: true, userId: user._id, user_type: user.user_type, partner: user.partner_id, pairing: user.pairing })

            })
        })
    
    })
});

//auth 미들웨어 추가
router.get('/auth', auth , (req, res) => {
    //미들웨어 통과해 왔다는 이야기는 Authentication이 true라는 말이다.
    // user_type이 child이면 지녀 유저, parent이면 부모 유저.
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.user_type === 'child' ? false : true,
        isAuth: true,
        user_id: req.user.user_id,
        name : req.user.name,
        user_age: req.user.user_age,
        type: req.user.user_type,
    })
});

//NOTE logout
router.get('/logout', auth ,(req, res) => {
    User.findOneAndUpdate({ _id: req.user._id },
        { token: "" },
        (err, user) => {
            if(err) return res.json({ success: false, err });
            return res.status(200).json({ success: true });
        });
});

// NOTE 사용자 부모, 자녀 등록
router.patch('/partner',auth, (req, res) => {
    User.findOne( { user_id: req.body.user_id}, (err, user) => {
        if(err) return res.json( {success:false, err});
        console.log("사용자 찾기");
        if(!user) {
            return res.json({
                success: false,
                message: "입력하신 아이디에 해당하는 사용자가 없습니다."
            })
        } else {
            console.log("찾았으면");
            // NOTE 성공
            User.updateOne({ _id: req.user._id }, { $set: { partner_id : req.body.user_id, pairing: true }} ,(err, doc) => {
                    if(err) return res.json( {success: false, err});
                    return res.status(200).json({success:true, user_id : req.user.user_id , partner_id: req.body.user_id , user_type: req.user.user_type, partner_type : user.user_type});
                })  
        }
    })
});

// bmi function
function BMI(weight, height) {
    return(Math.round((weight / (height * height))*1000000)/100);
}




module.exports = router;