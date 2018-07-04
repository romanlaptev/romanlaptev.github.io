<template>
	<div id="app">
  
		<img src="./assets/logo.png">
		
		<div class="panel">
			<Component1 msg="Hello Vue world !!!" />
		</div>
		
		<div class="panel">
			<button v-on:click="">click me</button>
		</div>

		<HelloWorld msg="Welcome to Your Vue.js App"/> 
	
	</div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';

/*
export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
*/

import Component1 from './components/Component1.vue';
Component1.beforeCreate = function(){
console.log("Component1.beforeCreate...", arguments);	
}

export default {
  name: 'app',
  components: {
    HelloWorld,
	Component1
  }
}

</script>

<style>
/*
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
*/
</style>
