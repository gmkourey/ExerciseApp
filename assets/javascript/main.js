//https://www.livestrong.com/article/92939-calculate-bmi-hand/

//Obtain user inputs

//global variables
var heightFeetInput = $("#heightFeetInput").val();
var heightInchesInput = $("#heightInchesInput").val();
var heightInInches = (parseInt(heightFeetInput) * 12) + parseInt(heightInInches);
var heightInCm = heightInInches * 2.54;
var weightPounds = $("#weightInput").val();
var weightKg = weightPounds * .454;
var ree = 0;
var sex = $("#sex").val();
var age = $("#age").val();
var activityLevel = $("#activityLevel").val(); 
var protein = 0;
var fat = 0;
var carbs = 0;
// varbiables for activity levels: couchPotatoe, moderatelyActive, highlyActive, triathlonRunner


//calculate variables based on inputs
var BMI = ((weightPounds * 705)/heightInInches)/heightInInches;

var idealWeight = ((heightInInches * 24) * heightInInches)/705
var lowestHealthyWeight = ((heightInInches * 18.5) * heightInInches)/705


// if (BMI < 18.5) document... = "Underweight";
// if (BMI >= 18.5 && BMI <= 25) ... = "Normal";
// if (BMI >= 25 && BMI <= 30) ... = "Obese";
// if (BMI > 30) ... = "Overweight";           


// calories 
if (sex === "male") {
    ree = (weightKg * 10) + (6.25 * heightInCm) - (age * 5) + 5;
} else {
    ree = (weightKg * 10) + (6.25 * heightInCm) - (age * 5) - 161;
}

switch(activityLevel) {
    case "couchPotatoe": 
    ree *= 1.2;
    break;
    case "moderatelyActive":
    ree *= 1.375;
    break;
    case "highlyActive":
    ree *= 1.55;
    break;
    case "triathlonRunner":
    ree *= 1.725;
    break;
};

ree = Math.round(ree);

protein = Math.round(ree * .35);
fat = Math.round(ree * .2);
carbs = Math.round(ree * .45);