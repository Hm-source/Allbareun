// set variables and functions
module.exports.ob_kcal = 200;
module.exports.ow_kcal = 100;
module.exports.no_kcal = 0;
module.exports.sleep_kcal = 40;
module.exports.sleep_time = 9;
module.exports.child_basic_kcal = 300;
module.exports.child_extra_kcal = 200;
// bmi function
module.exports.checkBMI = (weight, height) => {
    return(Number(Math.round((weight / (height * height))*1000000)/100));
};
//check obesity
module.exports.checkObesity = (bmi, age) => {
    if (age == 7) {
        if (bmi < 13.93) { return "UW" }
        else if (bmi >= 13.93 && bmi < 18.86) { return "NO"}
        else if (bmi >= 18.86 && bmi < 19.62) { return "OW"}
        else if (bmi >= 20.93) { return "OB"}
    } else if (age == 8){
        if (bmi < 14.06) { return "UW" }
        else if (bmi >= 14.06  && bmi < 19.8 ) { return "NO"}
        else if (bmi >= 19.8 && bmi < 20.66) { return "OW"}
        else if (bmi >= 22.13) { return "OB"}
    } else if(age == 9){
        if (bmi < 14.27){ return "UW" }
        else if (bmi >= 14.27 && bmi < 20.76) { return "NO"}
        else if (bmi >= 20.76 && bmi < 21.72) { return "OW"}
        else if (bmi >= 23.34) { return "OB"}
    } else if( age == 10) {
        if (bmi < 14.57) { return "UW" }
        else if (bmi >= 14.57 && bmi <  21.71) { return "NO"}
        else if (bmi >=  21.71 && bmi <  22.74) { return "OW"}
        else if (bmi >= 24.48) { return "OB"}
    } else if( age == 11) {
        if (bmi < 14.93) { return "UW" }
        else if (bmi >= 14.93 && bmi < 22.57) { return "NO"}
        else if (bmi >= 22.57 && bmi < 23.67) { return "OW"}
        else if (bmi >= 25.5) { return "OB"}
    } else if( age == 12) {
        if (bmi < 15.35) { return "UW" }
        else if (bmi >= 15.35 && bmi <  23.32) { return "NO"}
        else if (bmi >= 23.32 && bmi < 24.46) { return "OW"}
        else if (bmi >= 25) { return "OB"}
    } else if( age == 13) {
        if (bmi < 15.82) { return "UW" }
        else if (bmi >= 15.82 && bmi < 23.93) { return "NO"}
        else if (bmi >= 23.93 && bmi < 25) { return "OW"}
        else if (bmi >= 25) { return "OB"}
    } else if( age == 14 ){
        if (bmi < 16.32) { return "UW" }
        else if (bmi >= 16.32 && bmi <  24.4) { return "NO"}
        else if (bmi >=  24.4 && bmi < 25) { return "OW"}
        else if (bmi >= 25) { return "OB"}
    } else {
        if (bmi < 16.83 ) { return "UW" }
        else if (bmi >= 16.83  && bmi <  24.74) { return "NO"}
        else if (bmi >=  24.74 && bmi < 25) { return "OW"}
        else if (bmi >= 25) { return "OB"}
    }
};

// check basal metabolic rate
module.exports.checkBMR = (height, weight, age, sex) => {
    if ( sex == 'M') {
        return 66.47 + (13.75*weight) + (5*height) - (6.76*age);
    } else if ( sex == 'F') {
        return 655.1 + (9.56*weight) + (1.85*height) - (4.68*age);
    }
};

