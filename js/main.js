window.onload = function(){
//console.log("onload");

	//get uptime
	var now = new Date(); 
	var month = now.getMonth()+1;
	if( month < 10){
		month = "0" + month;
	}
	document.getElementById("current_date").innerHTML = now.getDate()+ "." + month +"."+now.getFullYear();
	var startDate = new Date(2016,4,28);//28.05.2016
	
	var day_in_ms = 1000*60*60*24;
	var Days = Math.floor((now.getTime() - startDate.getTime())/ day_in_ms );
	document.getElementById("uptime").innerHTML = Days;
	//document.getElementById("current_date").innerHTML += ", ("+Days+") "; 
	 
//detect type year
//год является високосным в двух случаях: либо он кратен 4, но при этом не кратен 100, либо кратен 400
var year = now.getFullYear();
//var year = 1600;
var test1 = year % 4;
//console.log(test1);
if( test1 === 0){
	test1 = true;
	
	var test2 = year % 400;
	if( test2 > 0){
		test1 = false;
	}

} else {
	test1 = false;
}
if( test1){
//console.log("год является високосным!");	
	var numDaysInYear = 366;
} else {
//console.log("год не является високосным!");
	var numDaysInYear = 365;
}

var numYears = Math.floor(Days / numDaysInYear);
var numDays = Days % numDaysInYear;
document.getElementById("uptime2").innerHTML = numYears +" year "+numDays;
	 
};//end load

$(document).ready(function(){
//console.log("Ready!!!");


	$(".switch-control").on("click", function(e){
		var panelId = e.target.id.replace("-switch", "");
		if( panelId.length > 0){
console.log(e.target.id, panelId);	
			$("#" + panelId).collapse("toggle");
		}
	});//end event
	
	$("#notes-panel-switch").prop("checked", true);
	$("#notes-panel").collapse("show");
	
});
