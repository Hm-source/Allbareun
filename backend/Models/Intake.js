const mongoose = require('mongoose'); // mongoose를 선언해주고,
const moment = require('moment');
const { Report } = require('./Report');
const { json } = require('body-parser');

const intakeSchema = mongoose.Schema({  // userSchema라는 이름의 schema를 작성해준다. 
    user : {
        type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'
    },
    name : {
        type: String,
    },
    food : {
        type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Food'
    },
    _kcal : {
        type: String,
        maxLength: 150,
        trim: true,
    },
    selectedAt: { // 식품 선택 날짜
        type: Date,
        default: moment().format("YYYY-MM-DD hh:mm:ss")
    },

});


const Intake = mongoose.model('Intake', intakeSchema); 

module.exports = { Intake };