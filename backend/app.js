// index.js
const express = require('express'); // express 임포트
const app = express(); // app생성
const port = 3000;

app.get('/', function (req, res) {
    res.send('hello world!!');
});

app.listen(port, () => console.log(`${port}포트입니다.`));

// 몽구스 연결
const mongoose = require('mongoose');
mongoose
    .connect(
    'mongodb+srv://hyomin:gFsWgeC2Tpk4YNr@allbareun-cluster.m2ki4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    )
    .then(() => console.log('MongoDB conected'))
    .catch((err) => {
    console.log(err);
});