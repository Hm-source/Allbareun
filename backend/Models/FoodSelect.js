const mongoose = require('mongoose'); // mongoose를 선언해주고,

const FoodSelectSchema = mongoose.Schema({ 
    name : {
        type: String
    },
    when : {
        type: String
    },
    detail : {
        type: String
    },
    once : {
        type: Number
    },
    unit : {
        type: String
    },
    total_g: {
        type: Number
    },
    total_mL : {
        type: Number
    },
    kcal :{
        type: Number
    }, 
    water_g : {
        type: Number
    }, 
    protein_g : {
        type: Number
    },
    fat_g : {
        type: Number
    }, 
    carbon_g : {
        type: Number
    },
    sugars_g : {
        type: Number
    }, 
    calcium_mg :{
        type: Number
    }, 
    magnecium_mg : {
        type: Number
    },
    salt_mg :{
        type: Number
    }, 
    zinc_mg :{
        type: Number
    },
    vitaminC_mg :{
        type: Number
    }
},    
{ collection : 'foodselect'});


const FoodSelect = mongoose.model('FoodSelect', FoodSelectSchema); 

module.exports = { FoodSelect };