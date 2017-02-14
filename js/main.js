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
	
};//end load
