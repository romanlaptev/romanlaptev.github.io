import Vue from 'vue'

// import Vue from 'vue'
// import Router from 'vue-router'
// Vue.use(Router)
// export default new Router({
  // routes: [
    // {}
  // ]
// })

import App from './App.vue'
console.log( "App: ", App );

App.beforeCreate = function(){
console.log("App.beforeCreate...", arguments);	
}

//-------------------------
//console.log("Vue version:" + Vue.version);
var ua = "<h2>"+navigator.userAgent+"</h2>";
document.querySelector("#info").innerHTML += ua;
document.querySelector("#version").innerHTML = Vue.version;
//-------------------------

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')


