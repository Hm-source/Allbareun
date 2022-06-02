const mongoose = require('mongoose'); // mongoose를 선언해주고,

const FoodSchema = mongoose.Schema({  // userSchema라는 이름의 schema를 작성해준다. 
},    
{ collection : 'foods'});

const Food = mongoose.model('Food', FoodSchema); 

module.exports = { Food };