module.exports.checkUserKcal = (isObesity, bmr, active_kcal) => {

    if(isObesity == 'OB') {
        return this.child_basic_kcal + bmr + active_kcal + (this.sleep_kcal * this.sleep_time) - this.ob_kcal;
    } else if (isObesity == 'OW') {
        return this.child_basic_kcal + bmr + active_kcal + (this.sleep_kcal * this.sleep_time) - this.ow_kcal;
    } else if (isObesity == 'NO') {
        return this.child_basic_kcal + bmr + active_kcal + (this.sleep_kcal * this.sleep_time) - this.no_kcal;
    } else {
        return this.child_basic_kcal + bmr + active_kcal + (this.sleep_kcal * this.sleep_time) - this.child_extra_kcal;
    }
};


module.exports.getProteinScore= (user_kcal, protein) => {
    var _protein = (protein/(user_kcal * (Math.round(0.0363479256208549 *1000) / 1000)))*100;
    var protein_score;
    if ( _protein <= 20) {
        protein_score = 20;
    } else if ( _protein <= 50 ) {
        salt_score = 30;
    } else if ( _protein <= 70) {
        protein_score = 70;
    } else {
        protein_score = 100;
    }
    return protein_score;
};

module.exports.getFatScore = (user_kcal, fat) => {
    var _fat = (fat/(user_kcal * (Math.round(0.0284252224753397 *1000) / 1000)))*100;
    var fat_score;
    if ( _fat >= 200) {
        fat_score = 20;
    } else if ( _fat >= 150 ) {
        fat_score = 30;
    } else if ( _fat >= 100) {
        fat_score = 70;
    } else {
        fat_score = 100;
    }
    return fat_score;
};

module.exports.getCarbonScore = (user_kcal, carbon) => {
    var _carbon = (carbon/(user_kcal * (Math.round(0.156843711775202*1000) / 1000)))*100;
    var carbon_score;
    if ( _carbon >= 200) {
        carbon_score = 20;
    } else if ( _carbon >= 150 ) {
        carbon_score = 30;
    } else if ( _carbon >= 100) {
        carbon_score = 70;
    } else {
        carbon_score = 100;
    }
    return carbon_score;
};

module.exports.getCalciumScore = (user_kcal, calcium) => {
    var _calcium = (calcium/(user_kcal * (Math.round(0.28236693561962 *1000) / 1000)))*100;
    var calcium_score;
    if ( _calcium <= 20) {
        calcium_score = 20;
    } else if ( _calcium <= 50 ) {
        calcium_score = 30;
    } else if ( _calcium <= 70) {
        calcium_score = 70;
    } else {
        calcium_score = 100;
    }
    return calcium_score;
};

module.exports.getSaltScore = (user_kcal, salt) => {
    var _salt = (salt/(user_kcal * (Math.round(1.42534591689017 *1000) / 1000)))*100;
    var salt_score;
    if ( _salt >= 200) {
        salt_score = 20;
    } else if ( _salt >= 150 ) {
        salt_score = 30;
    } else if ( _salt >= 100) {
        salt_score = 70;
    } else {
        salt_score = 100;
    }
    return salt_score;
};

module.exports.getVitaminCScore= (user_kcal,vitamin_C) => {
    var vitamin_C_score;
    var _vitamin_C= (vitamin_C/(user_kcal * (Math.round(0.0347768513427074 *1000) / 1000)))*100;
    if (_vitamin_C >= 60) {
        vitamin_C_score = 100;
    } else if (_vitamin_C >= 50){
        vitamin_C_score = 80;
    } else if (_vitamin_C >= 30) {
        vitamin_C_score = 60;
    } else if (_vitamin_C >= 20) {
        vitamin_C_score = 40;
    } else if ( _vitamin_C >= 10) {
        vitamin_C_score = 30;
    } else if ( _vitamin_C >= 5) {
        vitamin_C_score = 20;
    } else {
        vitamin_C_score = 10;
    }

    return vitamin_C_score;
};


module.exports.getNutritionScore = (carbon_score, protein_score, fat_score, salt_score, vitamin_C_score,calcium_score ) => {
    var sum = carbon_score + protein_score + fat_score + salt_score + vitamin_C_score + calcium_score;
    var avg = Math.round(sum/6);
    return avg
};