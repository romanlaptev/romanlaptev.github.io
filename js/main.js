window.onload = function(){
//console.log("onload");

	//get time
	var now = new Date(); 
	var month = now.getMonth()+1;
	if( month < 10){
		month = "0" + month;
	}
	current_date.innerHTML = now.getDate()+ "." + month +"."+now.getFullYear();
	//var specificDate = new Date(2016,4,28);//28.05.2016
	
	
};//end load
