// User.js

const mongoose = require('mongoose'); // mongoose를 선언해주고,
const moment = require('moment');

const reportSchema = mongoose.Schema({  // userSchema라는 이름의 schema를 작성해준다. 
    users: {
        type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'
    },
    name: { 
        type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'
    },
    age: {
        type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'
    },
    kcal: {
        type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'
    },
    intake_kcal: {
        type: Number,
    },
    carbon : { // 탄수화물
        type: Number
    },
    protein: { // 단백질
        type: Number
    },
    fat: { // 지방
        type: Number
    },
    vitamin_C: { //비타민 C
        type: Number
    },
    vitamin_D: { // 비타민 D
        type: Number
    },
    calcium: { // 칼슘
        type: Number
    },
    zinc: { // 아연
        type: Number
    },
    magnesium: { // 마그네슘
        type: Number
    },
    salt: { // 나트륨
        type: Number
    },
    nutrition_score: {
        type: Number,
    },
    registeredAt: {
        type: Date,
        default: moment().format("YYYY-MM-DD hh:mm:ss")
    },
    updatedAt: {
        type: Date,
        default: moment().format("YYYY-MM-DD hh:mm:ss")
    }

});




const Report = mongoose.model('Report', reportSchema); 

module.exports = { Report }; 