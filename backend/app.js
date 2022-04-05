// index.js
const express = require('express'); // express 임포트
const app = express(); // app생성
const port = 3000;
const cookieParser = require('cookie-parser');
const config = require('./config/key');

//user 모델을 가져옴
const { User } = require('./Models/User');

//body-parser 가 node.js 4.x 이후로 기본으로 제공된다.
//application/x-www-form-urlencoded
app.use(express.urlencoded({extended:true}));
//application/json
app.use(express.json());
app.use(cookieParser());


app.get('/', function (req, res) {
    res.send('hello world!!');
});

app.post('/api/user/register', (req, res) => {
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

//login router
app.post('/api/user/login', (req, res) => {
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
})


app.listen(port, () => console.log(`${port}포트입니다.`));

// 몽구스 연결
const mongoose = require('mongoose');
mongoose
    .connect(
    config.mongoURI ,
    )
    .then(() => console.log('MongoDB conected'))
    .catch((err) => {
    console.log(err);
});