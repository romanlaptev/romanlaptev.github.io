<template>
<div :class="panelStyle">
	<div class="panel-heading">header</div>
	<div class="panel-body">{{panelStyle}}</div>
	<div class="panel-footer">footer</div>
</div>
</template>

<script>
export default {
  name: 'Panel',
  props: {
	panelStyle: {
		type: String,
		default: 'panel-default'
	}		
	
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
