import Vue from 'vue'
import App from './App.vue'

console.log("Vue version:" + Vue.version);

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
