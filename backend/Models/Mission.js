// User.js

const mongoose = require('mongoose'); // mongoose를 선언해주고,

const missionSchema = mongoose.Schema({  // userSchema라는 이름의 schema를 작성해준다. 
    misson_id: {
        type: String,
        maxLength: 50,
        trim: true, // space를 없애준다.
        unique: 1, // 같은값은 하나만 존재할 수 있다.
    },
    content: {
        type: String,
        maxLength: 150,
        trim: true,
    },
    mission_state: {
        type: String,
        enum: ['done', 'new'],
        default: 'new', 
    },
    mission_times: {
        type: Number,
        default: 0,
    },
    selected_date: {
        type: Date,
        default: moment().format("YYYY-MM-DD hh:mm:ss")
    },
    performed_date: {
        type: Date,
        default: moment().format("YYYY-MM-DD hh:mm:ss")
    }
});

const Mission = mongoose.model('Mission', missionSchema); 

module.exports = { Mission };