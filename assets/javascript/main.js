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

$('#submitInfo').on('click', function(event) {
    event.preventDefault();

sex = $("#userSex").val();
age = $("#userAge").val();
activityLevel = $("#activityLevel").val(); 
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
    case "couchPotato": 
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
      }
});
});
