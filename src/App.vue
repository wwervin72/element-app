<template>
	<div id="app">
		<e-header></e-header>
		<router-view/>
	</div>
</template>

<script>
	import eHeader from './components/header';
	export default {
		name: 'App',
		components: {
			eHeader
		},
		created () {
			this.$store.dispatch('setSeller');
		}
	}
</script>

<style>

</style>
