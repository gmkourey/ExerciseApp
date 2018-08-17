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
var BMI;
var idealWeight;
var lowestHealthyWeight;
var userGoal;
var ajaxCall;
var youTubeQuery;

// varbiables for activity levels: couchPotatoe, moderatelyActive, highlyActive, triathlonRunner


//calculate variables based on inputs
var BMI = ((weightPounds * 705)/heightInInches)/heightInInches;

function createChart(fprotein, fcarbs, ffat) {
    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ["Protein", "Carbs", "Fat"],
            datasets: [{
                label: '# of Votes',
                data: [fprotein, fcarbs, ffat],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        },
    });
    }

// if (BMI < 18.5) document... = "Underweight";
// if (BMI >= 18.5 && BMI <= 25) ... = "Normal";
// if (BMI >= 25 && BMI <= 30) ... = "Obese";
// if (BMI > 30) ... = "Overweight";           
$('.goal').on('click', function() {
    $('#goals').css('display', 'none');
    userGoal = $(this).attr('id');
    console.log(userGoal);

    if(userGoal === 'loseWeight') {
        $('#goalSelected').text('That\'s great, you want to lose weight!');
        console.log('You want to lose weight!');
    } else if (userGoal === 'buildMuscle') {
        $('#goalSelected').text('That\'s great, you want to buld THICK muscle!');
        console.log('You want to build muscle!');
    } else {
        $('#goalSelected').text('That\'s great, you want to get toned!')
        console.log('You want to get toned!');
    }
    $('#userInputs').css('display', 'block');

});

$('#submitInfo').on('click', function(event) {

    $('#userInputs').css('display', 'none');

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

BMI = ((weightPounds * 705)/heightInInches)/heightInInches;

idealWeight = ((heightInInches * 24) * heightInInches)/705
lowestHealthyWeight = ((heightInInches * 18.5) * heightInInches)/705

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

reeAfter=Math.round(reeAfter);

switch(userGoal) {

    case "loseWeight":
    reeAfter *= .9;
    protein = Math.round((reeAfter * .35)/4);
    fat = Math.round((reeAfter * .2)/9);
    carbs = Math.round((reeAfter * .45)/4);
    console.log(protein, carbs, fat);
    youTubeQuery = "exercises+lose+weight";
    break;

    case "buildMuscle":
    reeAfter *= 1.1;
    protein = Math.round((reeAfter * .35)/4);
    fat = Math.round((reeAfter * .2)/9);
    carbs = Math.round((reeAfter * .45)/4);
    console.log(protein, carbs, fat);
    youTubeQuery = "excercises+build+muscle";
    break;

    case "getToned":
    protein = Math.round((reeAfter * .50)/4);
    fat = Math.round((reeAfter * .30)/9);
    carbs = Math.round((reeAfter * .20)/4);
    console.log(protein, carbs, fat);
    youTubeQuery = "excercises+get+toned";
    break;
};
$('#macroChart').css('display', 'block');

createChart(protein, carbs, fat);

$.ajax({
    url: "https://www.googleapis.com/youtube/v3/search?part=snippet&order=rating&videoDuration=medium&q=" + youTubeQuery + "&type=video&videoDefinition=high&key=AIzaSyBAhh8JN12Xz7fLIavO-XuhO0V9bXHjAMI&maxResults=10",
    method: "GET"
  }).then(function(response) {

      ajaxCall = response.items;

      for(var i = 0; i < ajaxCall.length; i++) {
          var newDiv = $('<div>');
          newDiv.attr('id', 'youtubeVideo#' + i);

          var newAnchor = $('<a>');
          newAnchor.attr('href', 'https://www.youtube.com/watch?v=' + ajaxCall[i].id.videoId);
          newAnchor.attr('target', '_blank');
          
          var newImage = $('<img>');
          newImage.attr('src', ajaxCall[i].snippet.thumbnails.medium.url)
        newAnchor.append(newImage);
        $('#videos').append(newAnchor);
      }
});

} else {
    alert("You have not filled out the form correctly. Please try again!");
}
});
