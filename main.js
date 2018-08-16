//https://www.livestrong.com/article/92939-calculate-bmi-hand/

//Obtain user inputs

//global variables
var heightFeetInput = $("#heightFeetInput").val();
var heightInchesInput = $("#heightInchesInput").val();
var heightInInches = (parse(heightFeetInput) * 12) + parse(heightInInches);
var weight = $("#weightInput").val();
var gender = [];

//calculate variables based on inputs
var BMI = ((weight * 705)/heightInInches)/heightInInches;

var idealWeight = ((heightInInches * 24) * heightInInches)/705
var lowestHealthyWeight = ((heightInInches * 18.5) * heightInInches)/705


if (BMI < 18.5) document... = "Underweight";
if (BMI >= 18.5 && BMI <= 25) ... = "Normal";
if (BMI >= 25 && BMI <= 30) ... = "Obese";
if (BMI > 30) ... = "Overweight";           


