
const mongoose = require('mongoose'); // mongoose를 선언해주고,
const moment = require('moment');

const missionSchema = mongoose.Schema({  
    user : {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    user_id : {
        type : String
    },
    content: {
        type: Array
    },
    mission_state: {
        type: String,
        enum: ['done', 'new'],
        default: 'new', 
    },
    selectedAt: {
        type: Date,
        default: moment().format("YYYY-MM-DD")
    },
    performedAt: {
        type: Date
    }
});

const Mission = mongoose.model('Mission', missionSchema); 

module.exports = { Mission };