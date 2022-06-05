// User.js

const mongoose = require('mongoose'); // mongoose를 선언해주고,
const moment = require('moment');

const reportSchema = mongoose.Schema({  // userSchema라는 이름의 schema를 작성해준다. 
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    user_id : {
        type: String
    },
    name: { 
        type:String
    },
    age: {
        type: Number
    },
    user_kcal: {
        type: Number
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
    carbon_score : { // 탄수화물
        type: Number
    },
    protein_score : { // 단백질
        type: Number
    },
    fat_score : { // 지방
        type: Number
    },
    vitamin_C_score : { //비타민 C
        type: Number
    },
    vitamin_D_score : { // 비타민 D
        type: Number
    },
    calcium_score : { // 칼슘
        type: Number
    },
    zinc_score : { // 아연
        type: Number
    },
    magnesium_score : { // 마그네슘
        type: Number
    },
    salt_score : { // 나트륨
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