// User.js

const mongoose = require('mongoose'); // mongoose를 선언해주고,
const moment = require('moment');
const bcrypt = require('bcrypt');
const salt_rounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({  // userSchema라는 이름의 schema를 작성해준다. 
    user_id: {
        type: String,
        maxLength: 50,
        trim: true, // space를 없애준다.
        unique: 1,
        required:true // 같은값은 하나만 존재할 수 있다.
    },
    user_password: {
        type: String,
        maxLength: 60,
        trim: true,
        required:true
    },
    name: { 
        type: String,
        maxLength: 50,
        required:true
    },
    user_type: {
        type: String,
        enum: ['parent', 'child', 'admin'],
        required:true
    },
    user_age: {
        type: Number,
        required:true
    },
    user_sex: {
        type: String,
        enum: [ 'M', 'F'], //Male, Female
        required:true
    },
    user_height: {
        type: Number,
    },
    user_weight: {
        type: Number,
    },
    user_bmi: {
        type: Number,
    },
    user_state: {
        type: String,
        enum: ['NO','OV','OB'],
        default : 'NO',
        // 'NO' -> normal , 'OV' -> overweight, 'OB' -> Obesity
    }, 
    register_date: {
        type: Date,
        default: moment().format("YYYY-MM-DD hh:mm:ss")
    },
    partner_id: {
        type: String,
        default: "",
    },
    token: {
        type: String,
    },
    tokenExp: {
        type: Number,
    },
});

userSchema.pre('save', function( next ) {
    var user = this;
    if(user.isModified('user_password')){
        //비밀번호를 암호화 시킨다.
        bcrypt.genSalt(salt_rounds, function(err, salt) {
            if(err) return next(err)

            bcrypt.hash(user.user_password, salt, function(err, hash) {
                if(err) return next(err)
                // user password를 hash로 만들어줌.
                user.user_password = hash;
                next()
            })
        })
    } else {
        next()
    }
})


userSchema.methods.comparePassword = function(plainPassword, cb) {
    //plainPassword, 암호화된 비밀번호
    bcrypt.compare(plainPassword, this.user_password, function(err, isMatch) {
        if(err) return cb(err);
        cb(null, isMatch);
    })
}

userSchema.methods.generateToken = function(cb) {
    var user = this;
    console.log('user._id', user._id);
    //jsonwebtoken을 이용해서 token을 생성한다.
    var token = jwt.sign(user._id.toHexString(), 'secretToken')

    user.token = token;
    user.save(function(err, user) {
        if(err) return cb(err);
        cb(null, user);
    });
};

userSchema.statics.findByToken = function(token, cb) {
    var user = this;
    //토큰을 decode한다. user._id +'' = token
    jwt.verify(token, 'secretToken', (_err, decoded) => {
            //user id를 이용해서 user를 찾은 다음에
            //client에서 가져온 token과 db에 보관된 token이 일치하는지 확인
            user.findOne({ "_id": decoded, "token": token }, (_err, user) => {
                if (_err)
                    return cb(_err);
                cb(null, user);
            });

        });
};




const User = mongoose.model('User', userSchema); // userSchema를 model로 감싸준다. 

module.exports = { User }; // User라는 모델을 본 파일 밖에서도 사용할 수 있도록 export 구문을 작성해준다. 