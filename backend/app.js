// index.js
const express = require('express'); // express 임포트
const app = express(); // app생성
const port = 3000;

const config = require('./config/key');

//user 모델을 가져옴
const { User } = require('./Models/User');

//body-parser 가 node.js 4.x 이후로 기본으로 제공된다.
//application/x-www-form-urlencoded
app.use(express.urlencoded({extended:true}));
//application/json
app.use(express.json());



app.get('/', function (req, res) {
    res.send('hello world!!');
});

app.post('/register', (req, res) => {
    //회원 가입할 때 필요한 정보들을 client에서 가져오면
    // 정보를 데이터베이스에 넣는다.
    const user = new User(req.body);
    // mongoDB의 save함수
    user.save((err, doc) => {
        // 성공 못하면 false와 err 보냄
        if(err) return res.json({ success: false, err});
        return res.status(200).json({
            success: true
        })
    })

});

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