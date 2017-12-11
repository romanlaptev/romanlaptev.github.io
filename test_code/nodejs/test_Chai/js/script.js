window.onload = function(){
	var $log = document.querySelector("#log");
	var $ver = document.querySelector("#ver");
	if( chai ){
console.log(chai.version);		
		$ver.innerHTML = chai.version;
		runTests();
	} else {
		$log.innerHTML = "<h1>Error, Chai not avaible....</h1>";
	}
}//end onLoad

function runTests(){
	
}//end runTests