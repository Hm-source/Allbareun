const express = require('express');
const router = express.Router();

//user 모델을 가져옴
const { User } = require('../Models/User');

router.post('/register', (req, res) => {
    //회원 가입할 때 필요한 정보들을 client에서 가져오면
    // 정보를 데이터베이스에 넣는다.
    const user = new User(req.body);
    // mongoDB의 save함수
    user.save((err, userInfo) => {
        // 성공 못하면 false와 err 보냄
        if(err) return res.json({ success: false, err});
        return res.status(200).json({
            success: true
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
                .json({loginSuccess: true, userId: user._id})

            })
        })
    
    })
});

module.exports = router;