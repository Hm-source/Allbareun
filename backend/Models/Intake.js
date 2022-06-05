const mongoose = require('mongoose'); // mongoose를 선언해주고,
const moment = require('moment');
const { Report } = require('./Report');
const { json } = require('body-parser');
const { checkBMI } = require('../set');

const intakeSchema = mongoose.Schema({  // userSchema라는 이름의 schema를 작성해준다. 
    user : {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    user_id : {
        type : String
    },
    name : {
        type: String,
    },
    food : {
        type: mongoose.Schema.Types.ObjectId, ref: 'Food'
    },
    selectedAt: { // 식품 선택 날짜
        type: Date,
        default: moment().format("YYYY-MM-DD")
    }
});




const Intake = mongoose.model('Intake', intakeSchema); 

module.exports = { Intake };