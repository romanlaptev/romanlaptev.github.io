// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import "bootstrap3/dist/css/bootstrap.min.css"
// -------------------------
console.log("App: ", App);

App.beforeCreate = function(){
console.log("App.beforeCreate...", arguments);	
}

//console.log("Vue version:" + Vue.version);
var ua = "<h2>"+navigator.userAgent+"</h2>";
document.querySelector("#info").innerHTML += ua;
document.querySelector("#version").innerHTML = Vue.version;
// -------------------------

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: { 
		App 
	},
	template: '<App/>'
})

var component1 = new Vue({
	el:"#component1",
	data: {
		msg: "Hello Vue!"
	},
	template: "<button class='btn btn-large btn-default'>{{ msg }}</button>"
});