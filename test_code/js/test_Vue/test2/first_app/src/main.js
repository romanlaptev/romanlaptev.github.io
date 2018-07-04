import Vue from 'vue'
import App from './App.vue'

//-------------------------
console.log("Vue version:" + Vue.version);
var ua = "<h2>"+navigator.userAgent+"</h2>";
document.querySelector("#info").innerHTML += ua;
document.querySelector("#version").innerHTML = Vue.version;
//-------------------------

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
