
const mongoose = require('mongoose'); // mongoose를 선언해주고,
const moment = require('moment');

const missionSchema = mongoose.Schema({  
    user : {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    user_id : {
        type : String
    },
    content: [
        {
            id: { type: mongoose.Schema.Types.ObjectId, ref: 'FoodSelect'},
            name: { type: String},
            points: { type: Number},
            name :  { type: String}, 
            when : { type: String}, 
            detail : { type: String}, 
            once : { type: Number}, 
            unit: { type: String}, 
            kcal : { type: Number}, 
            water_g : { type: Number}, 
            protein_g : { type: Number}, 
            fat_g : { type: Number}, 
            carbon_g : { type: Number}, 
            sugars_g : { type: Number}, 
            calcium_mg : { type: Number}, 
            salt_mg : { type: Number}, 
            zinc_mg : { type: Number}, 
            vitaminC_mg : { type: Number}
        }
    ],
    mission_chosen : {
        type: String,
        enum : ['Y', 'N'],
        default : 'N'
    },
    mission_state: {
        type: String,
        enum: ['done', 'new'],
        default: 'new', 
    },
    selectedAt: {
        type: Date,
    },
    performedAt: {
        type: Date
    }
});

const Mission = mongoose.model('Mission', missionSchema); 

module.exports = { Mission };