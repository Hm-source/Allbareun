const mongoose = require('mongoose'); // mongoose를 선언해주고,
const moment = require('moment');



const bodyInfoSchema = mongoose.Schema({  // userSchema라는 이름의 schema를 작성해준다. 
    user: {
        type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'
    },
    height: {
        type: Number,
        validate(value) {
            if (value < 0) {
                throw new Error("Height must be a postive number");
            }
        }
    },
    weight: {
        type: Number,
        validate(value) {
            if (value < 0) {
                throw new Error("Weight must be a postive number");
            }
        }
    },
    age: {
        type: Number,
        validate(value) {
            if (value < 0) {
                throw new Error("Age must be a postive number");
            }
        }
    },
    bmi: {
        type: Number,
    },
    state: {
        type: String,
        // 'NO' -> normal , 'OV' -> overweight, 'OB' -> Obesity
    }, 
    active_kcal: {
        type: Number
    },
    bmr: {
        type: Number
    },
    updatedAt: {
        type:Date,
        default: moment().format("YYYY-MM-DD"),
        unique: 1
    }
});


const BodyInfo = mongoose.model('BodyInfo', bodyInfoSchema); 

module.exports = { BodyInfo }; 