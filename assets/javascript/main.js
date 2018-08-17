//https://www.livestrong.com/article/92939-calculate-bmi-hand/

//Obtain user inputs

//global variables

var heightFeetInput;
var heightInchesInput;
var heightInInches;
var heightInCm;
var weightPounds;
var weightKg;
var ree = 0;
var sex;
var age;
var activityLevel;
var protein = 0;
var fat = 0;
var carbs = 0;
var reeAfter = 0;
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

// switch(activityLevel) {
//     case "couchPotato": 
//     ree *= 1.2;
//     break;
//     case "moderatelyActive":
//     ree *= 1.375;
//     break;
//     case "highlyActive":
//     ree *= 1.55;
//     break;
//     case "triathlonRunner":
//     ree *= 1.725;
//     break;
// };

$('#submitInfo').on('click', function(event) {
    

if ($("#userHeightFeet").val() !== '' && $("#userHeightInches").val() !== '' && $("#userWeight").val() && $("#userSex").val() !== '' && $("#userAge").val() !== '') {    
event.preventDefault();

heightFeetInput = $("#userHeightFeet").val();
heightInchesInput = $("#userHeightInches").val();
heightInInches = (parseInt(heightFeetInput) * 12) + parseInt(heightInchesInput);
heightInCm = heightInInches * 2.54;
weightPounds = $("#userWeight").val();
weightKg = weightPounds * .454;
sex = $("#userSex").val();
age = $("#userAge").val();
activityLevel = $("#userActivity").val();

$("#userHeightFeet").val('');
$("#userHeightInches").val('');
$("#userWeight").val('');
$("#userSex").val('');
$("#userAge").val('');
$("#userActivity").val('');
$('#userName').val('');

if (sex === "male") {
    ree = (weightKg * 10) + (6.25 * heightInCm) - (age * 5) + 5;
    console.log('male' , ree);
} else {
    ree = (weightKg * 10) + (6.25 * heightInCm) - (age * 5) - 161;
    console.log('female' , ree);
}

ree = Math.round(ree);

protein = Math.round(ree * .35);
fat = Math.round(ree * .2);
carbs = Math.round(ree * .45);
var ajaxCall;
$.ajax({
    url: "https://www.googleapis.com/youtube/v3/search?part=snippet&order=rating&videoDuration=medium&q=building%20muscle+exercises&type=video&videoDefinition=high&key=AIzaSyBAhh8JN12Xz7fLIavO-XuhO0V9bXHjAMI&maxResults=10",
    method: "GET"
  }).then(function(response) {

      ajaxCall = response.items;

      for(var i = 0; i < ajaxCall.length; i++) {
          var newDiv = $('<div>');
          newDiv.attr('id', 'youtubeVideos');

          var newAnchor = $('<a>');
          newAnchor.attr('href', 'https://www.youtube.com/watch?v=' + ajaxCall[i].id.videoId);
          newAnchor.attr('target', '_blank');
          
          var newImage = $('<img>');
          newImage.attr('src', ajaxCall[i].snippet.thumbnails.medium.url)
        newAnchor.append(newImage);
        $('#videos').append(newAnchor);
      };
});


switch(activityLevel) {
    case "couchPotato": 
    reeAfter = ree * 1.2;
    break;

    case "moderatelyActive":
    reeAfter = ree * 1.375;
    break;

    case "highlyActive":
    reeAfter = ree* 1.55;
    break;

    case "triathlonRunner":
    reeAfter = ree * 1.725;
    break;
};

protein = Math.round((reeAfter * .35)/4);
console.log('You should have this much protein: ' + protein);
fat = Math.round((reeAfter * .2)/9);
console.log('You should have this much fat: ' + fat);
carbs = Math.round((reeAfter * .45)/4);
console.log('You should have this many carbs: ' + carbs);
console.log('Total calories needed with activity level: ' + reeAfter);
console.log('Total calories consumed with diet: ' + ((protein * 4) + (fat * 9) + (carbs* 4)));
reeAfter=Math.round(reeAfter);
} else {
    alert("You have not filled out the form correctly. Please try again!");
}
});
