
const mongoose = require('mongoose'); // mongoose를 선언해주고,

const missionSchema = mongoose.Schema({  // userSchema라는 이름의 schema를 작성해준다. 
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