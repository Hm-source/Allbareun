const mongoose = require('mongoose'); // mongoose를 선언해주고,
const moment = require('moment');



const bodyInfoSchema = mongoose.Schema({  // userSchema라는 이름의 schema를 작성해준다. 
    user: {
        type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'
    },
    height: {
        type: Number,
    },
    weight: {
        type: Number,
    },
    age: {
        type: Number
    },
    bmi: {
        type: Number,
    },
    state: {
        type: String,
        // 'NO' -> normal , 'OV' -> overweight, 'OB' -> Obesity
    }, 
    updatedAt: {
        type:Date,
        default: moment().format("YYYY-MM-DD"),
        unique: 1
    }
});


const BodyInfo = mongoose.model('BodyInfo', bodyInfoSchema); 

module.exports = { BodyInfo }; 