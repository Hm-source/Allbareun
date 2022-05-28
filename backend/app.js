// index.js
const express = require('express'); // express 임포트
const app = express(); // app생성
const port = 3000;

const cookieParser = require('cookie-parser');
const config = require('./config/key');



//body-parser 가 node.js 4.x 이후로 기본으로 제공된다.
//application/x-www-form-urlencoded
app.use(express.urlencoded({extended:true}));
//application/json
app.use(express.json());
app.use(cookieParser());


const userRouter = require('./routes/user');
const indexRouter = require('./routes/index');
const mypageRouter = require('./routes/mypage');

app.use('/', indexRouter);
app.use('/api/users/', userRouter);
app.use('/api/mypage/', mypageRouter);

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