const mongoose = require('mongoose'); // mongoose를 선언해주고,

const FoodSchema = mongoose.Schema({ 
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
        type: Number
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
    sugar_g : {
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
{ collection : 'foods'});


const Food = mongoose.model('Food', FoodSchema); 

module.exports = { Food };