const mongoose = require('mongoose'); // mongoose를 선언해주고,
const moment = require('moment');

const IntakeSchema = mongoose.Schema({  // userSchema라는 이름의 schema를 작성해준다. 
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
    selected_date: { // 식품 선택 날짜
        type: Date,
        default: moment().format("YYYY-MM-DD hh:mm:ss")
    },

});

const Intake = mongoose.model('Intake', IntakeSchema); 

module.exports = { Intake };