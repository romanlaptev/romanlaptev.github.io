<template>
	<div>
		<h1>Test Component1</h1>
		<h3>{{msg}}</h3>
	</div>
</template>

<script>
export default {
	name: "Component1",
	props: {
		msg: String
	}
}
</script>