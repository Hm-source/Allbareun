// User.js

const mongoose = require('mongoose'); // mongoose를 선언해주고,

const userSchema = mongoose.Schema({  // userSchema라는 이름의 schema를 작성해준다. 
    user_id: {
        type: String,
        maxLength: 50,
        trim: true, // space를 없애준다.
        unique: 1, // 같은값은 하나만 존재할 수 있다.
    },
    user_password: {
        type: String,
        maxLength: 60,
        trim: true,
    },
    name: { 
        type: String,
        maxLength: 50,
    },
    user_type: {
        type: String,
        enum: ['parent', 'child'],
        default: 'parent', 
    },
    user_age: {
        type: Number,
    },
    register_date: {
        type: Date,
        default: moment().format("YYYY-MM-DD hh:mm:ss")
    },
    token: {
        type: String,
    },
    tokenExp: {
        type: Number,
    },
});

const User = mongoose.model('User', userSchema); // userSchema를 model로 감싸준다. 

module.exports = { User }; // User라는 모델을 본 파일 밖에서도 사용할 수 있도록 export 구문을 작성해준다. 