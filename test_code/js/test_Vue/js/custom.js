//console.log("Vue:" + typeof Vue);
var support = true;
if( typeof Vue === "undefined"){
	support = false;
}

window.onload=function(){

	var $ver = getById("version");
	if( support){
console.log("Vue version:" + Vue.version);
		$ver.innerHTML = Vue.version;
		
		var app = new Vue({
			el: '#app',
			data: {
				message: 'Hello Vue!'
			},
			methods: {
				setMessage: function(event){
	console.log(event);				
					this.message = event.target.value;
				}
			}
		});
	} else {
		var msg = "This browser does not support the framework Vue!!!";
		$ver.innerHTML = "<p class='alert-danger'>"+msg+"</p>";
	}
	
}//end load

function getById(id){
	
	if( document.querySelector ){
		var obj = document.querySelector("#"+id);
		return obj;
	}
	
	if( document.getElementById ){
		var obj = document.getElementById(id);
		return obj;
	}
	
	if( document.all ){
		var obj = document.all[id];
		return obj;
	}
	
	//if( document.layers ){
		//var obj = document.layers[id];
		//return obj;
	//}
	
	return false;
}//end getById()
