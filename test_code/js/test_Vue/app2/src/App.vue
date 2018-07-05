<template>
  <div id="app">
    <router-view/>
    <img src="./assets/logo.png">
	<Panel panelStyle="panel panel-primary" />
	<Panel panelStyle="panel panel-info" />
	<Panel panelStyle="panel panel-danger" />
  </div>
</template>


<script>

import Panel from '@/components/Panel';

Panel.beforeCreate = function(){
console.log("Panel: ", Panel);	
console.log("__file: ", Panel.__file);	
console.log("beforeCreate...", arguments);	
}

export default {
  name: 'App',
  components: {
	Panel
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
