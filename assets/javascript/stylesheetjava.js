// style sheet working JS
// sudo code, user selects what they want to fill out
// 
$(document).ready(function(){
    $("#form1").hide();
    $(".fa-spin").hide();
    $(".btn-info").on('click', function(){
        $('#form1').show();
        $(".btn-info").text("Pick Your Goal.")
    });
    $("#submitInfo").on('click',function(event){
        event.preventDefault();
        $(".btn-info").hide();
        $("#form1").hide();
        // this should load till the back end data form is ready, or after a set amount of time. 
        $(".fa-spin").show();
    });
});