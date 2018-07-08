<template>
	<div>
		<h1>Component2</h1>
		<button v-on:click="say('hi')">btn1</button>
		<button v-on:click="method1">btn2</button>
		
		<div class="panel panel-primary">
			<div class="panel-body">
Counter
	<div id="app-counter">
		<button v-on:click="count++">You clicked me {{ count }} times.</button>	
	</div>
	
			</div>
		</div>

		<div v-on:mouseenter="changeColor('box-blue')" v-on:mouseleave="changeColor('box-violet')" 
:class="boxStyle">
			<h2>Test mouseenter / mouseleave </h2>
		</div>
			
	</div>
</template>

<script>
export default {
	name: "Component2",
	props: {	
		count: String,
		boxStyle: {//https://stackoverflow.com/questions/45280859/inject-css-to-a-vue-component
			type: String,
			default: 'box-default'
		}		
	},
	
	methods: {
		say: function (message) {
			alert(message)
		},
		
		method1: function( e ){
console.log( arguments );
console.log( "this: ", this );
		},
		
		changeColor( _className ){
console.log( arguments );
			this.boxStyle = "box-default " + _className;
console.log( this.boxStyle );
		}
		
	}//end methods
}
</script>

<style scoped>
.box-default {
	width: 200px;
	height: 100px;
	background-color: orange;
	border: 1px solid;
	padding: 3px;
	text-align: center	
}
.box-violet {
	background-color: purple;
	color: #fff;
}
.box-blue {
	background-color: lightsteelblue;
}

</style>
