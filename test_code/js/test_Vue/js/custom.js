var app3, app4;

console.log("Vue:" + typeof Vue);
var support = true;
if( typeof Vue === "undefined"){
	support = false;
}

window.onload=function(){

	if( support){
		testVue();
	} else {
		var $ver = getById("version");
		var msg = "This browser does not support working with the framework Vue!!!";
		$ver.innerHTML = "<p class='alert-danger'>"+msg+"</p>";
	}

	var $btn_visibility = getById("btn-visibility");
	$btn_visibility.onclick = function(e){
console.log(app3);
		if( app3.seen ){
			app3.seen = false;
		} else {
			app3.seen = true;
		}
	}//end event
	
	var $btn_push = getById("btn-push");
	$btn_push.onclick = function(e){
		app4.todos.push({"text" : "new task"});
	}//end event
	
}//end load


function testVue(){

	var $ver = getById("version");
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

	var app2 = new Vue({
	  el: '#app-2',
	  data: {
		message: 'Вы загрузили эту страницу в: ' + new Date().toLocaleString()
	  }
	});
	
	//https://ru.vuejs.org/v2/guide/index.html
	app3 = new Vue({
		el: '#app-3',
		data: {
			seen: true
		}
	});

	app4 = new Vue({
		el: "#app-4",
		data: {
			todos : [
				{text: "task1"},
				{text: "task2"},
				{text: "task3"}
			]
		}
	});
	
	var app5 = new Vue({
		el:"#app-5",
		data: {
			message: "text1"
		},
		methods: {
			method1: function( e ){
//console.log( arguments );
//console.log( this.message );
				this.message = "Coordinates:  x = " + e.clientX +", y = "+ e.clientY;
			}
		}
		
	});
console.log("app5:", app5);	
	
	var app6 = new Vue({
		el: "#app-6",
		data : {
			name: "Jack"
		}
	});
	
	var app_counter = new Vue({
		el: "#app-counter",
		data : {
			counter: 0
		},
		methods : {
			increase: function(e){
console.log(e);				
				this.counter++;
			},
			decrease: function(e){
console.log(e);				
				if(this.counter>0) 
					this.counter--;
			}			
		}
	});
	
	var app_m = new Vue({
		el: "#app-m",
		data: {
			name:"Tommy", age:15
		},
		computed:{
			enabled: function(){
console.log("computed");
				if(this.age > 17)
					return "come in...";
				else
					return "come on, go home, chick...";
			}			
		}
		// methods : {
			// checkAge: function(){
// console.log(arguments);				
				// if(this.age > 17)
					// return "enter";
				// else
					// return "go home, chick...";
			// }			
		// }
	});


	//https://ru.vuejs.org/v2/guide/index.html
	//https://metanit.com/web/vuejs/4.1.php
	Vue.component('todo-item', {
		template: '<li>Это todo</li>'
	})
	
}//end testVue()


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
