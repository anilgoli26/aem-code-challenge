
$(document).ready(function(){
	$("#userdetail").on("click", function(){
        getvalidationjson();
	});
});

function getvalidationjson(){
	$.ajax({
        type : "GET",
        url : '/etc/age.json',
        success : userCreation
    });
}

function userCreation(data){
    $(".validation-message").remove();
    var fname = $("#fname").val();
    var lname = $("#lname").val();
    var age = $("#age").val();
    var country = $("#country").text();
    var userdata = { "fname": fname, "lname": lname, "age": age, "country": country };
    if(age >= data.minAge && age <= data.maxAge){
		saveuserdetails(userdata)
    } else {
		$("#userdetail").parent().append(" <div class=\"validation-message\"> You are not eligible </div>")
    } 
}

function saveuserdetails(userdata){
    $.ajax({     
		type : "GET",     
    	url : '/bin/saveUserDetails',     
        data : {"userdetails" : JSON.stringify(userdata)},
        success : function(data, textStatus, jqXHR) {
            console.log("Successfully created user");
        },     
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(textStatus);
        } 
	});
}
